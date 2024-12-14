import { GameObject } from './gameObject.js';
import { CollisionBox } from './collisionBox.js';

class Enemy extends GameObject {
  constructor(x, y, gameState) {
    super(x, y, 20);
    this.speed = 2;
    this.gameState = gameState;
    this.collisionBox = new CollisionBox(this, [1]);
  }

  update(gameState) {
    const player = gameState.player;
    const playerPos = player.getPosition();
    const dx = playerPos.x - this.position.x;
    const dy = playerPos.y - this.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance === 0) return; // Prevent division by zero

    // Calculate normalized direction vectors
    const normalizedDx = dx / distance;
    const normalizedDy = dy / distance;

    // Store original position in case we need to revert
    const originalX = this.position.x;
    const originalY = this.position.y;

    // Try moving on X axis
    this.position.x += normalizedDx * this.speed;
    let collisionX = this.collisionBox.checkForCollision();
    
    // If collision on X, revert X movement
    if (collisionX.horizontal) {
      this.position.x = originalX;
    }

    // Try moving on Y axis
    this.position.y += normalizedDy * this.speed;
    let collisionY = this.collisionBox.checkForCollision();
    
    // If collision on Y, revert Y movement
    if (collisionY.vertical) {
      this.position.y = originalY;
    }
  }

  draw(ctx) {
    ctx.fillStyle = '#ff0000';
    super.draw(ctx);
  }
}

export { Enemy }; 