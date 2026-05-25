class Singleton {
  static #instance;

  private constructor() { }

  public static getInstance() {
    if (!Singleton.#instance) {
      Singleton.#instance = new Singleton();
    }
    return Singleton.#instance;
  }
}

export { Singleton }