import Entity from './Entity';
import { loadPlayerSprite } from './sprites';

export const createPlayer = () =>
  loadPlayerSprite()
    .then((sprite) => {
      const player = new Entity();
      player.pos.set(0, 0);
      player.vel.set(5, 5);

      player.draw = function drawPlayer(context) {
        sprite.draw('idle', context, this.pos.x, this.pos.y);
      };

      player.update = function updatePlayer(frameRate) {
        this.pos.x += this.vel.x / frameRate;
        this.pos.y += this.vel.y / frameRate;
      };

      return player;
    });
