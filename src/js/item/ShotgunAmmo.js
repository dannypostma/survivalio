import { Item } from './Item.js';
import { Shotgun } from '../guns/Shotgun.js';
import { Sprite2D } from '../sprite2d.js';
import { Ammo } from './Ammo.js';

export class ShotgunAmmo extends Ammo {
    constructor(x,y,gameState,amount = 10) {
        super(x,y,gameState);
        this.amount = amount;
        this.sprite = new Sprite2D(0, 0, 18, 18, 'guns/shotgun.png');
    }

    collect() {
        super.collect();
        this.gameState.player.addAmmo(Shotgun, this.amount);
    }


}