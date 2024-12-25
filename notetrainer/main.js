let currentNote = "C4";
const noteNames = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const noteImages = {
    'C4': 'C4.png',
    'D4': 'D4.png',
    'E4': 'E4.png',
    'F4': 'F4.png',
    'G4': 'G4.png',
    'A4': 'A4.png',
    'B4': 'B4.png'
};

function generateRandomNote() {
    const note = noteNames[Math.floor(Math.random() * noteNames.length)];
    return note + "4";
}

function updateNote() {
    currentNote = generateRandomNote();
    document.getElementById("note").innerText = currentNote;
    document.getElementById("noteImage").src = noteImages[currentNote];
    document.getElementById("feedback").innerText = "";
}

function midiToNoteName(midiNote) {
    const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const note = noteNames[midiNote % 12];
    const octave = Math.floor(midiNote / 12) - 1;
    return note + octave;
}

function onMIDIMessage(message) {
    const [status, data1, data2] = message.data;
    if (status === 144 && data2 > 0) { // Note on message
        const playedNote = midiToNoteName(data1);
        if (playedNote === currentNote) {
            document.getElementById("feedback").innerText = `Correct! You played the correct note: ${playedNote}`;
            document.getElementById("feedback").style.color = "green";
        } else {
            document.getElementById("feedback").innerText = `Incorrect! You played: ${playedNote}. Try again!`;
            document.getElementById("feedback").style.color = "red";
        }
        setTimeout(updateNote, 3000); // Delay for 3 seconds before updating the note
    }
}

function onMIDISuccess(midiAccess) {
    const inputs = midiAccess.inputs.values();
    for (let input of inputs) {
        input.onmidimessage = onMIDIMessage;
    }
}

function onMIDIFailure() {
    console.error("Could not access your MIDI devices.");
}

function quit() {
    window.close();
}

document.addEventListener("DOMContentLoaded", () => {
    updateNote();
    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
});