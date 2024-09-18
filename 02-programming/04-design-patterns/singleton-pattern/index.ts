class Singleton {
  static #instance: Singleton;

  private constructor() {}

  public static getInstance(): Singleton {
    if (!Singleton.#instance) {
      Singleton.#instance = new Singleton();
    }
    return Singleton.#instance;
  }
}

class GameLog implements Singleton {
  static #instance: GameLog;
  #score: number = 0;

  private constructor() {}

  public static getInstance(): GameLog {
    if (!GameLog.#instance) {
      GameLog.#instance = new GameLog();
    }
    return GameLog.#instance;
  }

  public updateScore(amount: number) {
    this.#score = this.#score + amount;
  }

  public get score() {
    return this.#score;
  }
}

const instance1 = GameLog.getInstance();

console.log(instance1.score);

GameLog.getInstance().updateScore(1);
GameLog.getInstance().updateScore(1);
GameLog.getInstance().updateScore(1);

console.log(instance1.score); // Expect 3