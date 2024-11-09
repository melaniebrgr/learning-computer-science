// range from 0 - 7
const trait = {
  DOC_HOS: 'docile-hostile',
  BRA_TIM: 'brave-timid',
  ENE_CAL: 'energetic-calm',
};

const spiritData = {
  Yichi: {
    name: 'Yichi',
    description: "There is a beast like a sheep with nine tails, four ears and eyes on its back. When you wear its name you won't be afraid",
    location: 'Mountains',
    page: 10,
    traits: {
      [trait.DOC_HOS]: [0, 1],
      [trait.BRA_TIM]: [0, 1],
      [trait.ENE_CAL]: [4],
    },
  },
  Cukoo: {
    name: 'Cukoo',
    description: "A bird with three heads, three wings, and six legs. If you eat it you won't be able to rest",
    location: 'Mountains',
    page: 12,
    traits: {
      [trait.DOC_HOS]: [3, 4],
      [trait.BRA_TIM]: [4, 5],
      [trait.ENE_CAL]: [0],
    },
  },
  NineTailedFox: {
    name: 'Nine Tailed Fox',
    description: "A fox with nine-tails that cries like a baby. It eats people but if you see it you can become a ruler of men.",
    location: 'Mountains',
    page: 14,
    traits: {
      [trait.DOC_HOS]: [0, 7],
      [trait.BRA_TIM]: [0],
      [trait.ENE_CAL]: [4],
    },
  },
  Chifin: {
    name: 'Chifin',
    description: "A worm with a human face and shape of a fish that quacks like a duck.",
    location: 'Mountain rivers',
    page: 16,
    traits: {
      [trait.DOC_HOS]: [1, 2, 3, 4, 5, 6, 7],
      [trait.BRA_TIM]: [7],
      [trait.ENE_CAL]: [5],
    },
  }
} as const;

type SpiritData = typeof spiritData[keyof typeof spiritData];

class SpiritType {
  #doc_hos: readonly number[];
  #bra_tim: readonly number[];
  #ene_calm: readonly number[];

  constructor({ traits }: SpiritData) {
    this.#doc_hos = traits[trait.DOC_HOS];
    this.#bra_tim = traits[trait.BRA_TIM];
    this.#ene_calm = traits[trait.ENE_CAL];
  }

  get dh() {
    return this.#doc_hos;
  }

  get bt() {
    return this.#bra_tim;
  }

  get ec() {
    return this.#ene_calm;
  }
}

const getRandomElement = <T>(array: T[]): T => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

class Spirit {
  #doc_hos: number;
  #bra_tim: number;
  #ene_calm: number;

  constructor(spiritType: SpiritType) {
    this.#doc_hos = getRandomElement(spiritType.dh as number[]);
    this.#bra_tim = getRandomElement(spiritType.bt as number[]);
    this.#ene_calm = getRandomElement(spiritType.ec as number[])
  }

  get dh() {
    return this.#doc_hos;
  }

  get bt() {
    return this.#bra_tim;
  }

  get ec() {
    return this.#ene_calm;
  }
}

const yichi1 = new Spirit(new SpiritType(spiritData.Yichi));
const yichi2 = new Spirit(new SpiritType(spiritData.Yichi));
const yichi3 = new Spirit(new SpiritType(spiritData.Yichi));

const nineTails1 = new Spirit(new SpiritType(spiritData.NineTailedFox));

console.log(`This spirit has ${yichi1.dh} hostility, ${yichi1.bt} bravery, and ${yichi1.ec} energy`);
console.log(`This spirit has ${yichi2.dh} hostility, ${yichi2.bt} bravery, and ${yichi2.ec} energy`);
console.log(`This spirit has ${yichi3.dh} hostility, ${yichi3.bt} bravery, and ${yichi3.ec} energy`);
console.log(`This spirit has ${nineTails1.dh} hostility, ${nineTails1.bt} bravery, and ${nineTails1.ec} energy`);
