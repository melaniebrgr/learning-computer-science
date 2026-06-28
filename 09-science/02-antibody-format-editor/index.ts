import { canvasCtx2D } from "./src/modules/canvas.js";
import { GraphicDomain } from "./src/modules/graphic-domain.js"
import { Entity } from "./src/modules/entity.js"
import { TYPE } from "./src/modules/entity.type.js";
import { GraphicLinker } from "./src/modules/graphic-linker.js";
import { Chain } from "./src/modules/chain.js";

const c = canvasCtx2D.getInstance("canvas");

const lightChain = new Chain()
lightChain.add(new Entity(TYPE.VH, new GraphicDomain(c, {
  x: 50,
  y: 100,
  fillColour: "pink",
})))
lightChain.add(new Entity(TYPE.LINKER, new GraphicLinker(c, {
  x: 75,
  y: 100,
  lineColour: "black",
})))
lightChain.add(new Entity(TYPE.VL, new GraphicDomain(c, {
  x: 100,
  y: 100,
  fillColour: "red",
})))
lightChain.draw()
