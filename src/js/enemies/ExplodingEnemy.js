import { Enemy } from './enemy.js';
import { Heart } from '../item/Heart.js';
import { StartEnemy } from './StartEnemy.js';

export class ExplodingEnemy extends Enemy {
  constructor(x, y, gameState) {
    super(x, y, 40, gameState);
    this.maxSpeed = 0.5;
    this.health = 50;
    this.normalColor = 'maroon';
  }

  die() {
    super.die();
    this.spawnChildren();
  }

  spawnChildren() {
    const amount = 5;
    const spreadRadius = 40;
    const minDistanceBetweenEnemies = 20;
    const initialPushSpeed = 3; // Speed of the initial push
    const spawnedPositions = [];

    for(let i = 0; i < amount; i++) {
      let spawnX, spawnY;
      let attempts = 0;
      const maxAttempts = 10;
      let spawnAngle;
      
      do {
        // Generate random angle and distance
        spawnAngle = (Math.PI * 2 * i / amount) + (Math.random() * 0.5 - 0.25);
        const distance = spreadRadius * (0.4 + Math.random() * 0.6);
        
        spawnX = this.position.x + Math.cos(spawnAngle) * distance;
        spawnY = this.position.y + Math.sin(spawnAngle) * distance;
        
        attempts++;
      } while (
        attempts < maxAttempts && 
        this.isPositionOverlapping(spawnX, spawnY, spawnedPositions, minDistanceBetweenEnemies)
      );

      // Store the successful position
      spawnedPositions.push({ x: spawnX, y: spawnY });
      
      const child = new StartEnemy(spawnX, spawnY, this.gameState);
      // Add initial velocity away from center
      child.velocity.x = Math.cos(spawnAngle) * initialPushSpeed;
      child.velocity.y = Math.sin(spawnAngle) * initialPushSpeed;
      this.gameState.enemies.push(child);
    }
  }

  isPositionOverlapping(x, y, existingPositions, minDistance) {
    return existingPositions.some(pos => {
      const dx = x - pos.x;
      const dy = y - pos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance < minDistance;
    });
  }
}
