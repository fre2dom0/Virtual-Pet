class AnimationController {
  constructor(sprite, scene, animationMap) {
    this.sprite = sprite;
    this.scene = scene;
    this.animationMap = animationMap;


    this.sprite.on('animationcomplete', (anim) => {
      const current = this.animationMap[anim.key];
      if (this.onCompleteCallback && !current?.behavior?.duration) {
        this.onCompleteCallback(anim.key);
      }
    });

    this.createAnimations(animationMap);
    this.play(this.sprite.texture.key);
  }

  createAnimations(map) {
    Object.values(map).forEach(({ key, info }) => {
      if (!this.scene.anims.exists(key)) {
        this.scene.anims.create({
          key,
          frames: this.scene.anims.generateFrameNumbers(key, { start: 0, end: info.frameCount - 1}),
          frameRate: info.frameRate,
          repeat: info.repeat,
        });
      }
    });
  }
  
  play(key) {
    this.sprite.play(key);
  }

  setOnComplete(callback) {
    this.onCompleteCallback = callback;
  }

  triggerCompleteManually() {
    this.onCompleteCallback();
  }

  isFinished() {
    const anim = this.sprite.anims.currentAnim;
    const progress = this.sprite.anims.getProgress();
    console.log(progress);
    return progress >= 1;
  }
}

module.exports = AnimationController;