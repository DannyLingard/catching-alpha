export default class Timer {
  constructor(deltaTime = 1 / 120) {
    let accumulatedTime = 0;
    let lastTime = 0;
    this.requestAnimationFrameId = null;
    this.toggle = false;

    this.updateProxy = (time) => {
      accumulatedTime = (time - lastTime) / 1000;

      while (accumulatedTime > deltaTime) {
        this.update(deltaTime);
        accumulatedTime -= deltaTime;
      }

      lastTime = time;

      // Control Call of next loop
      if (this.toggle) {
        this.addRequestAnimationFrame();
      }
    };
  }

  start() {
    this.toggle = true;
    this.addRequestAnimationFrame();
  }

  instantiateTimers() {
    this._lastTime = 0;
    this._accumlator = 0;
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

  addRequestAnimationFrame = () => {
    this.requestAnimationFrameId = requestAnimationFrame(this.updateProxy);
  };

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
}
