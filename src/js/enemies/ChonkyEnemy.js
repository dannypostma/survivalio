import { Enemy } from './enemy.js';
import { Heart } from '../item/Heart.js';

export class ChonkyEnemy extends Enemy {
  constructor(x, y, gameState) {
    super(x, y, 60, gameState);
    this.maxSpeed = 0.5;
    this.health = 100;
    this.damage = 20;
    this.normalColor = 'pink';
  }

  die() {
    super.die();
    this.spawnItem();
  }

  spawnItem() {
    super.spawnItem();
    const randomNumber = Math.random();
    // if (randomNumber < 0.5) {
      // 10% chance to spawn a heart
      new Heart(this.position.x, this.position.y, this.gameState)
    // }
  }
 
}
