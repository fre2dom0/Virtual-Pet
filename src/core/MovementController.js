class MovementController {
  constructor(sprite, stateCtrl, animCtrl, animationMap) {
    this.sprite = sprite;
    this.stateCtrl = stateCtrl;
    this.animCtrl = animCtrl;
    this.map = animationMap;
    this.hasJumped = false;
  }

  move() {
    if (!this.stateCtrl.targetX) {
      this.stateCtrl.getRandomTarget();
    }

    const behavior = this.map[this.stateCtrl.state]?.behavior;
    const dx = this.stateCtrl.targetX - this.sprite.x;

    this.sprite.flipX = this.stateCtrl.direction < 0;
    this.sprite.setVelocityX(this.stateCtrl.direction * behavior.speedX);

    if (Math.abs(dx) < 10) {
      this.sprite.setVelocityX(0);
      this.stateCtrl.targetX = null;
      this.animCtrl.triggerCompleteManually();
    }
  }

  jump() {
    const frameIndex = this.sprite.anims.currentFrame?.index;


    if (frameIndex >= 4 && frameIndex <= 8 && !this.stateCtrl.hasJumped) {
      this.stateCtrl.hasJumped = true;
    
      if (!this.stateCtrl.targetX) {
        this.stateCtrl.getRandomTarget();
      }
    
      const dx = this.stateCtrl.targetX - this.sprite.x;
      const t = this.stateCtrl.map[this.stateCtrl.state].jumpDuration || 1.5; // Uçuş süresi
      const gravity = Math.abs(this.sprite.body.world.gravity.y);
    
      const velocityX = dx / t;
      const velocityY = -(0.5 * gravity * t); // yukarı negatif
    
      this.sprite.flipX = velocityX < 0;
      this.sprite.setVelocityX(velocityX);
      this.sprite.setVelocityY(velocityY);
    
      // console.log(`[Jump] dx: ${dx}, vx: ${velocityX}, vy: ${velocityY}`);
    }
    

    // 9. frame sonrası yere inene kadar 10. frame'de kal
    if (frameIndex >= 8 && !this.sprite.body.blocked.down && !this.sprite.body.touching.down) {
      // Animasyonu 10. frame'e sabitle
      this.sprite.anims.pause(this.sprite.anims.currentAnim.frames[8]);
      // console.log(`[Jump] Havada, frame 10'da bekletiliyor`);
    }

    // Yere inince animasyonu devam ettir
    if (frameIndex >= 9 && (this.sprite.body.blocked.down || this.sprite.body.touching.down)) {
      this.sprite.anims.resume(); // Animasyonu devam ettir
      this.sprite.setVelocityX(0);
      
      this.sprite.setVelocityY(0);
      this.stateCtrl.hasJumped = false;
      this.stateCtrl.targetX = null;
      this.stateCtrl.targetY = null;
      this.stateCtrl.duration = 0;
      // console.log(`[Jump] Yere indi, animasyon devam`);
    }

    // Eğer yere indiysen ve animasyon bittiğindeysen
    if (frameIndex >= 11 && (this.sprite.body.blocked.down || this.sprite.body.touching.down)) {
    }
  }
}

module.exports = MovementController;