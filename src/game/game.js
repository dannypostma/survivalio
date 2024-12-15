import { Player } from '../js/player.js';
import { EnemySpawner } from '../js/enemySpawner.js';
import { CollisionHandler } from '../js/collisionHandler.js';
import { GameState } from '../js/gameState.js';
import { Heart } from '../js/item/Heart.js';

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

    // Update droppable items
    this.gameState.droppableItems.forEach(item => item.update());
    
    // Remove offscreen bullets
    this.gameState.bullets = this.gameState.bullets.filter(
      bullet => !bullet.isOffscreen(this.canvas)
    );

    // Update score UI on .ui .score
    const scoreElement = document.querySelector('#ui .score');
    if (scoreElement) {
      scoreElement.innerHTML = `Score: ${this.gameState.score}`;
    }

    this.gameState.updatables.forEach(updatable => {
        if (updatable.update) {
            updatable.update();
        }
    });

    // this.collisionHandler.handleCollisions();
  }


  draw() {

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.gameState.player.draw(this.ctx);
    this.gameState.enemies.forEach(enemy => enemy.draw(this.ctx));
    this.gameState.bullets.forEach(bullet => bullet.draw(this.ctx));
    // this.gameState.droppableItems.forEach(item => item.draw(this.ctx));
    this.gameState.drawables.forEach(drawable => drawable.draw(this.ctx));
  }

  gameLoop() {
    if(this.gameState.isGameOver) {
        return;
    }
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