import { Graphic } from "./graphic";
import type { DomainType } from "./domain.type";

class Domain extends Graphic {
  #type: DomainType;

  public constructor(ctx, x, y, fillColour, type) {
    super(ctx, x, y, fillColour);
    this.#type = type;
  }

  public draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.fillColour;
    this.ctx.ellipse(this.x, this.y, 20, 50, 0, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  public get type() {
    return this.#type;
  }
}

export { Domain }