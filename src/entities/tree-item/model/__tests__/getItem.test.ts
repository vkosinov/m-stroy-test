import { describe, it, expect } from "vitest";
import { getItem } from "../methods/getItem";

describe("getItem", () => {
  it("returns item by id", () => {
    const map = new Map([
      [1, { id: 1, parent: null, label: "" }],
      [2, { id: 2, parent: 1, label: "" }],
    ]);

    const result = getItem(map, 2);

    expect(result).toEqual({ id: 2, parent: 1, label: "" });
  });

  it("returns undefined if not found", () => {
    const map = new Map();

    const result = getItem(map, 999);

    expect(result).toBeUndefined();
  });
});
