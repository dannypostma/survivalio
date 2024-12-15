import { GameObject } from '../gameObject.js';
import { CollisionBox } from '../collisionBox.js';
import { Area2D } from '../area2D.js';
import { Bullet } from '../bullet.js';
import { DamageHandler } from '../damageHandler.js';
import { Heart } from '../item/Heart.js';
import { Enemy } from './enemy.js';

class StartEnemy extends Enemy {
  constructor(x, y, gameState) {
    super(x, y, 20, gameState);
    this.maxSpeed = 1
    // this.gameState = gameState;
  }

  die() {
    super.die();
    // this.spawnItem();w
  }


  spawnItem() {
    super.spawnItem();
    const randomNumber = Math.random();
    if (randomNumber < 0.1) {
      // 10% chance to spawn a heart
      new Heart(this.position.x, this.position.y, this.gameState)
    }
  }
}

export { StartEnemy }; 