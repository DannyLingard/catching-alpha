import React, { Component } from 'react';

import Compositor from './Compositor';

import { createPlayer } from './entities';
import { createBackgroundLayer, createSpriteLayer } from './layers';

import asteroidsMatrix from './matrix/1-1.json';

class ChasingAlpha extends Component {
  constructor(props) {
    super(props);

    this.canvas = null;

    // Game Properties
    this.compositor = null;
    this.timer = null;

    // Entities
    this.player = null;
    this.backgroundLayer = null;
    this.playerLayer = null;

    // Game Times
    this.step = 1 / 120;
    this.requestAnimationFrameId = null;
    this.toggle = false;

    this.bindEventListeners();
  }

  componentDidMount() {
    this.init();
    // loadImage(require('../../img/asteroids.png')) // eslint-disable-line
    //   .then((image) => {
    //     // this.ctx.drawImage(image, 0, 0);
    //     const sprites = new SpriteSheet(image, 126, 126);
    //     sprites.defineTile('rock', 0, 0);
    //     sprites.drawTile('rock', this.ctx, 0, 0);

    //     sprites.defineTile('asteroid-1', 5, 5);
    //     sprites.drawTile('asteroid-1', this.ctx, 1, 0);

    //     sprites.defineTile('asteroid-2', 2, 2);
    //     sprites.drawTile('asteroid-2', this.ctx, 1, 1);

    //     sprites.defineTile('asteroid-3', 7, 7);
    //     sprites.drawTile('asteroid-3', this.ctx, 0, 1);


    //     this.onStart();
    //   });
    Promise.all([
      createPlayer(),
    ])
      .then(([
        player,
      ]) => {
        this.compositor = new Compositor();

        this.backgroundLayer = createBackgroundLayer();

        this.player = player;

        this.playerLayer = createSpriteLayer(this.player);
        this.compositor.layers.push(
          this.backgroundLayer,
          this.playerLayer,
        );

        // this.timer = new Timer(1 / 60);
        // this.timer.update = function update(deltaTime) {
        //   const frameRate = deltaTime * (1000);

        //   this.player.update(frameRate);
        // }

        // playerSprite.draw('idle', this.ctx, 0, 0);
        this.onStart();
      });
    this.instantiateTimers();
    setTimeout(() => { this.toggle = false; }, 4000);
  }

  componentWillUnmount() {
    this.onEnd();
  }

  onStart() {
    this.addEventListeners();
    this.toggle = true;
    this.addRequestAnimationFrame();
  }

  onEnd() {
    this.toggle = false;
    this.terminate();
  }

  onManageTime(millis) {
    if (this._lastTime) {
      this.update((millis - this._lastTime) / 1000);
      this.draw();
      // console.log('RAF', this.requestAnimationFrameId, this.toggle);
    }

    this._lastTime = millis;

    // Control Call of next loop
    if (this.toggle) {
      this.addRequestAnimationFrame();
    }
  }

  addEventListeners() {
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keypress', this.handleKeyPress);
  }

  bindEventListeners() {
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  removeEventListeners() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('keypress', this.handleKeyPress);
  }

  addRequestAnimationFrame = () => {
    this.requestAnimationFrameId = requestAnimationFrame((deltaTime) => {
      this.onManageTime(deltaTime);
    });
  }

  instantiateTimers() {
    this._lastTime = 0;
    this._accumlator = 0;
  }

  resetTimers() {
    this.instantiateTimers();
    this.requestAnimationFrameId = null;
  }

  init() {
    this.ctx = this.canvas.getContext('2d');
    // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  draw() {
    this.compositor.draw(this.ctx);
  }

  simulate(deltaTime) {
    const frameRate = deltaTime * (1000);

    this.player.update(frameRate);
  }

  update(deltaTime) {
    // Manages the simulations
    this._accumlator += deltaTime;

    while (this._accumlator > this.step) {
      this.simulate(this.step);
      this._accumlator -= this.step;
    }
  }

  terminate() {
    this.resetTimers();
    this.removeEventListeners();
  }

  handleClick(e) {
    console.log('Click', e);
  }

  handleKeyDown(e) {
    console.log('Key Down', e);
  }

  handleKeyPress(e) {
    console.log('Key Press', e);
  }

  render() {
    return (
      <canvas
        ref={(node) => { this.canvas = node; }}
        width={500}
        height={500}
        onClick={e => this.handleClick(e)}
        onKeyDown={e => this.handleKeyDown(e)}
        onKeyPress={e => this.handleKeyPress(e)}
      />
    );
  }
}

export default ChasingAlpha;
