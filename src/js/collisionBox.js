class CollisionBox {
    constructor(gameObject, collisionLayers) {
        this.collisionLayers = collisionLayers;
        this.gameObject = gameObject;
    }

    getCollisionBox() {
        return {
            x: this.gameObject.position.x - this.gameObject.size / 2,
            y: this.gameObject.position.y - this.gameObject.size / 2,
            width: this.gameObject.size,
            height: this.gameObject.size
        }
    }

    checkForCollision() {
        const collisionObjects = [...this.gameObject.gameState.enemies, this.gameObject.gameState.player]
            .filter(obj => obj !== this.gameObject);
        
        // Check horizontal collision
        const horizontalCollision = collisionObjects.some(obj => {
            if (!obj.collisionBox) return false;
            const thisBox = this.getCollisionBox();
            const otherBox = obj.collisionBox.getCollisionBox();
            
            // Add a small buffer for horizontal check
            thisBox.x -= 1;
            thisBox.width += 2;
            
            return this.checkCollision(thisBox, otherBox);
        });

        // Check vertical collision
        const verticalCollision = collisionObjects.some(obj => {
            if (!obj.collisionBox) return false;
            const thisBox = this.getCollisionBox();
            const otherBox = obj.collisionBox.getCollisionBox();
            
            // Add a small buffer for vertical check
            thisBox.y -= 1;
            thisBox.height += 2;
            
            return this.checkCollision(thisBox, otherBox);
        });

        return {
            horizontal: horizontalCollision,
            vertical: verticalCollision
        };
    }

    checkCollision(box1, box2) {
        return box1.x < box2.x + box2.width &&
               box1.x + box1.width > box2.x &&
               box1.y < box2.y + box2.height &&
               box1.y + box1.height > box2.y;
    }
}

export { CollisionBox };