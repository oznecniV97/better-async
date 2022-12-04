import test from "ava";

import { BetterPromise } from "./better-promise";

test("getABC", async (t) => {
  const test = {
    "ciao": Promise.resolve(2),
    "mondo": Promise.resolve(15),
  };
  const expected = {
    "ciao": 2,
    "mondo": 15,
  };

  t.deepEqual(await BetterPromise.objectAll(test), expected);
});
