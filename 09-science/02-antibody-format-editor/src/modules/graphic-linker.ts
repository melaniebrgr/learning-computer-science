import { Graphic } from "./graphic";
import type { GraphicOptions } from "./graphic.type";
class GraphicLinker extends Graphic {
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
    this.c.moveTo(30, 50);
    this.c.lineTo(150, 100);
    this.c.strokeStyle = this.lineColour;
    this.c.stroke();
  }
}

export { GraphicLinker }

