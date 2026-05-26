import { CanvasCtx2D } from "./src/canvas.js";
import { Fragment, FRAGMENT_TYPE } from "./src/fragment.js"

const ctx = CanvasCtx2D.getInstance("canvas");

const vh = new Fragment(ctx, 50, 100, "blue", FRAGMENT_TYPE.VH)
const vl = new Fragment(ctx, 100, 100, "red", FRAGMENT_TYPE.VL)

vh.draw()
vl.draw()
