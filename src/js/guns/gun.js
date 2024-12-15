import { Bullet } from '../bullet';

class Gun {
  constructor(player, gameState) {
    this.player = player;
    this.gameState = gameState;
    this.fireRate = 250; // milliseconds between shots
    this.lastFireTime = 0;
    this.isMouseDown = false;
    this.damageMultiplier = 1;
    
    this.bindEvents();
  }

  bindEvents() {
    // window.addEventListener('click', dw(e) => this.handleSingleShot(e));
    // window.addEventListener('mousedown', () => this.handleMouseDown());
    // window.addEventListener('mouseup', () => this.handleMouseUp());
    // Add Spacebutton as shooting key
    window.addEventListener('keydown', (e) => {
      if (e.key === ' ') {
        this.handleMouseDown()
      }
    }); 

    window.addEventListener('keyup', (e) => {
      if (e.key === ' ') {
        this.handleMouseUp()
      }
    });
    // Start the continuous firing loop
    this.startFiringLoop();
  }

  handleMouseDown() {
    this.isMouseDown = true;
  }

  handleMouseUp() {
    this.isMouseDown = false;
  }

  handleSingleShot(e) {
    this.shoot(e);
  }

  shoot(e) {
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
}

export { Gun };