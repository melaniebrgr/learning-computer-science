import type { GraphicOptions } from "./graphic.type";

class Graphic {
  protected c: CanvasRenderingContext2D;
  protected x: number;
  protected y: number;
  protected fillColour: string;
  protected lineColour: string;

  public constructor(c, {
    x,
    y,
    fillColour,
    lineColour,
  }: GraphicOptions) {
    this.c = c
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
    this.c.save();
  }

  protected templateDraw() {
    throw new Error("Graphic: entityDraw method not implemented")
  }

  #postDraw() {
    this.c.restore();
  }

  public draw() {
    this.#preDraw();
    this.templateDraw();
    this.#postDraw();
  }
}

export { Graphic }

