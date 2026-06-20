import { Graphic } from "./graphic";

class GraphicLinker extends Graphic {
  public constructor(c, {
    x,
    y,
    lineColour,
  }) {
    super(c, {
      x,
      y,
      lineColour,
    })
  }

  protected templateDraw() {
    this.c.strokeStyle = this.lineColour;
    this.c.beginPath();
    this.c.moveTo(30, 50);
    this.c.lineTo(150, 100);
    this.c.stroke();
  }
}

export { GraphicLinker }

