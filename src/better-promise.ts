type PrePromiseObject<R = unknown> = Record<string, R | PromiseLike<R>>;
type InPromiseObject<T extends PrePromiseObject<V>, V = unknown, R = V> = Record<keyof T, R>;
type InSettledPromiseObject<T extends PrePromiseObject<R>, R = unknown> = InPromiseObject<T, R, PromiseSettledResult<R>>;

export class BetterPromise<T> extends Promise<T> {
    private static async genericObjectAll<T extends PrePromiseObject<V>, V, R = V>(
        fn: (arr: (V | PromiseLike<V>)[]) => Promise<R[]>,
        obj: T,
    ): Promise<InPromiseObject<T, V, R>> {
        if (!obj) {
            return obj;
        }

        const values = Object.values(obj);
        const results = await fn.call(Promise, values);
        return Object.keys(obj).reduce((prev, key: keyof T, index) => {
            prev[key] = results[index];
            return prev;
        }, {} as InPromiseObject<T, V, R>);
    }

    static objectAll<T extends PrePromiseObject<R>, R>(obj: T): Promise<InPromiseObject<T, R>> {
        return BetterPromise.genericObjectAll<T, R>(Promise.all, obj);
    }

    static objectAllSettled<T extends PrePromiseObject<R>, R>(obj: T): Promise<InSettledPromiseObject<T, R>> {
        return BetterPromise.genericObjectAll<T, R, PromiseSettledResult<R>>(Promise.allSettled, obj);
    }
}