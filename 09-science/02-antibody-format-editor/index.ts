import { canvasCtx2D } from "./src/canvas.js";
import { GraphicDomain } from "./src/graphic-domain.js"
import { Entity } from "./src/entity.js"
import { ENTITY_TYPE } from "./src/entity.type.js";
import { GraphicLinker } from "./src/graphic-linker.js";

const ctx = canvasCtx2D.getInstance("canvas")

const vh = new Entity(ENTITY_TYPE.VH, new GraphicDomain(ctx, {
  x: 50,
  y: 100,
  fillColour: "blue",
}))
const linker = new Entity(ENTITY_TYPE.LINKER, new GraphicLinker(ctx, {
  x: 75,
  y: 100,
  lineColour: "black",
}))
const vl = new Entity(ENTITY_TYPE.VL, new GraphicDomain(ctx, {
  x: 100,
  y: 100,
  fillColour: "red",
}))

vh.draw()
linker.draw()
vl.draw()

