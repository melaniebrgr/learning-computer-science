import { Singleton } from "@core/singleton";

class CanvasCtx2D extends Singleton<CanvasRenderingContext2D, [canvasElementId: string]> {
  #instance: CanvasRenderingContext2D;

  public constructor() {
    super();
  }

  // TODO (multi-framework): generalise by passing in HTML node reference instead of element ID
  public override getInstance(canvasElementId: string): CanvasRenderingContext2D {
    if (!canvasElementId) throw new Error("Canvas element id is required")

    if (!this.#instance) {
      const canvas = document.getElementById(canvasElementId) as HTMLCanvasElement | null;
      if (!canvas) throw new Error(`Canvas element not found: ${canvasElementId}`);
      const c = canvas.getContext("2d") as CanvasRenderingContext2D;
      this.#instance = c;
    }

    return this.#instance;
  }
}

const canvasCtx2D = new CanvasCtx2D()

export { canvasCtx2D };