interface GraphicOptions {
  x: number;
  y: number;
  fillColour?: string;
  lineColour?: string;
}

class Graphic {
  protected ctx: CanvasRenderingContext2D;
  protected x: number;
  protected y: number;
  protected fillColour: string;
  protected lineColour: string;

  public constructor(ctx, {
    x,
    y,
    fillColour,
    lineColour,
  }: GraphicOptions) {
    this.ctx = ctx
    this.x = x
    this.y = y
    this.fillColour = fillColour
    this.lineColour = lineColour
  }

  public move(x, y) {
    this.x += x
    this.y += y
  }

  #preDraw() {
    this.ctx.save();
  }

  protected entityDraw() {
    throw new Error("Graphic: entityDraw method not implemented")
  }

  #postDraw() {
    this.ctx.restore();
  }

  public draw() {
    this.#preDraw();
    this.entityDraw();
    this.#postDraw();
  }
}

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

export { GraphicDomain, Graphic }

