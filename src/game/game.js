import { Player } from '../js/player.js';
import { EnemySpawner } from '../js/enemySpawner.js';
import { CollisionHandler } from '../js/collisionHandler.js';
class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.setupCanvas();
    
    this.gameState = {
      enemies: [],
      bullets: [],
      score: 0
    };

    this.gameState.player = new Player(
      this.canvas.width / 2, 
      this.canvas.height / 2, 
      this.gameState
    );

    this.enemySpawner = new EnemySpawner(this.canvas);
    this.bindEvents();
    // this.collisionHandler = new CollisionHandler(this.gameState);
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

  update() {
    this.gameState.player.update();
    this.enemySpawner.update(this.gameState);
    
    // Update bullets
    this.gameState.bullets.forEach(bullet => bullet.update());
    
    // Remove offscreen bullets
    this.gameState.bullets = this.gameState.bullets.filter(
      bullet => !bullet.isOffscreen(this.canvas)
    );

    // this.collisionHandler.handleCollisions();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.gameState.player.draw(this.ctx);
    this.gameState.enemies.forEach(enemy => enemy.draw(this.ctx));
    this.gameState.bullets.forEach(bullet => bullet.draw(this.ctx));
  }

  gameLoop() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.gameLoop());
  }

  start() {
    this.gameLoop();
  }
}

function initGame() {
  const game = new Game();
  game.start();
}

export { initGame }; 