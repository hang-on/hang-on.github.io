import { initializeMIDI, logMIDIMessage } from './midi.js';

const notes = ['c4', 'd4', 'e4', 'f4', 'g4', 'a4', 'b4', 'c5', 'd5', 'e5', 'f5', 'g5', 'a5', 'b5', 'c6'];
let randomNotes = [];
let currentNoteIndex = 0;

// Function to generate random notes
function generateRandomNotes() {
    randomNotes = [];
    for (let i = 0; i < 8; i++) { // Generate 8 random notes
        const randomNote = notes[Math.floor(Math.random() * notes.length)];
        randomNotes.push(randomNote.toLowerCase()); // Convert to lowercase
    }
    updateNoteImages();
}

// Function to update note images
function updateNoteImages() {
    const noteImagesDiv = document.getElementById('note-images');
    noteImagesDiv.innerHTML = ''; // Clear existing images

    randomNotes.forEach(note => {
        const img = document.createElement('img');
        img.src = `./images/${note}.png`;
        img.alt = note;
        noteImagesDiv.appendChild(img);
    });
}

// Function to log messages
function logMessage(message) {
    console.log(message);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    generateRandomNotes();
    initializeMIDI();
});