# Design

## Options

Idea 1
```
const ab = new AntibodyBuilder()
const chain1 = ab.register(new Entity(...))
// register all the things

ab
  .addChain(chain1)
  .addChain(chain2)
  .chainAppend(chain1, vh1)
  .chainSplice(chain1, vh1, ch1, linker)
  .chainPrepend(chain1, ch1)
  .chainPrepend(chain2, ch2)
  .decorate(vh2, sugar)
  .decorate(chain1, drug)
  .bondMake(vh1, vl2, bond1)
  .bondBreak(vh1, vl2, bond1)
*/
```

Idea 2
```
ab
  .growFromC(domain1, domain2) // d1-d2
  .growFromN(domain1, domain3) // d3-d1-d2
```

Idea 3
```
const chain1 = ab.createChain()
  .bond('peptide', )
```

Idea 4
```
interface AntibodyBuilder {
  // Antibody chain methods, e.g VH-CH1-CH2
  chainAdd<TMeta>(meta?: TMeta): Chain;
  chainAppend(c: Chain, f: Fragment): Chain;
  chainPrepend(c: Chain, f: Fragment): Chain;
  chainRemove(c: Chain): void;
  
  // Decorator methods e.g VH-CH1-CH2-ADC
  decoratorAdd<TMeta>(d: Decorator, meta: TMeta): Fragment;
  decoratorRemove(d: Decorator): void;
  decoratorBondCreate<TMeta>(f: Fragment, d: Decorator, t: BondType, meta?: TMeta)
  decoratorBondBreak(f: Fragment, d: Decorator, b: Bond)

  // Bonding methods e.g. VH-CH1-CH2-SS-VL-CL
  bondCreate<TMeta>(f1: Fragment, f2: Fragment, t: BondType, meta?: TMeta): Bond;
  bondBreak(f1: Fragment, f2: Fragment, b: Bond): void;
}

interface AntibodyDirector {
  buildFc()
  buildFab()
  buildScFv()
  buildIgG()
}

abDirector = new AntibodyDirector()
abBuilder = new AntibodyBuilder()
abDirector.makeFab(abBuilder)
```
