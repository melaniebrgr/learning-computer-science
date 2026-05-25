import { CanvasCtx2D } from "./src/canvas.js";

const ctx = CanvasCtx2D.getInstance("canvas");

// VH
ctx.beginPath();
ctx.fillStyle = "blue";
ctx.ellipse(50, 100, 20, 50, 0, 0, 2 * Math.PI);
ctx.fill();

// VL
ctx.beginPath();
ctx.fillStyle = "red";
ctx.ellipse(100, 100, 20, 50, 0, 0, 2 * Math.PI);
ctx.fill();
