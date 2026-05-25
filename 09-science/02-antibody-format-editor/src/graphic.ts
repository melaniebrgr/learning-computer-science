class Graphic {
  protected ctx: CanvasRenderingContext2D;
  protected x: number;
  protected y: number;
  protected fillColour: string;

  public constructor(ctx, x, y, fillColour) {
    this.ctx = ctx, this.x = x, this.y = y, this.fillColour = fillColour
  }

  public move(x, y) {
    this.x + x, this.y + y;
  }

  public draw() {
    throw new Error("Graphic: draw method not implemented")
  }
}

class Fragment extends Graphic {
  public draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.fillColour;
    this.ctx.ellipse(this.x, this.y, 20, 50, 0, 0, 2 * Math.PI);
    this.ctx.fill();
  }
}

export { Fragment }