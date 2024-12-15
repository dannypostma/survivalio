import { Item } from './Item.js';
import { Sprite2D } from '../sprite2d.js';
class Heart extends Item {
  constructor(x, y, gameState) {
    super(x, y, gameState);
    this.isDisappearable = true;
    this.sprite = new Sprite2D(0, 0, 18, 18, 'items/heart.png');
  }

  collect() {
    this.gameState?.player?.gainHealth(10);
    super.collect();
    this.gameState.soundManager.playHeartPickup();
  }

  update() {
    super.update();
  }
}

export { Heart };