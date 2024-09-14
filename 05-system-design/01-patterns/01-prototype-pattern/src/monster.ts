export interface Clone {
  clone: () => Object;
}

export class Monster implements Clone {
  #health = 20;
  #weapon = 'claws';
  #damage = 4;

  constructor(health?) {
    if (health) this.#health = health;
  }

  fight(entity?) {
    if (entity) entity.sustainDamage(this.#damage);
    console.log(`Inflicted ${this.#damage} attack damage with ${this.#weapon}!`);
  }

  sustainDamage(damage: number) {
    this.#health = this.#health - damage;
    console.log(`Received ${damage} attack damage! Health is now ${this.#health}.`);
  }

  get health() {
    return this.#health;
  }

  clone() {
    return new Monster(this.#health);
  }
}

export const gremlin = new Monster();