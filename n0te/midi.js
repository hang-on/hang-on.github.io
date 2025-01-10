let activeNotes = new Set();

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
    }, true);
}

function onMIDIMessage(event) {
    const [command, note, velocity] = event.data;

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

    if (command === 144 && velocity > 0) {
        if (!activeNotes.has(note)) {
            activeNotes.add(note);
            logMessage(`Note on: ${playedNote} (velocity: ${velocity})`);
            checkNoteInput(playedNote.toLowerCase());
        }
    } else if (command === 128 || (command === 144 && velocity === 0)) {
        if (activeNotes.has(note)) {
            activeNotes.delete(note);
            logMessage(`Note off: ${playedNote}`);
        }
    }
}