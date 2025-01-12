let activeNotes = new Set();
let noteToMidiMap = {};
for (let key in midiNoteMap) {
    noteToMidiMap[midiNoteMap[key]] = key;
}

// Function to initialize MIDI access
function initializeMIDI() {
    WebMidi.enable(function (err) {
        if (err) {
            console.error(`Failed to enable WebMidi: ${err}`);
            document.getElementById('error-message').innerText = `Failed to enable WebMidi: ${err}`;
            return;
        }

        const inputs = WebMidi.inputs;
        let inputCount = 0;
        for (const input of inputs) {
            input.addListener('midimessage', 'all', (event) => {
                const [command] = event.data;
                if (command === 144 || command === 128) { // Note on or Note off
                    onMIDIMessage(event);
                }
            });
            console.log(`MIDI input added: ${input.name}`);
            inputCount++;
        }

        if (inputCount === 0) {
            console.log('No MIDI inputs detected.');
        } else {
            console.log(`Total MIDI inputs detected: ${inputCount}`);
        }
        console.log('MIDI access granted');
    }, true); // Enable sysex
}

// Function to handle incoming MIDI messages
function onMIDIMessage(event) {
    // MIDI message structure: [command, midiNote, velocity]
    const [command, midiNote, velocity] = event.data;

    // Ignore Active Sensing messages (command 254)
    if (command === 254) {
        return;
    }

    const sprNote = noteToMidiMap[midiNote];

    if (sprNote === undefined) {
        console.log(`Note ${midiNote} is not mapped to any known note.`);
        return;
    }

    if (command === 144 && velocity > 0) { // Note on
        if (!activeNotes.has(sprNote)) {
            activeNotes.add(sprNote);
            console.log(`Note on: ${sprNote} (velocity: ${velocity})`);
        }
    } else if (command === 128 || (command === 144 && velocity === 0)) { // Note off
        if (activeNotes.has(sprNote)) {
            activeNotes.delete(sprNote);
            console.log(`Note off: ${sprNote}`);
        }
    }

    console.log(`MIDI message received: ${event.data}`);
    console.log(`Command: ${command}, Note: ${midiNote}, Velocity: ${velocity}`);
    console.log(`Played Note: ${sprNote}`);
    console.log(`Active Notes: ${Array.from(activeNotes).join(', ')}`);

}