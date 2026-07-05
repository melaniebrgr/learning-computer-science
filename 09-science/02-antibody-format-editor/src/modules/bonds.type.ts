const TYPE_BOND = {
  SS: 'disufide',
  C: 'generic-covalent'
} as const;

type TypeBond = (typeof TYPE_BOND)[keyof typeof TYPE_BOND];

export { type TypeBond, TYPE_BOND }