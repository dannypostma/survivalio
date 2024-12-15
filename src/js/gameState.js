import { Bullet } from './bullet.js';
import { Enemy } from './enemies/enemy.js';
import { Heart } from './item/Heart.js';
import { GameObject } from './gameObject.js';
import SoundManager from './soundManager.js';

export class GameState {
    constructor() {
        this.enemies = [];
        this.bullets = [];
        this.score = 0;
        this.droppableItems = [];
        this.updatables = [];
        this.drawables = [];
        this.player = null;
        this.isGameOver = false;
        this.soundManager = new SoundManager();
    }

    getAllObjects() {
        return [...this.enemies, ...this.bullets, this.player, ...this.droppableItems];
    }

    removeBullet(bullet) {
        const index = this.bullets.indexOf(bullet);
        if (index > -1) {
            this.bullets.splice(index, 1);
        }
    }
    
    removeEnemy(enemy) {
        const index = this.enemies.indexOf(enemy);
        if (index > -1) {
            this.enemies.splice(index, 1);
        }
    }

    registerUpdatable(object) {
        this.updatables.push(object);
    }

    unregisterUpdatable(object) {
        this.updatables = this.updatables.filter(updatable => updatable !== object);
    }

    registerDrawable(object) {
        this.drawables.push(object);
    }

    unregisterDrawable(object) {
        this.drawables = this.drawables.filter(drawable => drawable !== object);
    }

    removeObject(object) {
        const processedObjects = new Set();

        const removeRecursively = (obj) => {
            if (processedObjects.has(obj) || !obj) return;
            processedObjects.add(obj);

            if (obj instanceof Bullet) {
                this.removeBullet(obj);
            } else if (obj instanceof Enemy) {
                this.removeEnemy(obj);
            } else if (obj instanceof Heart) {
                this.droppableItems = this.droppableItems.filter(item => item !== obj);
            }

            this.unregisterUpdatable(obj);
            this.unregisterDrawable(obj);

            // Loop over keys
            for(const key in obj) {
                // console.log('key', key, obj[key] instanceof GameObject);
                const childObject = obj[key];
                if(this.drawables.includes(childObject) || this.updatables.includes(childObject)) {
                    removeRecursively(childObject);
                }
            }
        };

        removeRecursively(object);
    }

    handleGameOver() {
        this.isGameOver = true;
        const gameOverScreen = document.getElementById('endScreen');
        gameOverScreen.classList.remove('hidden');

        // Write score to local storage
        // If score is higher than current high score, update high score
        const highScore = localStorage.getItem('highScore');
        if(this.score > highScore) {
            localStorage.setItem('highScore', this.score);
        }

        const highScoreElement = document.getElementById('highScore');
        highScoreElement.textContent = highScore;
    }

    setPlayer(player) {
        this.player = player;
    }
} 