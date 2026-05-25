import { Singleton } from "./singleton";

class CanvasCtx2D implements Singleton {
  static #instance: CanvasRenderingContext2D | undefined;

  // TODO (multi-framework): generalise by passing in HTML node reference instead of element ID
  public static getInstance(canvasElementId) {
    if (!this.#instance) {
      const canvas = document.getElementById(canvasElementId) as HTMLCanvasElement;
      const ctx = canvas.getContext("2d");
      this.#instance = ctx
      return this.#instance;
    } else {
      return this.#instance;
    }
  }
}

export { CanvasCtx2D };