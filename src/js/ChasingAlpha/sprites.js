import SpriteSheet from './SpriteSheet';
import { loadImage } from './loaders';

export const loadPlayerSprite = () =>
  loadImage(require('../../img/player.png')) // eslint-disable-line
    .then((image) => {
      const sprites = new SpriteSheet(image, 400, 400);
      sprites.defineTile('idle', 0, 0, 0.25, 0.25);
      return sprites;
    });
