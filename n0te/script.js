const notes = ['c4', 'd4', 'e4', 'f4', 'g4', 'a4', 'b4', 'c5', 'd5', 'e5', 'f5', 'g5', 'a5', 'b5', 'c6'];
const fClefNotesOptions = ['a2', 'b2']; // Add more F-clef notes here as needed
let gClefNotes = [];
let fClefNotes = [];
let currentNoteIndex = 0;
let activeNotes = new Set();
let sessionStarted = false; // Flag to track if the session has started

// Load sound effects
const correctSound = new Audio('sfx/correct.mp3');
const incorrectSound = new Audio('sfx/incorrect.mp3');

// Preload sounds without playing them
function preloadSounds() {
    preloadSound(correctSound, 'Correct sound preloaded', 'Failed to load correct sound');
    preloadSound(incorrectSound, 'Incorrect sound preloaded', 'Failed to load incorrect sound');
}

function preloadSound(sound, successMessage, errorMessage) {
    sound.addEventListener('canplaythrough', () => logMessage(successMessage), false);
    sound.addEventListener('error', (e) => logMessage(`${errorMessage}: ${e.message}`), false);
    sound.load();
}

// Function to generate random notes
function generateRandomNotes() {
    logMessage('Generating random notes...');
    gClefNotes = [];
    fClefNotes = [];
    for (let i = 0; i < 8; i++) { // Generate 8 random notes
        if (Math.random() < 0.3) { // 30% chance to generate a blank on the G-clef and a note on the F-clef
            gClefNotes.push('blank');
            const randomFClefNote = fClefNotesOptions[Math.floor(Math.random() * fClefNotesOptions.length)];
            fClefNotes.push(randomFClefNote);
        } else {
            const randomNote = notes[Math.floor(Math.random() * notes.length)];
            gClefNotes.push(randomNote.toLowerCase()); // Convert to lowercase
            fClefNotes.push('blank'); // Add 'blank' to the corresponding slot on the F-clef
        }
    }
    logMessage(`G-clef notes generated: ${gClefNotes.join(', ')}`);
    logMessage(`F-clef notes generated: ${fClefNotes.join(', ')}`);
    updateNoteImages();
}

// Function to update note images
function updateNoteImages() {
    const noteImagesDiv = document.getElementById('note-images');
    noteImagesDiv.innerHTML = ''; // Clear existing images

    // Add the G-clef image first
    const gClefImg = createImageElement('./images/g-clef.png', 'G-clef');
    noteImagesDiv.appendChild(gClefImg);

    // Add the generated notes
    gClefNotes.forEach(note => {
        const img = createImageElement(`./images/${note}.png`, note);
        noteImagesDiv.appendChild(img);
    });

    // Update F-clef images
    const fClefImagesDiv = document.getElementById('f-clef-images');
    fClefImagesDiv.innerHTML = ''; // Clear existing images

    // Add the F-clef image first
    const fClefImg = createImageElement('./images/f-clef.png', 'F-clef');
    fClefImagesDiv.appendChild(fClefImg);

    // Add the generated F-clef notes
    fClefNotes.forEach(note => {
        const img = createImageElement(`./images/${note}.png`, note);
        fClefImagesDiv.appendChild(img);
    });

    logMessage('Note images updated.');
}

// Function to create an image element
function createImageElement(src, alt) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.onerror = () => logMessage(`Failed to load image: ${src}`);
    return img;
}

// Function to initialize MIDI access
function initializeMIDI() {
    WebMidi.enable(function (err) {
        if (err) {
            logMIDIMessage(`Failed to enable WebMidi: ${err}`);
            alert(`Failed to enable WebMidi: ${err}`);
            return;
        }

        const inputs = WebMidi.inputs;
        let inputCount = 0;
        inputs.forEach(input => {
            input.addListener('midimessage', 'all', onMIDIMessage);
            logMIDIMessage(`MIDI input added: ${input.name}`);
            inputCount++;
        });

        if (inputCount === 0) {
            logMIDIMessage('No MIDI inputs detected.');
        } else {
            logMIDIMessage(`Total MIDI inputs detected: ${inputCount}`);
        }
        logMIDIMessage('MIDI access granted');
    }, true); // Enable sysex
}

