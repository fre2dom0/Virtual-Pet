const showPetInfo = (text, x, y, targetX, direction, genre, state, timer, duration, genreMap, animationMap) => {
  const animWeight = animationMap.weightInfo?.weight ?? 'N/A';
  const genreWeight = genreMap[genre] ?? 'N/A';

  text.setText([
    `● Genre & State   : ${genre} & ${state}`,
    `● Timer & Duration: ${timer.toFixed(2)} / ${duration}`,
    `● Genre Weight    : ${genreWeight}`,
    `● Anim Weight     : ${animWeight}`,
    `● Sprite Position : x=${x.toFixed(2)} | y=${y.toFixed(2)}`,
    `● Target & Dir    : x=${targetX !== null ? targetX.toFixed(2) : 'null'} | dir=${direction ?? 'null'}`,
  ]);

  return text;
}

  

const drawBounds = (activity, debugGraphics, scene) => {
  switch (activity) {
    case 1:
      debugGraphics.clear();
      const width = scene.scale.width;
      const height = scene.scale.height;
    
      const bounds = {
        minX: 0,
        maxX: width,
        minY: 0,
        maxY: height,
        centerX: width / 2,
        centerY: height / 2
      };

      debugGraphics.lineStyle(5, 0xff0000, 1);
    
      debugGraphics.strokeRect(bounds.minX, bounds.minY, bounds.maxX - bounds.minX, bounds.maxY - bounds.minY);

      debugGraphics.lineStyle(1, 0x00ff00, 5);
      debugGraphics.strokeLineShape(
        new Phaser.Geom.Line(bounds.centerX, bounds.minY, bounds.centerX, bounds.maxY)
      );
      break;
  
    default:
      break;
  }
}
  
module.exports = {
  showPetInfo,
  drawBounds,
}