import { Player } from '../js/player.js';
import { EnemySpawner } from '../js/enemySpawner.js';
import { CollisionHandler } from '../js/collisionHandler.js';
import { GameState } from '../js/gameState.js';
import { Heart } from '../js/item/Heart.js';
import { Inventory } from '../js/inventory.js';
import { Sprite2D } from '../js/sprite2d';
import { FastAmmo } from '../js/item/FastAmmo.js';

class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.setupCanvas();
    
    this.gameState = new GameState();
    
    this.gameState.setPlayer(new Player(
      this.canvas.width / 2, 
      this.canvas.height / 2, 
      this.gameState
    ));

    this.enemySpawner = new EnemySpawner(this.canvas);

    new Heart(this.canvas.width / 1.5, this.canvas.height / 2, this.gameState);

    new FastAmmo(this.canvas.width / 1.8, this.canvas.height / 2, this.gameState);
    this.bindEvents();
    // this.collisionHandler = new CollisionHandler(this.gameState);

    this.lastTimestamp = 0;
    this.targetFPS = 60;
    this.timeStep = 1000 / this.targetFPS; // milliseconds per frame at 60 FPS

  }

  setupCanvas() {
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  bindEvents() {
    // Add any global event listeners here
  }

  update(deltaTime) {
    // Convert deltaTime to seconds for easier calculations
    const dt = deltaTime / 1000;


    this.gameState.player.update(dt);
    this.enemySpawner.update(this.gameState, dt);
    
    // Update bullets with deltaTime
    this.gameState.bullets.forEach(bullet => bullet.update(dt));

    // Update droppable items with deltaTime
    this.gameState.droppableItems.forEach(item => item.update(dt));
    
    // Remove offscreen bullets
    this.gameState.bullets = this.gameState.bullets.filter(
      bullet => !bullet.isOffscreen(this.canvas)
    );

    // Update score UI
    const scoreElement = document.querySelector('#ui .score');
    if (scoreElement) {
      scoreElement.innerHTML = `Score: ${this.gameState.score}`;
    }

    this.gameState.updatables.forEach(updatable => {
      if (updatable.update) {
        updatable.update(dt);
      }
    });

  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.gameState.player.draw(this.ctx);
    this.gameState.enemies.forEach(enemy => enemy.draw(this.ctx));
    this.gameState.bullets.forEach(bullet => bullet.draw(this.ctx));
    // this.gameState.droppableItems.forEach(item => item.draw(this.ctx));
    this.gameState.drawables.forEach(drawable => drawable.draw(this.ctx));
  }

  gameLoop(timestamp) {
    if (this.gameState.isGameOver) {
      return;
    }

    if (!this.lastTimestamp) {
      this.lastTimestamp = timestamp;
    }

    // Calculate time elapsed since last frame
    const deltaTime = timestamp - this.lastTimestamp;
    
    // Update game state with deltaTime
    this.update(deltaTime);
    
    // Draw the frame
    this.draw();
    
    // Store timestamp for next frame
    this.lastTimestamp = timestamp;

    // Request next frame
    requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
  }

  start() {
    requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
  }
}

function initGame() {
  const game = new Game();
  game.start();
}

export { initGame }; 