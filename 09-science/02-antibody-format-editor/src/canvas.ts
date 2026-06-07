import { Singleton } from "./lib/singleton";

class CanvasCtx2D extends Singleton<CanvasRenderingContext2D, [canvasElementId: string]> {
  #instance: CanvasRenderingContext2D | null = null;

  public constructor() {
    super();
  }

  // TODO (multi-framework): generalise by passing in HTML node reference instead of element ID
  public override getInstance(canvasElementId: string): CanvasRenderingContext2D {
    if (!canvasElementId) throw new Error("Canvas element id is required")

    if (!this.#instance) {
      const canvas = document.getElementById(canvasElementId) as HTMLCanvasElement | null;
      if (!canvas) throw new Error(`Canvas element not found: ${canvasElementId}`);
      const ctx = canvas.getContext("2d");
      this.#instance = ctx;
    }

    return this.#instance;
  }
}

const canvasCtx2D = new CanvasCtx2D()

export { canvasCtx2D };