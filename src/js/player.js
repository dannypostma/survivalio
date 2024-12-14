import { GameObject } from './gameObject.js';
import { Gun } from './gun.js';
import { CollisionBox } from './collisionBox.js';

class Player extends GameObject {
  constructor(x, y, gameState) {
    super(x, y);
    this.gameState = gameState;
    this.gun = new Gun(this, gameState);
    this.keys = {
      w: false,
      s: false,
      a: false,
      d: false
    };
    this.bindEvents();
    this.collisionBox = new CollisionBox(this, [1]);
  }

  bindEvents() {
    window.addEventListener('keydown', (e) => {
      if (this.keys.hasOwnProperty(e.key.toLowerCase())) {
        this.keys[e.key.toLowerCase()] = true;
      }
    });

    window.addEventListener('keyup', (e) => {
      if (this.keys.hasOwnProperty(e.key.toLowerCase())) {
        this.keys[e.key.toLowerCase()] = false;
      }
    });
  }

  update() {
    // Store original position
    const originalX = this.position.x;
    const originalY = this.position.y;

    // Try moving on Y axis
    if (this.keys.w) this.position.y -= this.speed;
    if (this.keys.s) this.position.y += this.speed;
    
    let collisionY = this.collisionBox.checkForCollision();
    if (collisionY.vertical) {
      this.position.y = originalY;
    }

    // Try moving on X axis
    if (this.keys.a) this.position.x -= this.speed;
    if (this.keys.d) this.position.x += this.speed;
    
    let collisionX = this.collisionBox.checkForCollision();
    if (collisionX.horizontal) {
      this.position.x = originalX;
    }
  }

  draw(ctx) {
    ctx.fillStyle = '#00ff00';
    super.draw(ctx);
  }
}

export { Player }; 