import { Bullet } from './bullet.js';

class Gun {
  constructor(player, gameState) {
    this.player = player;
    this.gameState = gameState;
    this.fireRate = 250; // milliseconds between shots
    this.lastFireTime = 0;
    this.bindEvents();
  }

  bindEvents() {
    window.addEventListener('click', (e) => this.handleShoot(e));
  }
d
  handleShoot(e) {
    const currentTime = Date.now();
    if (currentTime - this.lastFireTime >= this.fireRate) {
      const playerPos = this.player.getPosition();
      
      // Calculate angle based on mouse position
      const angle = Math.atan2(
        e.clientY - playerPos.y,
        e.clientX - playerPos.x
      );
      
      const bullet = new Bullet(
        playerPos.x,
        playerPos.y,
        angle
      );
      
      this.gameState.bullets.push(bullet);
      this.lastFireTime = currentTime;
    }
  }
}

export { Gun };