class GameObject {
  constructor(x, y, size = 30) {
    this.position = { x, y };
    this.size = size;
    this.speed = 5;
    this.collisionLayers = [];
  }

  getPosition() {
    return this.position;
  }

  getSize() {
    return {
        width: this.size,
        height: this.size
    };
  }

  getHitBox() {
    return {
        x: this.position.x - this.size/2,
        y: this.position.y - this.size/2,
        width: this.size,
        height: this.size
    };
  }

  draw(ctx) {
    ctx.fillRect(
      this.position.x - this.size/2, 
      this.position.y - this.size/2, 
      this.size, 
      this.size
    );
  }
}

export { GameObject }; 