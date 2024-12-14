import { Enemy } from './enemy.js';

class EnemySpawner {
  constructor(canvas) {
    this.canvas = canvas;
    this.spawnInterval = 2000; // 2 seconds
    this.lastSpawnTime = 0;
  }

  update(gameState) {
    const currentTime = Date.now();
    
    if (currentTime - this.lastSpawnTime > this.spawnInterval) {
      const spawnPoint = this.getRandomSpawnPoint();
      const enemy = new Enemy(spawnPoint.x, spawnPoint.y, gameState);
      gameState.enemies.push(enemy);
      this.lastSpawnTime = currentTime;
    }

    gameState.enemies.forEach(enemy => enemy.update(gameState));
  }

  getRandomSpawnPoint() {
    const side = Math.floor(Math.random() * 4);
    let x, y;

    switch(side) {
      case 0: // top
        x = Math.random() * this.canvas.width;
        y = -30;
        break;
      case 1: // right
        x = this.canvas.width + 30;
        y = Math.random() * this.canvas.height;
        break;
      case 2: // bottom
        x = Math.random() * this.canvas.width;
        y = this.canvas.height + 30;
        break;
      case 3: // left
        x = -30;
        y = Math.random() * this.canvas.height;
        break;
    }

    return { x, y };
  }
}

export { EnemySpawner }; 