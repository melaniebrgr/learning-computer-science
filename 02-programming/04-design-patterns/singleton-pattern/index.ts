// Game Programming Patterns example
class Singleton {
  static #instance: Singleton;

  public static get instance(): Singleton {
    if (!Singleton.#instance) {
      Singleton.#instance = new Singleton();
    }
    return Singleton.#instance;
  }
}

class GameLog implements Singleton {
  static #instance: GameLog;
  #score: number = 0;

  public static get instance(): GameLog {
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

// Youtube example
class SingletonWithData {
  static #instance: SingletonWithData;
  static #data: any;

  private constructor(data: any) {
    SingletonWithData.#data = data
  }

  public static getInstance(data?: any) {
    if (SingletonWithData.#instance === undefined) {
      SingletonWithData.#instance = new SingletonWithData(data)
    }
    return SingletonWithData.#instance
  }
}

class GameLogWithData implements SingletonWithData {
  static #instance: SingletonWithData;
  static #score: number;

  private constructor(amount: number) {
    GameLogWithData.#score = amount
  }

  public static getInstance(data?: any) {
    if (GameLogWithData.#instance === undefined) {
      GameLogWithData.#instance = new GameLogWithData(data)
    }
    return GameLogWithData.#instance
  }

  public updateScore(amount: number) {
    GameLogWithData.#score = GameLogWithData.#score + amount;
  }

  public get score() {
    return this.#score;
  }
}

console.log(GameLogWithData.getInstance())