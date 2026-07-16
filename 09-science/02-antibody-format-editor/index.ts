import { canvasCtx2D } from "./src/modules/canvas.js";
import { GraphicDomain } from "./src/modules/graphic-domain.js"
import { EntityDomain, EntityRegion } from "./src/modules/entity.js"
import { TYPE_ENTITY } from "./src/modules/entity.type.js";
import { GraphicLinker } from "./src/modules/graphic-linker.js";
import { Chain } from "./src/modules/chain.js";
import { Bonds } from "./src/modules/bonds.js";

const c = canvasCtx2D.getInstance("canvas");

const vh = new EntityDomain(TYPE_ENTITY.VH, new GraphicDomain(c, {
  x: 50,
  y: 100,
  fillColour: "pink",
}))

const linker = new EntityRegion(TYPE_ENTITY.LINKER, new GraphicLinker(c, {
  x: 75,
  y: 100,
  lineColour: "black",
}))

const vl = new EntityDomain(TYPE_ENTITY.VL, new GraphicDomain(c, {
  x: 100,
  y: 100,
  fillColour: "red",
}))

const lightChain = new Chain()
lightChain.add(vh)
lightChain.add(linker)
lightChain.add(vl)
lightChain.draw()
console.log(lightChain.toString())

const bonds = new Bonds();
bonds.add(vh, TYPE_ENTITY.SS, vl)
bonds.add(vh, TYPE_ENTITY.SS, vl)
console.log(bonds.toString())


