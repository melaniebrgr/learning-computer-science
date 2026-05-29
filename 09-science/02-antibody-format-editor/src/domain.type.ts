const DOMAIN_TYPE = {
  VH: "vh",
  VL: "vl",
  CH1: "ch1",
  CH2: "ch2",
  CH3: "ch3",
  CH4: "ch4",
  CL: "cl",
} as const;

type DomainType = typeof DOMAIN_TYPE[keyof typeof DOMAIN_TYPE];

export { type DomainType, DOMAIN_TYPE };