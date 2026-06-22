const DOMAIN_TYPE = {
  VH: "vh",
  VL: "vl",
  CH1: "ch1",
  CH2: "ch2",
  CH3: "ch3",
  CH4: "ch4",
  CL: "cl",
} as const;

const PROTEIN_REGION_TYPE = {
  LINKER: "linker",
  HIS: "his-tag",
}

const CONJUGATE_TYPE = {
  DRUG: "drug",
  BIOTIN: "biotin",
  GLYCO: "glycan",
}

const ENTITY_TYPE = {
  ...DOMAIN_TYPE,
  ...PROTEIN_REGION_TYPE,
  ...CONJUGATE_TYPE,
}

type EntityType = typeof ENTITY_TYPE[keyof typeof ENTITY_TYPE];

export { ENTITY_TYPE, type EntityType }