// Function to handle incoming MIDI messages
function onMIDIMessage(event) {
    const [command, note, velocity] = event.data;

    // Ignore Active Sensing messages (command 254)
    if (command === 254) {
        return;
    }

    const playedNote = Object.keys(midiNoteMap).find(key => midiNoteMap[key] === note);

    logMessage(`MIDI message received: ${event.data}`);
    logMessage(`Command: ${command}, Note: ${note}, Velocity: ${velocity}`);
    logMessage(`Played Note: ${playedNote}`);
    logMessage(`Active Notes: ${Array.from(activeNotes).join(', ')}`);

    if (playedNote === undefined) {
        logMessage(`Note ${note} is not mapped to any known note.`);
        return;
    }

    if (command === 144 && velocity > 0) { // Note on
        if (!activeNotes.has(note)) {
            activeNotes.add(note);
            logMessage(`Note on: ${playedNote} (velocity: ${velocity})`);
            checkNoteInput(playedNote.toLowerCase()); // Convert to lowercase
        }
    } else if (command === 128 || (command === 144 && velocity === 0)) { // Note off
        if (activeNotes.has(note)) {
            activeNotes.delete(note);
            logMessage(`Note off: ${playedNote}`);
        }
    }
}

// Function to check note input
function checkNoteInput(note) {
    const noteImagesDiv = document.getElementById('note-images');
    const noteImages = noteImagesDiv.getElementsByTagName('img');

    logMessage(`Checking note input: ${note} against ${gClefNotes[currentNoteIndex].toLowerCase()}`); // Debugging log

    if (note === gClefNotes[currentNoteIndex].toLowerCase()) { // Convert to lowercase
        logMessage(`Correct note: ${note}`);
        // Grey out the correct note image
        noteImages[currentNoteIndex + 1].src = `./images/${note}_greyed.png`; // +1 to skip the G-clef image

        currentNoteIndex++;
        if (currentNoteIndex >= gClefNotes.length) {
            logMessage('All notes played correctly!');
            correctSound.play().catch(e => logMessage(`Failed to play correct sound: ${e.message}`));
            updateStatusBar('All notes played correctly!');
            currentNoteIndex = 0;
            generateRandomNotes();
        } else {
            updateStatusBar(`Correct note: ${note}`);
        }
    } else {
        logMessage(`Incorrect note: ${note}`);
        incorrectSound.play().catch(e => logMessage(`Failed to play incorrect sound: ${e.message}`));
        updateStatusBar(`Incorrect note: ${note}`);
        // Revert all notes to their non-greyed version
        gClefNotes.forEach((note, index) => {
            noteImages[index + 1].src = `./images/${note}.png`; // +1 to skip the G-clef image
        });
        currentNoteIndex = 0;
    }
}

// Function to update the status bar
function updateStatusBar(message) {
    const statusBar = document.getElementById('status-bar');
    statusBar.textContent = `Status: ${message}`;
}

// Function to start the session
function startSession() {
    if (sessionStarted) return; // Prevent starting the session multiple times
    sessionStarted = true; // Set the flag to indicate the session has started

    logMessage('Starting session...');
    document.getElementById('welcome-message').style.display = 'none';
    generateRandomNotes();
    preloadSounds(); // Preload sounds after user interaction
    initializeMIDI(); // Initialize MIDI access
}

// Function to detect if the user is on a mobile device
function isMobileDevice() {
    return /Mobi|Android|iPad/i.test(navigator.userAgent);
}

// Function to update the welcome message based on device type
function updateWelcomeMessage() {
    const welcomeMessageElement = document.getElementById('welcome-message');
    if (isMobileDevice()) {
        welcomeMessageElement.textContent = "Welcome to N0te. Tap the screen to begin the session.";
    } else {
        welcomeMessageElement.textContent = "Welcome to N0te. Press 'S' to begin the session.";
    }
}

// Function to log messages
function logMessage(message) {
    console.log(message);
}

// Function to log MIDI messages
function logMIDIMessage(message) {
    const midiMessagesElement = document.getElementById('midi-messages');
    midiMessagesElement.textContent += message + '\n';
}

// Event listener for starting the session
document.addEventListener('keydown', (event) => {
    if (!isMobileDevice() && (event.key === 'S' || event.key === 's')) {
        startSession();
    }
});

document.addEventListener('click', (event) => {
    if (isMobileDevice() && event.target.id !== 'toggle-output') {
        startSession();
    }
});

// Initial log message
logMessage('Note images updated.');

// Update the welcome message based on device type
updateWelcomeMessage();