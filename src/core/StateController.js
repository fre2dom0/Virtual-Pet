const genreWeightMap = require("../data/genreWeightMap.json")

class StateController {
  constructor(scene, animationMap, startState, sprite) {
    this.scene = scene;
    
    this.map = animationMap;
    this.genreWeightMap = genreWeightMap;

    this.genre = animationMap[startState].weightInfo.genre;
    this.state = startState;
    this.timer = 0;
    this.duration = this.getRandomDuration();
    this.sprite = sprite;
    
    this.targetX = null;
    this.targetY = null;
    this.direction = null;
    this.margin = this.sprite.width; 
  }

  

  changeState() {
    const currentGenre = this.map[this.state]?.weightInfo?.genre || 'move';
    const nextGenre = this.weightedRandomSelect(this.genreWeightMap[currentGenre]);

    const statePool = Object.entries(this.map)
      .filter(([stateKey, value]) =>
        value?.weightInfo?.genre === nextGenre && value.activity !== false && stateKey !== this.state
      )
      .map(([key, value]) => ({
        key,
        weight: value.weightInfo?.weight || 0
      }));

    if (statePool.length === 0) {
      console.warn(`[StateChange] ${nextGenre} cannot change state.`);
      return;
    }

    const nextState = this.weightedRandomSelectFromArray(statePool);

    this.genre = nextGenre;
    this.state = nextState;
    this.timer = 0;
    this.hasJumped = false;
    this.duration = this.getRandomDuration() || 0;
  }

  weightedRandomSelect(weightsObj) {
    const total = Object.values(weightsObj).reduce((a, b) => a + b, 0);
    let rnd = Math.random() * total;
    for (const [key, weight] of Object.entries(weightsObj)) {
      if (rnd < weight) {
        // console.log(`RND ${rnd} | Weight ${weight} | Key ${key}`)
        return key;
      }
      rnd -= weight;
    }
  }
  
  weightedRandomSelectFromArray(arr) {
  const total = arr.reduce((sum, item) => sum + item.weight, 0);
  let rnd = Math.random() * total;
    for (const item of arr) {
      if (rnd < item.weight) {
        // console.log(`RND Arr ${rnd} | Weight ${item.weight} | Key ${item.key}`)
        return item.key;
      }
    rnd -= item.weight;
    }
  }

  getRandomDirection() {
    const margin = this.margin;
    const spriteX = this.sprite.x;
    const width = this.scene.scale.width;

    const distanceToLeft = spriteX;
    const distanceToRight = width - spriteX;

    const nearLeft = distanceToLeft < margin;
    const nearRight = distanceToRight < margin;

    let direction;

    if (nearLeft) {
      direction = 1; 
    } else if (nearRight) {
      direction = -1;
    } else {
      direction = Math.random() < 0.5 ? -1 : 1;
    }

    this.direction = direction;
  }

  getRandomTarget() {

    const behavior = this.map[this.state].behavior;
    
    const margin = this.margin || 50;
    const maxDistance = behavior.maxDistancePercX * this.scene.scale.width || this.scene.scale.width;
    const minDistance = behavior.minDistancePercX * maxDistance || 0.2 * maxDistance;
    const spriteX = this.sprite.x;
    const center = maxDistance / 2;
    this.getRandomDirection();


    const rangeMin = this.direction === 1 ? spriteX + minDistance : margin;
    const rangeMax = this.direction === 1 ? maxDistance - margin : spriteX - minDistance;



    this.targetX = Phaser.Math.Clamp(
      Phaser.Math.Between(rangeMin, rangeMax),
      margin,
      maxDistance - margin
    );
    

    console.log(`[Target] X: ${this.targetX}, Sprite X : ${spriteX}, Min & Max Distance ${minDistance} - ${maxDistance},  Direction: ${this.direction}`);
  }

  getRandomDuration() {
    const anim = this.map[this.state];
    const options = anim.behavior?.duration || [];
    
    if (!options.length) return 0;
    return options[Math.floor(Math.random() * options.length)];
  }
  
}

module.exports = StateController;
