import { GameObject } from '../gameObject.js';
import { CollisionBox } from '../collisionBox.js';
import { Area2D } from '../area2D.js';
import { Bullet } from '../bullet.js';
import { DamageHandler } from '../damageHandler.js';

class Enemy extends GameObject {
  constructor(x, y, size, gameState) {
    super(x, y, size);
    this.speed = 2;
    this.gameState = gameState;
    this.collisionBox = new CollisionBox(this, [1]);
    this.hurtBox = new Area2D(this, [3], [2], this.size, this.size);
    this.hitBox = new Area2D(this, [1], [1], this.size, this.size);
    this.health = 10;
    this.damage = 10;
    this.damageHandler = new DamageHandler(this, 100);
    this.initialize();
    this.velocity = { x: 0, y: 0 };
    this.normalColor = '#ff6600';
    this.hitColor = '#ff0000';
    this.acceleration = 0.5;
    this.friction = 0.9;
    this.maxSpeed = 2;
  }

  initialize() {
    this.hurtBox.onEnter((obj) => {
      if (obj instanceof Bullet) {
        this.gameState.soundManager.playHit();
        console.log(obj.getDamage());
        this.damageHandler.takeDamage(obj.getDamage());
        this.gameState.removeBullet(obj);
        // Add little push back velocity from bullet
        this.velocity.x = -obj.position.x * obj.knockbackStrength;
        this.velocity.y = -obj.position.y * obj.knockbackStrength;
        if (this.health <= 0) {
          this.die();
        }
      }
    });
  }

  update(gameState) {
    const player = gameState.player;
    const playerPos = player.getPosition();
    const dx = playerPos.x - this.position.x;
    const dy = playerPos.y - this.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance === 0) return;

    const normalizedDx = dx / distance;
    const normalizedDy = dy / distance;

    this.velocity.x += normalizedDx * this.acceleration;
    this.velocity.y += normalizedDy * this.acceleration;

    const currentSpeed = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);
    if (currentSpeed > this.maxSpeed) {
      this.velocity.x = (this.velocity.x / currentSpeed) * this.maxSpeed;
      this.velocity.y = (this.velocity.y / currentSpeed) * this.maxSpeed;
    }

    const originalX = this.position.x;
    const originalY = this.position.y;

    this.position.x += this.velocity.x;
    let collisionX = this.collisionBox.checkForCollision();
    
    if (collisionX.horizontal) {
      this.position.x = originalX;
      this.velocity.x = 0;
    }

    this.position.y += this.velocity.y;
    let collisionY = this.collisionBox.checkForCollision();
    
    if (collisionY.vertical) {
      this.position.y = originalY;
      this.velocity.y = 0;
    }

    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;

    this.hurtBox.checkOverlap();
  }

  applyForce(forceX, forceY) {
    this.velocity.x += forceX;
    this.velocity.y += forceY;
  }

  die() {
    const enemyIndex = this.gameState.enemies.indexOf(this);
      if (enemyIndex > -1) {        
        this.destroy(enemyIndex);
    }
    this.gameState.score += 100;
  }

  draw(ctx) {
    // Draw the enemy with flash effect
    ctx.fillStyle = this.damageHandler.isHit ? this.hitColor : this.normalColor;
    super.draw(ctx);
    this.hurtBox.draw(ctx);
  }

  spawnItem() {
    // Implement coin dropped
  }

  destroy() {
    super.destroy();
    this.gameState.removeObject(this);
    this.hurtBox.destroy();
  } 
}

export { Enemy }; 