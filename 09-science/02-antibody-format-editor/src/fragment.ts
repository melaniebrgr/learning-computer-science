import { Graphic } from "./graphic";

class Fragment extends Graphic {
  public draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.fillColour;
    this.ctx.ellipse(this.x, this.y, 20, 50, 0, 0, 2 * Math.PI);
    this.ctx.fill();
  }
}

export { Fragment }