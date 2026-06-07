abstract class Singleton<TInstance, TArgs extends unknown[] = []> {
  protected instance: TInstance | null = null;

  protected constructor() { }

  public abstract getInstance(...args: TArgs): TInstance;
}

export { Singleton }