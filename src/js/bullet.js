import { Area2D } from './area2D.js';


class Bullet {
  constructor(x, y, angle, speed = 10, gameState, gunDamageMultiplier = 1) {
    this.position = { x, y };
    this.angle = angle;
    this.maxSpeed = speed;
    this.acceleration = 0.5;
    this.velocity = {
      x: Math.cos(angle) * 2,
      y: Math.sin(angle) * 2
    };
    this.size = 5;
    this.damage = 10;
    this.gameState = gameState;
    this.knockbackStrength = 0.5;
    this.gunDamageMultiplier = gunDamageMultiplier;
    this.speed = 600; // pixels per second
    
    // Bullet is in layer 2 and can collide with layer 3 (hurtboxes)
    this.area = new Area2D(this, [2], [3]);
  }

  getDamage() {
    return this.damage * this.gunDamageMultiplier;
  }

  update(dt) {
    // Use deltaTime to update position
    this.position.x += Math.cos(this.angle) * this.speed * dt;
    this.position.y += Math.sin(this.angle) * this.speed * dt;

    // Check for collisions
    this.area.checkOverlap();
  }

  draw(ctx) {
    // Draw bullet trail
    ctx.beginPath();
    ctx.strokeStyle = '#ffff00';
    ctx.lineWidth = 2;
    const trailLength = 10;
    ctx.moveTo(
      this.position.x - this.velocity.x * trailLength,
      this.position.y - this.velocity.y * trailLength
    );
    ctx.lineTo(this.position.x, this.position.y);
    ctx.stroke();

    // Draw bullet
    ctx.fillStyle = '#ffff00';
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2);
    ctx.fill();

    this.area.draw(ctx);
  }

  isOffscreen(canvas) {
    return (
      this.position.x < 0 ||
      this.position.x > canvas.width ||
      this.position.y < 0 ||
      this.position.y > canvas.height
    );
  }

  getPosition() {
    return this.position;
  }

  getSize() {
    return this.size;
  }
}

export { Bullet };