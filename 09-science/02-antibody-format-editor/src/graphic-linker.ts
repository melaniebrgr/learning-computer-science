import { Graphic } from "./graphic";

class GraphicLinker extends Graphic {
  public constructor(ctx, {
    x,
    y,
    lineColour,
  }) {
    super(ctx, {
      x,
      y,
      lineColour,
    })
  }

  protected tDraw() {
    this.ctx.strokeStyle = this.lineColour;
    this.ctx.beginPath();
    this.ctx.moveTo(30, 50);
    this.ctx.lineTo(150, 100);
    this.ctx.stroke();
  }
}

export { GraphicLinker }

