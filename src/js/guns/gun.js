import { Bullet } from '../bullet';
import { Sprite2D } from '../sprite2d';
class Gun {
  constructor(player, gameState) {
    this.player = player;
    this.gameState = gameState;
    this.fireRate = 250; // milliseconds between shots
    this.lastFireTime = 0;
    this.isMouseDown = false;
    this.damageMultiplier = 1;
    this.sprite = new Sprite2D(0, 0, 18, 18, 'guns/revolver.png');
    this.ammo = Infinity;    
    this.startFiringLoop();
    this.name = 'Gun'
  }

  shoot() {

    if(this.ammo <= 0){
      this.player.inventory.selectSlot(0);
      return;
    }

    const mouseX = window.mouseX || 0;
    const mouseY = window.mouseY || 0;

    const currentTime = Date.now();
    if (currentTime - this.lastFireTime >= this.fireRate) {
      const playerPos = this.player.getPosition();
      
      // Calculate angle based on mouse position
      const angle = Math.atan2(
        mouseY - playerPos.y,
        mouseX - playerPos.x
      );
      
      const bullet = new Bullet(
        playerPos.x,
        playerPos.y,
        angle,
        10,
        this.gameState,
        this.damageMultiplier
      );
      
      this.gameState.bullets.push(bullet);
      this.lastFireTime = currentTime;

      // Play gunshot sound using sound manager
      this.gameState.soundManager.playGunshot();
      this.ammo--;
    }
  }

  startFiringLoop() {
    const checkFiring = () => {
      if (this.isMouseDown) {
        // Get the current mouse position
        const mousePos = {
          clientX: window.mouseX || 0,
          clientY: window.mouseY || 0
        };
        this.shoot(mousePos);
      }
      requestAnimationFrame(checkFiring);
    };

    // Start the loop
    checkFiring();
  }

  addAmmo(amount) {
    this.ammo += amount;
  }
}

export { Gun };
