const TYPE_DOMAIN = {
  VH: "vh",
  VL: "vl",
  CH1: "ch1",
  CH2: "ch2",
  CH3: "ch3",
  CH4: "ch4",
  CL: "cl",
} as const;

type TypeDomain = typeof TYPE_DOMAIN[keyof typeof TYPE_DOMAIN];

const TYPE_REGION = {
  HINGE: "hinge",
  LINKER: "linker",
  HIS: "his-tag",
  AVI: "avi-tag"
}

type TypeRegion = typeof TYPE_REGION[keyof typeof TYPE_REGION];

const TYPE_DECORATOR = {
  DRUG: "drug",
  GLYCO: "glycan",
  BIOTIN: "biotin",
}

type TypeDecorator = typeof TYPE_DECORATOR[keyof typeof TYPE_DECORATOR];

const TYPE_BOND = {
  SS: 'disufide',
  C: 'generic-covalent'
} as const;

type TypeBond = (typeof TYPE_BOND)[keyof typeof TYPE_BOND];

const TYPE_ENTITY = {
  ...TYPE_DOMAIN,
  ...TYPE_REGION,
  ...TYPE_DECORATOR,
  ...TYPE_BOND,
}

type TypeEntity = typeof TYPE_ENTITY[keyof typeof TYPE_ENTITY];

export { TYPE_ENTITY, type TypeEntity, type TypeDomain, type TypeRegion, type TypeDecorator, type TypeBond }