import { Gun } from './gun.js';
import { Sprite2D } from '../sprite2d';
import { Bullet } from '../bullet';

class Shotgun extends Gun {
    constructor(player, gameState) {
        super(player, gameState);
        this.fireRate = 400; // Slower fire rate for balance
        this.damageMultiplier = 0.6; // Each pellet does less damage
        this.sprite = new Sprite2D(0, 0, 18, 18, 'guns/shotgun.png');
        this.pelletCount = 6; // Number of bullets per shot
        this.spreadAngle = Math.PI / 6; // 30-degree spread
        this.ammo = 30;
        this.damageMultiplier = 1.5;
        this.name = 'Shotgun'
    }

    shoot() {
        if(this.ammo <= 0){
            this.player.inventory.selectSlot(0);
            return;
        }

        const currentTime = Date.now();
        if (currentTime - this.lastFireTime >= this.fireRate) {
            const playerPos = this.player.getPosition();
            const mouseX = window.mouseX || 0;
            const mouseY = window.mouseY || 0;

            // Calculate base angle to mouse position
            const baseAngle = Math.atan2(
                mouseY - playerPos.y,
                mouseX - playerPos.x
            );

            // Create multiple bullets in a spread pattern
            for (let i = 0; i < this.pelletCount; i++) {
                // Calculate spread for this pellet
                const spreadOffset = (Math.random() - 0.5) * this.spreadAngle;
                const finalAngle = baseAngle + spreadOffset;

                const bullet = new Bullet(
                    playerPos.x,
                    playerPos.y,
                    finalAngle,
                    12, // Slightly faster bullets
                    this.gameState,
                    this.damageMultiplier
                );
                this.ammo--;
                
                this.gameState.bullets.push(bullet);
            }

            this.lastFireTime = currentTime;
            this.gameState.soundManager.playGunshot();
           
        }
    }
}

export { Shotgun }; 