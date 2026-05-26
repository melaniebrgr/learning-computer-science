import { Graphic } from "./graphic";

const FRAGMENT_TYPE = {
  VH: "vh",
  VL: "vl",
  CH1: "ch1",
  CH2: "ch2",
  CH3: "ch3",
  CH4: "ch4",
  CL: "cl",
} as const;

type FragmentType = typeof FRAGMENT_TYPE[keyof typeof FRAGMENT_TYPE];

class Fragment extends Graphic {
  #type: FragmentType;

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

export { Fragment, type FragmentType, FRAGMENT_TYPE }