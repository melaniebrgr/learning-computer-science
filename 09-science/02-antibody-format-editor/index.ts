import { canvasCtx2D } from "./src/canvas.js";
import { Domain } from "./src/domain.js"
import { DOMAIN_TYPE } from "./src/domain.type.js";

const ctx = canvasCtx2D.getInstance("canvas")

const vh = new Domain(ctx, 50, 100, "blue", DOMAIN_TYPE.VH)
const vl = new Domain(ctx, 100, 100, "red", DOMAIN_TYPE.VL)

vh.draw()
vl.draw()
