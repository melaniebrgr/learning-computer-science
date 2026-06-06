import { canvasCtx2D } from "./src/canvas.js";
import { GraphicDomain } from "./src/graphic.js"
import { Entity } from "./src/entity.js"
import { ENTITY_TYPE } from "./src/entity.type.js";

const ctx = canvasCtx2D.getInstance("canvas")

const vh = new Entity(ENTITY_TYPE.VH, new GraphicDomain(ctx, 50, 100, "blue"))
const linker = new Entity(ENTITY_TYPE.LINKER, new GraphicDomain(ctx, 75, 100, "black"))
const vl = new Entity(ENTITY_TYPE.VL, new GraphicDomain(ctx, 100, 100, "red"))

vh.draw()
linker.draw()
vl.draw()

