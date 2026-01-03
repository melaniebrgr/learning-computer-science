function hashKey(queryKey: Array<any>) {
    return JSON.stringify(queryKey)
  }

type QueryValue = { error?: unknown, data?: any, status: string }

export default class Query {
    #cache: Map<string, QueryValue>;
    #listeners: Set<any>;
    
    constructor() {
        this.#cache = new Map();
        this.#listeners = new Set();
    }

    subscribe(listener: (queryKey: string) => void) {
        this.#listeners.add(listener);
        return () => this.#listeners.delete(listener);
     }

    get(queryKey: Array<any>): any {
        const hash = hashKey(queryKey);

        if (!this.#cache.has(hash)) {
            this.set(queryKey, { status: "pending" })
        }

        return this.#cache.get(hash);
    }

    set(queryKey: Array<any>, queryValue: QueryValue): void {
        const hash = hashKey(queryKey);
        this.#cache.set(hash, { ...this.#cache.get(hash), ...queryValue });
        this.#listeners.forEach((listener) => listener(queryKey))
    }

    async obtain({ queryKey, queryFn }: { queryKey: Array<any>, queryFn: () => Promise<any>}): Promise<void> {
        try {
            const data = await queryFn();
            this.set(queryKey, { data, status: "success" });
        } catch (error: unknown) {
            this.set(queryKey, { error, status: "error" });
        }
    }
}