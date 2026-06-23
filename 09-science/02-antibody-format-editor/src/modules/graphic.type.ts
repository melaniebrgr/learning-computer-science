interface Drawable {
  draw(): void
}

interface GraphicOptions {
  x: number;
  y: number;
  fillColour?: string;
  lineColour?: string;
}

export type { Drawable, GraphicOptions }