export const createBackgroundLayer = () => (context) => {
  const { canvas: { width, height } } = context;

  const backgroundBuffer = document.createElement('canvas');
  backgroundBuffer.width = width;
  backgroundBuffer.height = height;
  backgroundBuffer
    .getContext('2d')
    .fillStyle = '#F3F4F8';

  backgroundBuffer
    .getContext('2d')
    .fillRect(0, 0, width, height);

  context.drawImage(backgroundBuffer, 0, 0);
};

export const createSpriteLayer = entity => (context) => {
  entity.draw(context);
};
