import { Enemy } from './enemies/enemy.js';
import { StartEnemy } from './enemies/StartEnemy.js';
import { FastEnemy } from './enemies/FastEnemy.js';
import { ChonkyEnemy } from './enemies/ChonkyEnemy.js';
import { ExplodingEnemy } from './enemies/ExplodingEnemy.js';

class EnemySpawner {
  constructor(canvas) {
    this.canvas = canvas;
    this.baseSpawnInterval = 1.0; // Spawn interval in seconds
    this.currentSpawnTimer = 0;
    this.maxEnemies = 10; // Starting enemy limit
    this.enemyLimitIncreaseTimer = 0;
    this.enemyLimitIncreaseInterval = 3; // Increase limit every 10 seconds

    this.enemyTypesAndSpawnChance = {
        'StartEnemy': {
            spawnChance: 0.8, 
            enemy: StartEnemy,
            unlockThreshold: 0  // Available from start
        },
        'FastEnemy': {
            spawnChance: 0.1, 
            enemy: FastEnemy,
            unlockThreshold: 15  // Unlocks when maxEnemies >= 15
        },
        'ChonkyEnemy': {
            spawnChance: 0.05, 
            enemy: ChonkyEnemy,
            unlockThreshold: 25  // Unlocks when maxEnemies >= 25
        },
        'ExplodingEnemy': {
            spawnChance: 0.05, 
            enemy: ExplodingEnemy,
            unlockThreshold: 35  // Unlocks when maxEnemies >= 35
        }
    }
  }

  update(gameState, dt) {

    this.currentSpawnTimer += dt;
    this.enemyLimitIncreaseTimer += dt;

    // Increase enemy limit every 10 seconds
    if (this.enemyLimitIncreaseTimer >= this.enemyLimitIncreaseInterval) {
      this.maxEnemies += 1;
      this.enemyLimitIncreaseTimer = 0;
    }

    // Only spawn if we haven't reached the enemy limit
    if (this.currentSpawnTimer >= this.baseSpawnInterval && gameState.enemies.length < this.maxEnemies) {
      const spawnPoint = this.getRandomSpawnPoint();
      const enemy = this.getEnemyToSpawn(spawnPoint, gameState);
      
      gameState.enemies.push(enemy);
      this.currentSpawnTimer = 0;
      this.baseSpawnInterval *= 0.99; // Gradually increase spawn rate
    }

    gameState.enemies.forEach(enemy => enemy.update(gameState));
  }

  getEnemyToSpawn(spawnPoint, gameState) {
    const randomNumber = Math.random();
    let cumulativeProbability = 0;
    let availableEnemies = Object.entries(this.enemyTypesAndSpawnChance)
      .filter(([_, data]) => this.maxEnemies >= data.unlockThreshold);
    
    // Normalize probabilities for available enemies
    const totalProbability = availableEnemies.reduce((sum, [_, data]) => sum + data.spawnChance, 0);
    
    for (const [enemyType, data] of availableEnemies) {
      const normalizedProbability = data.spawnChance / totalProbability;
      cumulativeProbability += normalizedProbability;
      
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