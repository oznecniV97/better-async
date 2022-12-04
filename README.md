# better-async

Useful package to work with promises

## TODO

- mappa promise parallele
- easy promise con gestione try catch e return invece che callback TODO: CAPIRE SE SERVE O IN AUTOMATICO JS LO GESTISCE GIà
- modifica costruzone pacchetto: [info costruzione pacchetto](https://itnext.io/step-by-step-building-and-publishing-an-npm-typescript-package-44fe7164964c)

```typescript
//versione standard
new Promise((resolve, reject) => {
    try {
        const valore = metodoPericolosoChePuoInvocareEccezione();
        resolve(valore);
    } catch(err) {
        reject(err);
    }
});

//EasyPromise, la gestione del catch è automatica
new EasyPromise(async () => {
    const valore = metodoPericolosoChePuoInvocareEccezione();
    return valore;
});
```
