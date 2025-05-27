const AnimationController = require('./AnimationController');
const StateController = require('./StateController');
const MovementController = require('./MovementController');
const { showPetInfo, drawBounds } = require('../utils/graphicsForDebug');


class Pet {
  constructor(scene, x, y, animationMap) {
    // [SPRITE & PHYSICS SETUP]
    this.scene = scene;
    this.sprite = scene.physics.add.sprite(x, y, 'run');
    this.sprite.setCollideWorldBounds(true);
    this.sprite.body.setSize(this.sprite.height / 2, this.sprite.height);
    //this.sprite.setMask(mask);

    // [CREATING ANIMATIONS]
    this.animationMap = animationMap;
    this.animCtrl = new AnimationController(this.sprite, scene, animationMap);


    // Animation change trigger
    this.animCtrl.setOnComplete(() => {
      this.stateCtrl.targetX = null;
      this.stateCtrl.targetY = null;
      this.stateCtrl.direction = null;
      this.stateCtrl.changeState();
      this.animCtrl.play(this.stateCtrl.state);
    });

    this.sprite.setInteractive({ cursor: 'pointer' });
    this.sprite.on('pointerdown', () => {
      console.log('[TIKLAMA] Pet\'e tıklandı!');
    });

    // [CREATING STATE]
    this.stateCtrl = new StateController(this.scene ,animationMap, this.sprite.anims.currentAnim.key, this.sprite);

    // [CREATING MOVEMENT]
    this.movementCtrl = new MovementController(this.sprite, this.stateCtrl, this.animCtrl, this.animationMap);

    // @Dev
    this.debugGraphics = scene.add.graphics();
    this.text = scene.add.text(10, 10, '', {
      font: '10px monospace',
      fill: '#00ff00',
      backgroundColor: 'rgb(0, 0, 0)',
      padding: { x: 6, y: 4 }
    }).setDepth(1000);
    drawBounds(0, this.debugGraphics, this.scene); 

  }

  update(dt) {
    this.stateCtrl.timer += dt;
    const behavior = this.animationMap[this.stateCtrl.state]?.behavior;
    const spriteX = this.sprite.x;
    const width = this.scene.scale.width;
    const margin = this.stateCtrl.margin;


    // ANIMATIONS WITH DURATION
    if (behavior?.duration && this.stateCtrl.timer >= this.stateCtrl.duration) {
      this.animCtrl.triggerCompleteManually();
    }

    // ANIMATIONS WITH DETERMINED KEYS
    if (this.stateCtrl.state === 'run' || this.stateCtrl.state === 'walk') {
      this.movementCtrl.move()
    }
    else if (this.stateCtrl.state === 'jump') {
      this.movementCtrl.jump()
    }
    
    // Comment here if you want to hide the info
    showPetInfo(this.text, this.sprite.x, this.sprite.y, this.stateCtrl.targetX, this.stateCtrl.direction, this.stateCtrl.genre, this.stateCtrl.state, this.stateCtrl.timer, this.stateCtrl.duration, this.stateCtrl.genreWeightMap[this.stateCtrl.genre], this.animCtrl.animationMap[this.stateCtrl.state] );


    // if ((this.stateCtrl.state === 'run' || this.stateCtrl.state === 'walk') && (spriteX < margin || spriteX > width - margin)) {
    //   console.log("[Pet] Kenara çok yakın, state değiştiriliyor.");
    //   this.animCtrl.triggerCompleteManually();
    // }

  }
}

module.exports = Pet;

