import { Gun } from './gun.js';
import { Sprite2D } from '../sprite2d';

class FastGun extends Gun {
    constructor(player, gameState) {
        super(player, gameState);
        this.fireRate = 100;
        this.damageMultiplier = 0.8;
        this.sprite = new Sprite2D(0, 0, 18, 18, 'guns/smg.png');
        this.ammo = 10;
        this.name = 'FastGun'
    }
}

export { FastGun };