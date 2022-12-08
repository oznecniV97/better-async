import { BetterPromise } from "./better-promise";

describe("BetterPromise", () => {
  test("objectAll", async () => {
    const test = {
      "ciao": Promise.resolve(2),
      "mondo": Promise.resolve(15),
    };
    const expected = {
      "ciao": 2,
      "mondo": 15,
    };

    const res = await BetterPromise.objectAll(test);

    expect(res).toStrictEqual(expected);
  });
});