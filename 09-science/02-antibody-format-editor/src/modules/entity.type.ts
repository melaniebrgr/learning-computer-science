const TYPE_DOMAIN = {
  VH: "vh",
  VL: "vl",
  CH1: "ch1",
  CH2: "ch2",
  CH3: "ch3",
  CH4: "ch4",
  CL: "cl",
} as const;

const TYPE_REGION = {
  HINGE: "hinge",
  LINKER: "linker",
  HIS: "his-tag",
  AVI: "avi-tag"
}

const TYPE_DECORATOR = {
  DRUG: "drug",
  GLYCO: "glycan",
  BIOTIN: "biotin",
}

const TYPE_ENTITY = {
  ...TYPE_DOMAIN,
  ...TYPE_REGION,
  ...TYPE_DECORATOR,
}

type TypeEntity = typeof TYPE_ENTITY[keyof typeof TYPE_ENTITY];

export { TYPE_ENTITY, type TypeEntity }