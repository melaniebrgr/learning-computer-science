import { Graphic } from "./graphic";

class GraphicDomain extends Graphic {
  public constructor(ctx, {
    x,
    y,
    fillColour,
  }) {
    super(ctx, {
      x,
      y,
      fillColour,
    })
  }

  protected entityDraw() {
    this.ctx.fillStyle = this.fillColour;
    this.ctx.beginPath();
    this.ctx.ellipse(this.x, this.y, 20, 50, 0, 0, 2 * Math.PI);
    this.ctx.fill();
  }
}

export { GraphicDomain }

