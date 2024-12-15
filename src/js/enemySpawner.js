import { Enemy } from './enemies/enemy.js';
import { StartEnemy } from './enemies/StartEnemy.js';
import { FastEnemy } from './enemies/FastEnemy.js';
import { ChonkyEnemy } from './enemies/ChonkyEnemy.js';
import { ExplodingEnemy } from './enemies/ExplodingEnemy.js';
class EnemySpawner {
  constructor(canvas) {
    this.canvas = canvas;
    this.spawnInterval = 1000; // 2 seconds
    this.lastSpawnTime = 0;

    this.enemyTypesAndSpawnChance = {
        'StartEnemy': {spawnChance: 0.8, enemy: StartEnemy},
        'FastEnemy': {spawnChance: 0.1, enemy: FastEnemy},
        'ChonkyEnemy': {spawnChance: 0.05, enemy: ChonkyEnemy},
        'ExplodingEnemy': {spawnChance: 0.05, enemy: ExplodingEnemy}
    }
  }

  update(gameState) {
    const currentTime = Date.now();
    
    if (currentTime - this.lastSpawnTime > this.spawnInterval) {
      const spawnPoint = this.getRandomSpawnPoint();
      const enemy = this.getEnemyToSpawn(spawnPoint, gameState);
      
      gameState.enemies.push(enemy);
      this.lastSpawnTime = currentTime;
      this.spawnInterval = this.spawnInterval * 0.99; // Gradually increase spawn rate
    }

    gameState.enemies.forEach(enemy => enemy.update(gameState));
  }

  getEnemyToSpawn(spawnPoint, gameState) {
    const randomNumber = Math.random();
    let cumulativeProbability = 0;

    for (const [enemyType, data] of Object.entries(this.enemyTypesAndSpawnChance)) {
      cumulativeProbability += data.spawnChance;
      
      if (randomNumber <= cumulativeProbability) {
        return new data.enemy(spawnPoint.x, spawnPoint.y, gameState);
      }
    }

    // Fallback to StartEnemy if something goes wrong
    return new StartEnemy(spawnPoint.x, spawnPoint.y, gameState);
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