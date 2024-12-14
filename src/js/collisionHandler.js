class CollisionHandler {
  constructor(gameState) {
    this.gameState = gameState;
    this.allGameObjects = [this.gameState.player, ...this.gameState.enemies];
  }

  handleCollisions() {
    this.allGameObjects = [this.gameState.player, ...this.gameState.enemies];
    this.allGameObjects.forEach(gameObject => {
        if(gameObject.collisionLayers.length > 0) {    
            const collisions = this.findCollisions(gameObject);
            const collisionLayers = gameObject.collisionLayers;
            const hasCollision = collisions.some(collision => collisionLayers.includes(collision.collisionLayers[0]));
            if(hasCollision) {
                console.log('collision');
            }
        }
    });
  }

  findCollisions(gameObject) {
    const hitBox = gameObject.getHitBox();
    const otherGameObjects = this.allGameObjects.filter(object => object !== gameObject);
    return otherGameObjects.filter(otherGameObject => {
        const otherHitbox = otherGameObject.getHitBox();
        return this.checkCollision(hitBox, otherHitbox);
    });

}

checkCollision(hitBox, otherHitBox) {
    return hitBox.x < otherHitBox.x + otherHitBox.width &&
    hitBox.x + hitBox.width > otherHitBox.x &&
    hitBox.y < otherHitBox.y + otherHitBox.height &&
    hitBox.y + hitBox.height > otherHitBox.y;
}
}

export { CollisionHandler };
