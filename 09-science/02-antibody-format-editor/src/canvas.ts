class Singleton {
  static #instance;

  constructor() { }

  static getInstance() {
    if (!Singleton.#instance) {
      Singleton.#instance = new Singleton();
    }
    return Singleton.#instance;
  }
}

class CanvasCtx2D extends Singleton {
  static #instance;

  static getInstance(canvasElementId) {
    if (!this.#instance) {
      // TODO (multi-framework): generalise by passing in Node ref
      const canvas = document.getElementById(canvasElementId);
      const ctx = canvas.getContext("2d");
      this.#instance = ctx
      return this.#instance;
    } else {
      return this.#instance;
    }
  }
}

export { CanvasCtx2D };