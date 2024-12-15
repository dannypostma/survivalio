import { initGame } from './game/game.js';
import './style.css';

// Initialize game when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const gameCanvas = document.getElementById('gameCanvas');
    const startScreen = document.getElementById('startScreen');
    const gameContainer = document.getElementById('gameContainer');
    const restartButton = document.getElementById('restartButton');
    const endScreen = document.getElementById('endScreen');

    startButton.addEventListener('click', () => {
        initGame();
        startScreen.classList.add('hidden');
        gameContainer.classList.remove('hidden');
    });

    restartButton.addEventListener('click', () => {

        // Get score from local storage
        
        initGame();
        endScreen.classList.add('hidden');
        gameContainer.classList.remove('hidden');
    });

}); 

// Track mouse position globally
window.addEventListener('mousemove', (e) => {
    window.mouseX = e.clientX;
    window.mouseY = e.clientY;
  });

