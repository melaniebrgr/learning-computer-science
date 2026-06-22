import { canvasCtx2D } from "./src/modules/canvas.js";
import { GraphicDomain } from "./src/modules/graphic-domain.js"
import { Entity } from "./src/modules/entity.js"
import { ENTITY_TYPE } from "./src/modules/entity.type.js";
import { GraphicLinker } from "./src/modules/graphic-linker.js";
import { Chain } from "./src/modules/chain.js";

const c = canvasCtx2D.getInstance("canvas");

const vh = new Entity(ENTITY_TYPE.VH, new GraphicDomain(c, {
  x: 50,
  y: 100,
  fillColour: "pink",
}));

const linker = new Entity(ENTITY_TYPE.LINKER, new GraphicLinker(c, {
  x: 75,
  y: 100,
  lineColour: "black",
}));

const vl = new Entity(ENTITY_TYPE.VL, new GraphicDomain(c, {
  x: 100,
  y: 100,
  fillColour: "red",
}));

const lightChain = new Chain<Entity>();
lightChain.add(vh)
lightChain.add(linker)
lightChain.add(vl)
// lightChain.draw()

const iterator = lightChain.values()
for (const data of iterator) {
  data.draw()
}



