import { Item } from './Item.js';
import { Ammo } from './Ammo.js';
import { FastGun } from '../guns/FastGun.js';
import { Sprite2D } from '../sprite2d';

export class FastAmmo extends Ammo {
    constructor(x,y,gameState,amount = 10) {
        super(x,y,gameState);
        this.amount = amount;
        this.sprite = new Sprite2D(0, 0, 18, 18, 'guns/smg.png');
    }

    collect() {
        super.collect();
        this.gameState.player.addAmmo(FastGun, this.amount);
    }


}