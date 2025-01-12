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
            alert(`Failed to enable WebMidi: ${err}`);
            return;
        }

        const inputs = WebMidi.inputs;
        let inputCount = 0;
        inputs.forEach(input => {
            input.addListener('midimessage', 'all', onMIDIMessage);
            console.log(`MIDI input added: ${input.name}`);
            inputCount++;
        });

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
    const [command, midiNote, velocity] = event.data;

    // Ignore Active Sensing messages (command 254)
    if (command === 254) {
        return;
    }

    const sprNote = noteToMidiMap[midiNote];

    console.log(`MIDI message received: ${event.data}`);
    console.log(`Command: ${command}, Note: ${midiNote}, Velocity: ${velocity}`);
    console.log(`Played Note: ${sprNote}`);
    console.log(`Active Notes: ${Array.from(activeNotes).join(', ')}`);

    if (sprNote === undefined) {
        console.log(`Note ${midiNote} is not mapped to any known note.`);
        return;
    }

    if (command === 144 && velocity > 0) { // Note on
        if (!activeNotes.has(midiNote)) {
            activeNotes.add(midiNote);
            console.log(`Note on: ${sprNote} (velocity: ${velocity})`);
        }
    } else if (command === 128 || (command === 144 && velocity === 0)) { // Note off
        if (activeNotes.has(midiNote)) {
            activeNotes.delete(midiNote);
            console.log(`Note off: ${sprNote}`);
        }
    }
}