let currentNoteIndex = 0;
let sessionStarted = false;
let simultaneousNotes = new Set();
let simultaneousNoteTimeout;

document.addEventListener('DOMContentLoaded', () => {
    preloadSounds();
    updateWelcomeMessage();
    initializeMIDI();
});

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

function startSession() {
    if (sessionStarted) return;
    sessionStarted = true;

    logMessage('Starting session...');
    document.getElementById('welcome-message').style.display = 'none';
    generateRandomNotes();
}

function checkNoteInput(note) {
    const gClefImagesDiv = document.getElementById('note-images');
    const gClefImages = gClefImagesDiv.getElementsByTagName('img');
    const fClefImagesDiv = document.getElementById('f-clef-images');
    const fClefImages = fClefImagesDiv.getElementsByTagName('img');

    logMessage(`Checking note input: ${note}`);

    let correctNote = false;

    if (note === gClefNotes[currentNoteIndex].toLowerCase()) {
        logMessage(`Correct G-clef note: ${note}`);
        gClefImages[currentNoteIndex + 1].src = `./images/g_clef_notes/${note}_greyed.png`;
        if (fClefNotes[currentNoteIndex] === 'blank') {
            fClefImages[currentNoteIndex + 1].src = `./images/blank_greyed.png`;
        }
        correctNote = true;
    }

    if (note === fClefNotes[currentNoteIndex].toLowerCase()) {
        logMessage(`Correct F-clef note: ${note}`);
        fClefImages[currentNoteIndex + 1].src = `./images/f_clef_notes/${note}_greyed.png`;
        if (gClefNotes[currentNoteIndex] === 'blank') {
            gClefImages[currentNoteIndex + 1].src = `./images/blank_greyed.png`;
        }
        correctNote = true;
    }

    if (gClefNotes[currentNoteIndex] !== 'blank' && fClefNotes[currentNoteIndex] !== 'blank') {
        if (correctNote) {
            simultaneousNotes.add(note);
            if (simultaneousNotes.size === 2) {
                logMessage('Both simultaneous notes played correctly!');
                simultaneousNotes.clear();
                clearTimeout(simultaneousNoteTimeout);
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
                simultaneousNoteTimeout = setTimeout(() => {
                    logMessage('Simultaneous note input failed.');
                    incorrectSound.play().catch(e => logMessage(`Failed to play incorrect sound: ${e.message}`));
                    updateStatusBar('Simultaneous note input failed.');
                    resetNotes();
                }, 500);
            }
        }
    } else if (correctNote) {
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
        resetNotes();
    }
}

function resetNotes() {
    const gClefImagesDiv = document.getElementById('note-images');
    const gClefImages = gClefImagesDiv.getElementsByTagName('img');
    const fClefImagesDiv = document.getElementById('f-clef-images');
    const fClefImages = fClefImagesDiv.getElementsByTagName('img');

    gClefNotes.forEach((note, index) => {
        if (note === 'blank') {
            gClefImages[index + 1].src = `./images/blank.png`;
        } else {
            gClefImages[index + 1].src = `./images/g_clef_notes/${note}.png`;
        }
    });
    fClefNotes.forEach((note, index) => {
        if (note === 'blank') {
            fClefImages[index + 1].src = `./images/blank.png`;
        } else {
            fClefImages[index + 1].src = `./images/f_clef_notes/${note}.png`;
        }
    });
    currentNoteIndex = 0;
    simultaneousNotes.clear();
}

function updateStatusBar(message) {
    const statusBar = document.getElementById('status-bar');
    statusBar.textContent = `Status: ${message}`;
}

function updateWelcomeMessage() {
    const welcomeMessageElement = document.getElementById('welcome-message');
    if (isMobileDevice()) {
        welcomeMessageElement.textContent = "Welcome to N0te. Tap the screen to begin the session.";
    } else {
        welcomeMessageElement.textContent = "Welcome to N0te. Press 'S' to begin the session.";
    }

    const noteImagesDiv = document.getElementById('note-images');
    noteImagesDiv.innerHTML = '';

    const gClefImg = createImageElement('./images/g-clef.png', 'G-clef');
    noteImagesDiv.appendChild(gClefImg);

    for (let i = 0; i < 8; i++) {
        const blankImg = createImageElement('./images/blank.png', 'Blank');
        noteImagesDiv.appendChild(blankImg);
    }

    const fClefImagesDiv = document.getElementById('f-clef-images');
    fClefImagesDiv.innerHTML = '';

    const fClefImg = createImageElement('./images/f-clef.png', 'F-clef');
    fClefImagesDiv.appendChild(fClefImg);

    for (let i = 0; i < 8; i++) {
        const blankImg = createImageElement('./images/blank.png', 'Blank');
        fClefImagesDiv.appendChild(blankImg);
    }
}

function logMessage(message) {
    console.log(message);
}

function logMIDIMessage(message) {
    const midiMessagesElement = document.getElementById('midi-messages');
    midiMessagesElement.textContent += message + '\n';
}

function isMobileDevice() {
    return /Mobi|Android|iPad/i.test(navigator.userAgent);
}