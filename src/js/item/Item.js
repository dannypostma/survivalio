import { GameObject } from '../gameObject.js';
import { Area2D } from '../area2D.js';

class Item extends GameObject {
  constructor(x, y, gameState) {
    super(x, y, 20);
    this.gameState = gameState;
    this.size = 20;
    
    this.area2D = new Area2D(this, ['items'], ['player'], this.size * 1.5, this.size * 1.5);
    this.initialize();

    this.isDisappearable = false;
    this.disappearTimer = 5000; // 5 seconds countdown
    this.startDisappearTime = null;

    if (gameState) {
      console.log('Registering item as updatable');
      gameState.registerUpdatable(this);
      gameState.registerDrawable(this);
    }
  }

  initialize() {
    this.area2D.onEnter((obj) => {
      if (obj === this.gameState.player) {
        this.collect();
      }
    });
  }

  collect() {
    this.destroy();
  }

  destroy() {
    super.destroy();
    this.gameState.removeObject(this);
  }

  draw(ctx) {
    ctx.save();
    
    if (this.isDisappearable && this.startDisappearTime) {
      const elapsedTime = Date.now() - this.startDisappearTime;
      const opacity = 1 - (elapsedTime / this.disappearTimer);
      ctx.globalAlpha = Math.max(0, opacity);
    }
    
    if(this.sprite) { 
      this.sprite.setPosition(this.position.x - this.sprite.width / 2, this.position.y - this.sprite.height / 2);
      this.sprite.draw(ctx);
    } else {
      ctx.fillStyle = 'blue';
      ctx.beginPath();
      ctx.arc(this.position.x, this.position.y, 10, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
    // this.area2D.draw(ctx);
  }

  update() {
    if (this.area2D) {
      this.area2D.checkOverlap();
    }

    if (this.isDisappearable) {
      if (!this.startDisappearTime) {
        this.startDisappearTime = Date.now();
      }
      
      const elapsedTime = Date.now() - this.startDisappearTime;
      if (elapsedTime >= this.disappearTimer) {
        this.destroy();
      }
    }
  }
}

export { Item };