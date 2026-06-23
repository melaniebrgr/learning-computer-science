const DOMAIN_TYPE = {
  VH: "vh",
  VL: "vl",
  CH1: "ch1",
  CH2: "ch2",
  CH3: "ch3",
  CH4: "ch4",
  CL: "cl",
} as const;

const REGION_TYPE = {
  LINKER: "linker",
  HIS: "his-tag",
  BIOTIN: "biotin",
}

const TYPE = {
  ...DOMAIN_TYPE,
  ...REGION_TYPE,
}

type Type = typeof TYPE[keyof typeof TYPE];

export { TYPE, type Type }