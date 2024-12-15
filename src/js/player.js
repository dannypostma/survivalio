import { GameObject } from './gameObject.js';
import { Gun } from './gun.js';
import { CollisionBox } from './collisionBox.js';
import { Area2D } from './area2D.js';
import { Enemy } from './enemies/enemy.js';
import { DamageHandler } from './damageHandler.js';
import { Item } from './item/Item.js';

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
    this.width = 30;
    this.height = 30;

    this.name = 'Player';
    
    const hurtboxWidth = this.width + 20;
    const hurtboxHeight = this.height + 20;
    // Offset to center the hurtbox around the player
    const hurtboxOffset = { x: 0, y: 0 };
    
    this.hurtBox = new Area2D(
      this,
      [1], // collision layers
      [1], // detection layers
      hurtboxWidth,
      hurtboxHeight,
      hurtboxOffset
    );

    this.pickupBox = new Area2D(
      this,
      ['player'], // collision layers
      ['items'], // detection layers
      this.width,
      this.height,
      { x: 0, y: 0 }
    );

    this.strength = 200;
    this.health = 100;
    this.initialize();

    this.touchingEnemies = [];

    this.damageHandler = new DamageHandler(this);

    this.alpha = 1;
    this.normalColor = '#00ff00';
    this.hitColor = '#ff0000';
  }

  initialize() {
    // Listen for bullets entering the hurtbox
    this.hurtBox.onEnter((obj) => {
      if (obj instanceof Enemy) {
        this.touchingEnemies.push(obj);
        // this.takeDamage(obj.damage);
        // this.gameState.removeBullet(obj);
      }
    });

    this.hurtBox.onExit((obj) => {
      if (obj instanceof Enemy) {
        this.touchingEnemies = this.touchingEnemies.filter(enemy => enemy !== obj);
      }
    });

    this.pickupBox.onEnter((obj) => {
      if (obj instanceof Item) {
        obj.collect();
      }
    });
    
    this.updateHealthUI();
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
        if(this.keys.d) {
            this.position.x = originalX;
        }
        if(this.keys.a) {
            this.position.x = originalX;
        }
    }    

    if(this.getOutOfBounds()){
        this.position.x = originalX;
        this.position.y = originalY;
    }

    this.hurtBox.checkOverlap();
    this.pickupBox.checkOverlap();

    if(this.touchingEnemies.length > 0) {
      this.takeDamage();
    }

    if(this.health <= 0) {
      this.gameState.handleGameOver();
    }
  }

  takeDamage(){
    this.touchingEnemies.forEach(enemy => {
      this.damageHandler.takeDamage(enemy.damage);
      this.updateHealthUI();
    });
  }
  
  gainHealth(amount) {
    this.health += amount;
    this.updateHealthUI();
  }

  updateHealthUI(){
    const healthElement = document.querySelector('#ui .health');
    if (healthElement) {
      healthElement.innerHTML = `Health: ${this.health}`;
    }
  }

  getOutOfBounds(){
    if(this.position.x < 0 || this.position.x > window.innerWidth || this.position.y < 0 || this.position.y > window.innerHeight){
      return true;
    }
    return false;
  }

  draw(ctx) {
    // Save the current context state
    ctx.save();
    
    // Set the alpha for just this drawing operation
    ctx.globalAlpha = this.damageHandler.isHit ? 0.7 : 1;
    ctx.fillStyle = this.damageHandler.isHit ? this.hitColor : this.normalColor;
    
    // Draw the player
    super.draw(ctx);
    
    // Restore the context to its previous state
    ctx.restore();

    // Draw pickup box
    // this.pickupBox.draw(ctx);
  }
}

export { Player }; 