import { Item } from './Item.js';

class Heart extends Item {
  constructor(x, y, gameState) {
    super(x, y, gameState);
  }

  collect() {
    this.gameState?.player?.gainHealth(10);
    console.log('Heart collected');
    super.collect();
  }

  draw(ctx) {
    ctx.save();
    ctx.fillStyle = 'red';
    ctx.beginPath();
    
    // Move to the top center of the heart
    ctx.moveTo(this.position.x, this.position.y - 5);
    
    // Draw the left curve
    ctx.bezierCurveTo(
      this.position.x - 10, this.position.y - 10, // control point 1
      this.position.x - 10, this.position.y + 5,  // control point 2
      this.position.x, this.position.y + 10       // end point
    );
    
    // Draw the right curve
    ctx.bezierCurveTo(
      this.position.x + 10, this.position.y + 5,  // control point 1
      this.position.x + 10, this.position.y - 10, // control point 2
      this.position.x, this.position.y - 5        // end point
    );
    
    ctx.fill();
    ctx.restore();
  }

  update() {
    super.update();
  }
}

export { Heart };