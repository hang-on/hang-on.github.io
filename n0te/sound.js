const correctSound = new Audio('sfx/correct.mp3');
const incorrectSound = new Audio('sfx/incorrect.mp3');

function preloadSounds() {
    preloadSound(correctSound, 'Correct sound preloaded', 'Failed to load correct sound');
    preloadSound(incorrectSound, 'Incorrect sound preloaded', 'Failed to load incorrect sound');
}

function preloadSound(sound, successMessage, errorMessage) {
    sound.addEventListener('canplaythrough', () => logMessage(successMessage), false);
    sound.addEventListener('error', (e) => logMessage(`${errorMessage}: ${e.message}`), false);
    sound.load();
}