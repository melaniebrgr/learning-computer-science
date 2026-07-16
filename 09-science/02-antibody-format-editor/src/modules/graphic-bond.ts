import { Graphic } from "./graphic";
import type { GraphicOptions } from "./graphic.type";

class GraphicBond extends Graphic {
  public constructor(c: CanvasRenderingContext2D, {
    x,
    y,
    lineColour,
  }: GraphicOptions) {
    super(c, {
      x,
      y,
      lineColour,
    })
  }

  protected templateDraw() {
    this.c.beginPath();
    this.c.moveTo(10, 10);
    this.c.lineTo(20, 10);
    this.c.strokeStyle = this.lineColour;
    this.c.stroke();
  }
}

export { GraphicBond }

