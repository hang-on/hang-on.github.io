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
    }, true); // Enable sysex
}

function onMIDIMessage(event) {
    const [command, note, velocity] = event.data;

    // Ignore Active Sensing messages (command 254)
    if (command === 254) {
        return;
    }

    logMIDIMessage(`MIDI message received: ${event.data}`);
    logMIDIMessage(`Command: ${command}, Note: ${note}, Velocity: ${velocity}`);
}

function logMIDIMessage(message) {
    const midiMessagesElement = document.getElementById('midi-messages');
    midiMessagesElement.textContent += message + '\n';
}

export { initializeMIDI, logMIDIMessage };