type PrePromiseObject = Record<string, PromiseLike<unknown>>;
type InPromiseObject<T extends PrePromiseObject> = Record<keyof T, unknown>;
type PostPromiseObject<T extends PrePromiseObject> = PromiseLike<InPromiseObject<T>>;

export class BetterPromise<T> extends Promise<T> {
    //TODO: build similar method for Promise.allSettled
    //TODO: check if unknown types can be changed to dynamic ones (Promise<number> -> number)
    static async objectAll<T extends PrePromiseObject>(obj: T): Promise<PostPromiseObject<T>> {
        if (!obj) {
            return obj;
        }

        const values = Object.values(obj);
        const results = await BetterPromise.all(values);
        return Object.keys(obj).reduce((prev, key: keyof T, index) => {
            prev[key] = results[index];
            return prev;
        }, {} as InPromiseObject<T>);
    }
}