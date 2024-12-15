// src/js/sprite2d.js

import { resolveAssetPath } from '../utils/assetLoader';

const SPRITE_BASE_PATH = '/sprites';

export class Sprite2D {
    constructor(x, y, width, height, imageSrc) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.imageSrc = imageSrc;
        this.isLoaded = false;
        this.image = new Image();
        this.loadImage();
    }

    loadImage() {
        return new Promise((resolve, reject) => {
            this.image.onload = () => {
                this.isLoaded = true;
                resolve(this.image);
            };
            this.image.onerror = (error) => {
                console.error(`Failed to load sprite: ${this.imageSrc}`, error);
                reject(error);
            };
            
            const resolvedPath = resolveAssetPath(this.imageSrc);
            this.image.src = resolvedPath;
        });
    }

    draw(context) {
        if (!this.isLoaded) return;
        
        context.drawImage(
            this.image,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    getPosition() {
        return { x: this.x, y: this.y };
    }

    getBounds() {
        return {
            left: this.x,
            top: this.y,
            right: this.x + this.width,
            bottom: this.y + this.height
        };
    }
}