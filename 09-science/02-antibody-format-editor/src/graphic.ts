import type { GraphicOptions } from "./graphic.type";

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

  protected tDraw() {
    throw new Error("Graphic: entityDraw method not implemented")
  }

  #postDraw() {
    this.ctx.restore();
  }

  public draw() {
    this.#preDraw();
    this.tDraw();
    this.#postDraw();
  }
}

export { Graphic }

