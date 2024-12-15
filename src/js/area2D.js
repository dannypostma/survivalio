import { Item } from './item/Item.js';
import { Player } from './player.js';

class Area2D {
    constructor(parent, layerMask, collisionMask, width, height, offset = { x: 0, y: 0 }) {
        this.parent = parent;
        this.gameState = parent.gameState;
        this.layerMask = layerMask;
        this.collisionMask = collisionMask;
        this.width = width || parent.size;
        this.height = height || parent.size;
        this.offset = offset;
        this.onEnterCallbacks = [];
        this.onExitCallbacks = [];
        this.overlappingObjects = new Set();

        if (this.gameState) {
            this.gameState.registerUpdatable(this);
            // this.gameState.registerDrawable(this);
        }
    }

    destroy() {
        this.gameState.removeObject(this);
        this.onEnterCallbacks = [];
        this.onExitCallbacks = [];
        this.overlappingObjects.clear();
    }

    getArea() {
        return {
            x: this.parent.position.x + this.offset.x - this.width / 2,
            y: this.parent.position.y + this.offset.y - this.height / 2,
            width: this.width,
            height: this.height
        }
    }

    checkOverlap() {
        if (!this.gameState?.getAllObjects) {
            console.warn('gameState.getAllObjects is not available');
            return;
        }

        const currentOverlapping = new Set();
        const allObjects = [...this.gameState.getAllObjects()]
            .filter(obj => {
                if (obj === this.parent) return false;
                // Check all properties of the object for Area2D instances
                return Object.values(obj).some(prop => prop instanceof Area2D);
            });

        allObjects.forEach(obj => {
            // Find all Area2D instances in the object
            const areas = Object.values(obj).filter(prop => prop instanceof Area2D);
            
            areas.forEach(otherArea => {
                if (!otherArea) return;

                const canOverlap = this.canOverlapWith(otherArea.layerMask);
                if (!canOverlap) return;

                const thisArea = this.getArea();
                const otherBox = otherArea.getArea();

                if (this.checkAreaOverlap(thisArea, otherBox)) {
                    currentOverlapping.add(obj);
                    
                    if (!this.overlappingObjects.has(obj) && this.onEnterCallbacks.length > 0) {
                        this.onEnterCallbacks.forEach(callback => callback(obj));
                    }
                }
            });
        });

        this.overlappingObjects.forEach(obj => {
            if (!currentOverlapping.has(obj) && this.onExitCallbacks.length > 0) {
                this.onExitCallbacks.forEach(callback => callback(obj));
            }
        });

        this.overlappingObjects = currentOverlapping;
    }

    canOverlapWith(otherLayers) {
        if (this.collisionMask.length === 0) return true;
        return otherLayers.some(layer => this.collisionMask.includes(layer));
    }

    checkAreaOverlap(area1, area2) {
        return area1.x < area2.x + area2.width &&
               area1.x + area1.width > area2.x &&
               area1.y < area2.y + area2.height &&
               area1.y + area1.height > area2.y;
    }

    onEnter(callback) {
        this.onEnterCallbacks.push(callback);
    }

    onExit(callback) {
        this.onExitCallbacks.push(callback);
    }

    draw(ctx) {
        const area = this.getArea();
        ctx.strokeStyle = 'rgba(128, 0, 128, 0.5)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.rect(area.x, area.y, area.width, area.height);
        ctx.stroke();
    }
}

export { Area2D };
