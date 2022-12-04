type PrePromiseObject = Record<string, PromiseLike<unknown>>;
type InPromiseObject<T extends PrePromiseObject> = Record<keyof T, unknown>;
type PostPromiseObject<T extends PrePromiseObject> = PromiseLike<InPromiseObject<T>>;

export class BetterPromise<T> extends Promise<T> {
    //TODO: creare stesso metodo anche per allSettled
    //TODO: capire se fattibile modificare l'output per far sì che non sia unknown ma il tipo contenuto nella promise passata
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