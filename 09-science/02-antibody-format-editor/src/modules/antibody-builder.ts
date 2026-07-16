import { Chain } from "./chain"
import { Entity, EntityDomain, EntityBond, EntityDecorator } from "./entity"
import { type TypeBond } from "./bonds.type"

interface AntibodyBuilder {
  // Antibody chain methods, e.g VH-CH1-CH2
  chainAdd<TMeta>(meta?: TMeta): Chain;
  chainAppend(c: Chain, f: EntityDomain): Chain;
  chainPrepend(c: Chain, f: EntityDomain): Chain;
  chainRemove(c: Chain): void;

  // Decorator methods e.g VH-CH1-CH2-ADC
  decoratorAdd<TMeta>(d: EntityDecorator, meta: TMeta): EntityDecorator;
  decoratorRemove(d: EntityDecorator): void;
  decoratorBondCreate<TMeta>(f: EntityDomain, d: EntityDecorator, t: TypeBond, meta?: TMeta): EntityBond;
  decoratorBondBreak(f: EntityDomain, d: EntityDecorator, b: EntityBond): void;

  // Bonding methods e.g. VH-CH1-CH2-SS-VL-CL
  bondCreate<TMeta>(f1: Entity, f2: Entity, t: TypeBond, meta?: TMeta): EntityBond;
  bondBreak(f1: Entity, f2: Entity, b: EntityBond): void;
}