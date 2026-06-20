import { Graphic } from "./graphic";

class GraphicDomain extends Graphic {
  public constructor(c, {
    x,
    y,
    fillColour,
  }) {
    super(c, {
      x,
      y,
      fillColour,
    })
  }

  protected templateDraw() {
    this.c.beginPath();
    this.c.ellipse(this.x, this.y, 20, 50, 0, 0, 2 * Math.PI);
    this.c.fillStyle = this.fillColour;
    this.c.fill();
  }
}

export { GraphicDomain }

