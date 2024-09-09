const TERRAIN = {
  山: '山', // shān 🏔️ mountain
  草: '草', // cǎo 🌱 plain
  滨: '滨', // bīn 🏝️ beach
  水: '水', // shuǐ 🌊 water
} as const;

const WORLD_MAP = [
  ['水','水','水','水','水'],
  ['水','草','草','山','水'],
  ['水','滨','草','山','水'],
  ['水','滨','草','山','水'],
  ['水','水','水','水','水'],
];

class Terrain {
  name;
  #moveCost;
  #isWater;
  #texture;

  constructor(name: string, moveCost: number, isWater: boolean, texture: string) {
    this.name = name;
    this.#moveCost = moveCost;
    this.#isWater = isWater;
    this.#texture = texture;
  }

  get moveCost() {
    return this.#moveCost;
  }

  get isWater() {
    return this.#isWater;
  }

  get texture() {
    return this.#texture;
  }
}

class World {
  #worldTerrain;
  static #山Terrain = new Terrain(TERRAIN.山, 3, false, '🏔️');
  static #草Terrain = new Terrain(TERRAIN.草, 1, false, '🌱');
  static #滨Terrain = new Terrain(TERRAIN.滨, 2, false, '🏝️');
  static #水Terrain = new Terrain(TERRAIN.水, 3, true, '🌊');

  constructor(worldMap: string[][]) {
    this.#worldTerrain = World.#generateWorldTerrain(worldMap)
  }

  static #generateWorldTerrain(worldMap: string[][]) {
    return worldMap.map((row) => 
      row.map((cell) => {
        switch (cell) {
          case TERRAIN.山:
            return this.#山Terrain;
          case TERRAIN.草:
            return this.#草Terrain;
          case TERRAIN.滨:
            return this.#滨Terrain;
          case TERRAIN.水:
            return this.#水Terrain;
          default:
            return this.#水Terrain;
        }
      })
    );
  }

  get worldTerrain() {
    return this.#worldTerrain;
  }

  getTile(x: number, y: number) {
    return this.#worldTerrain[y][x];
  }
}

const world = new World(WORLD_MAP);

console.log(world.getTile(0,0).name);
console.log(world.getTile(1,1).name);