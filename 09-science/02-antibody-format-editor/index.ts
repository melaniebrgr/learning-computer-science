import { CanvasCtx2D } from "./src/canvas.js";
import { Fragment } from "./src/fragment.js"

const ctx = CanvasCtx2D.getInstance("canvas");

const vh = new Fragment(ctx, 50, 100, "blue")
const vl = new Fragment(ctx, 100, 100, "red")

vh.draw()
vl.draw()
