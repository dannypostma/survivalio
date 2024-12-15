import { Gun } from './gun.js';

class FastGun extends Gun {
    constructor(player, gameState) {
        super(player, gameState);
        this.fireRate = 100;
        this.damageMultiplier = 0.75;
    }
}

export { FastGun };