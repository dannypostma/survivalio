class Bullet {
  constructor(x, y, angle, speed = 10) {
    this.position = { x, y };
    this.angle = angle;
    this.maxSpeed = speed;
    this.acceleration = 0.5;
    this.velocity = {
      x: Math.cos(angle) * 2, // Start slower
      y: Math.sin(angle) * 2
    };
    this.size = 5;
    this.damage = 10;
  }

  update() {
    // Accelerate towards target direction
    const targetVelocityX = Math.cos(this.angle) * this.maxSpeed;
    const targetVelocityY = Math.sin(this.angle) * this.maxSpeed;

    // Smoothly interpolate current velocity towards target velocity
    this.velocity.x += (targetVelocityX - this.velocity.x) * this.acceleration;
    this.velocity.y += (targetVelocityY - this.velocity.y) * this.acceleration;

    // Update position based on velocity
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
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