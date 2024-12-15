class DamageHandler {
  constructor(gameObject, cooldown = 500) {
    this.gameObject = gameObject;
    this.coolDown = cooldown;
    this.lastHitTime = 0;
    this.isInvincible = false;
    this.flashDuration = 100; // Duration of each flash in ms
    this.numberOfFlashes = 3; // Number of flashes when hit
    this.isFlashing = false;
    this.isHit = false;
  }

  takeDamage(damage){
    if(this.isOnCooldown()){
      return;
    }
    this.gameObject.health -= damage;
    this.lastHitTime = Date.now();
    this.isInvincible = true;
    this.startFlashEffect();
  }

  startFlashEffect() {
    this.isFlashing = true;
    let flashCount = 0;
    
    const flash = () => {
      if (flashCount >= this.numberOfFlashes * 2) {
        this.isFlashing = false;
        this.isInvincible = false;
        return;
      }
      
      // Toggle the flash state
      this.isHit = !this.isHit;
      flashCount++;
      
      setTimeout(flash, this.flashDuration);
    };
    
    flash();
  }

  isOnCooldown(){
    return this.lastHitTime + this.coolDown > Date.now();
  }
}

export { DamageHandler };