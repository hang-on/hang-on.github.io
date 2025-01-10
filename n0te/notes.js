const gClefNotePool = ['c4', 'd4', 'e4', 'f4', 'g4', 'a4', 'b4', 'c5', 'd5', 'e5', 'f5', 'g5', 'a5', 'b5', 'c6'];
const fClefNotePool = ['a2', 'b2', 'g2', 'f2', 'c3', 'd3', 'e3'];
const commonNotes = ['a', 'b', 'g', 'f', 'c', 'd', 'e'];
let gClefNotes = [];
let fClefNotes = [];

function generateRandomNotes() {
    logMessage('Generating random notes...');
    gClefNotes = [];
    fClefNotes = [];
    for (let i = 0; i < 8; i++) {
        const randomChance = Math.random();
        if (randomChance < 0.3) {
            gClefNotes.push('blank');
            const randomFClefNote = fClefNotePool[Math.floor(Math.random() * fClefNotePool.length)];
            fClefNotes.push(randomFClefNote);
        } else if (randomChance < 0.5) {
            const randomFClefNote = fClefNotePool[Math.floor(Math.random() * fClefNotePool.length)];
            const noteBase = randomFClefNote.slice(0, -1);
            const matchingGClefNotes = gClefNotePool.filter(note => note.startsWith(noteBase));
            const randomGClefNote = matchingGClefNotes[Math.floor(Math.random() * matchingGClefNotes.length)];
            gClefNotes.push(randomGClefNote.toLowerCase());
            fClefNotes.push(randomFClefNote);
        } else {
            const randomNote = gClefNotePool[Math.floor(Math.random() * gClefNotePool.length)];
            gClefNotes.push(randomNote.toLowerCase());
            fClefNotes.push('blank');
        }
    }
    logMessage(`G-clef notes generated: ${gClefNotes.join(', ')}`);
    logMessage(`F-clef notes generated: ${fClefNotes.join(', ')}`);
    updateNoteImages();
}

function updateNoteImages() {
    const noteImagesDiv = document.getElementById('note-images');
    noteImagesDiv.innerHTML = '';

    const gClefImg = createImageElement('./images/g-clef.png', 'G-clef');
    noteImagesDiv.appendChild(gClefImg);

    gClefNotes.forEach(note => {
        const imgSrc = note === 'blank' ? './images/blank.png' : `./images/g_clef_notes/${note}.png`;
        const img = createImageElement(imgSrc, note);
        noteImagesDiv.appendChild(img);
    });

    const fClefImagesDiv = document.getElementById('f-clef-images');
    fClefImagesDiv.innerHTML = '';

    const fClefImg = createImageElement('./images/f-clef.png', 'F-clef');
    fClefImagesDiv.appendChild(fClefImg);

    fClefNotes.forEach(note => {
        const imgSrc = note === 'blank' ? './images/blank.png' : `./images/f_clef_notes/${note}.png`;
        const img = createImageElement(imgSrc, note);
        fClefImagesDiv.appendChild(img);
    });

    logMessage('Note images updated.');
}

function createImageElement(src, alt) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.onerror = () => logMessage(`Failed to load image: ${src}`);
    return img;
}