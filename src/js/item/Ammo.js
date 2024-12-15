import { Item } from './Item.js';
import { Gun } from '../guns/gun.js';
import { Sprite2D } from '../sprite2d';

export class Ammo extends Item {
    constructor(x,y,gameState,amount = 10) {
        super(x,y,gameState);
        this.amount = amount;
        this.sprite = new Sprite2D(0, 0, 18, 18, 'guns/slow.png');
        this.isDisappearable = true;
    }

    collect() {
        super.collect();
        this.gameState.player.addAmmo(Gun, this.amount);
    }


}