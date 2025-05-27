const Phaser = require('phaser');
const Pet = require('./core/Pet.js'); // Pet sınıfı burada
const { ipcRenderer } = require('electron');
const { drawBounds } = require('./utils/graphicsForDebug.js')
const animationMap = require('./data/animationMap.json'); // tüm animasyon tanımları burada

let pet;

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 'rgba(0,0,0,0)',
  transparent: true,
  physics: {
    default: 'arcade',
    arcade: { 
      gravity: { y: 300 },
      debug: true
    },
  },
  scene: {
    preload,
    create,
    update
  }
};

function preload() {
  const animations = [
    { key: 'idle', file: 'Idle.png', frameHeight: 128 },
    { key: 'walk', file: 'Walk.png', frameHeight: 128},
    { key: 'run', file: 'Run.png' },
    { key: 'jump', file: 'Jump.png' },
    { key: 'sleep', file: 'Sleep.png' },
    { key: 'hurt', file: 'Hurt.png' },
    { key: 'attack', file: 'Attack_1.png' },
    { key: 'attack2', file: 'Attack_2.png' },
    { key: 'attack3', file: 'Attack_3.png' },
    { key: 'run_attack', file: 'Run+Attack.png' }
  ];

  animations.forEach(anim => {
    this.load.spritesheet(anim.key, `./assets/Blue_Slime/${anim.file}`, {
      frameWidth: anim.frameWidth || 128,
      frameHeight: anim.frameHeight || 128
    });
  });
}

function create() {
  pet = new Pet(this, window.innerWidth / 2, 0 , animationMap);
  this.scale.on('resize', handleResize, this);

  window.addEventListener('keydown', (e) => {
    if (e.shiftKey && e.code === 'KeyC') {
      console.log('[KOMBO] Shift + C algılandı!');

    }
  });

}ipcRenderer

function handleResize(gameSize, baseSize, displaySize, resolution) {
  const width = gameSize.width;
  const height = gameSize.height;

  // Dünyayı yeniden boyutlandır (özellikle collider veya sınırlı alan varsa)
  this.physics.world.setBounds(0, 0, width, height);

  // Pet'i yeniden hizala (istenirse)
  pet.sprite.setCollideWorldBounds(true);
  drawBounds(0, pet.debugGraphics ,pet.sprite.scene);
  
  // pet.sprite.setPosition(width / 2, height - 50); // opsiyonel: ortala
}

function update(_, delta) {
  pet.update(delta / 1000);
  document.title = `${pet.stateCtrl.state} | ${pet.stateCtrl.timer} / ${pet.stateCtrl.duration}`;
}

const game = new Phaser.Game(config);

window.addEventListener('resize', () => {
  game.scale.resize(window.innerWidth, window.innerHeight);
});
