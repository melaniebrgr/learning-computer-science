import { canvasCtx2D } from "./src/modules/canvas.js";
import { GraphicDomain } from "./src/modules/graphic-domain.js"
import { Entity } from "./src/modules/entity.js"
import { TYPE_ENTITY } from "./src/modules/entity.type.js";
import { GraphicLinker } from "./src/modules/graphic-linker.js";
import { Chain } from "./src/modules/chain.js";
import { Bonds } from "./src/modules/bonds.js";
import { TYPE_BOND } from "./src/modules/bonds.type.js";

const c = canvasCtx2D.getInstance("canvas");

const vh = new Entity(TYPE_ENTITY.VH, new GraphicDomain(c, {
  x: 50,
  y: 100,
  fillColour: "pink",
}))

const linker = new Entity(TYPE_ENTITY.LINKER, new GraphicLinker(c, {
  x: 75,
  y: 100,
  lineColour: "black",
}))

const vl = new Entity(TYPE_ENTITY.VL, new GraphicDomain(c, {
  x: 100,
  y: 100,
  fillColour: "red",
}))

const lightChain = new Chain()
lightChain.add(vh)
lightChain.add(linker)
lightChain.add(vl)
lightChain.draw()

const bonds = new Bonds();
console.log(bonds.toString())
bonds.add(vh, TYPE_BOND.SS, vl)
bonds.add(vh, TYPE_BOND.SS, vl)
console.log(bonds.toString())