import { describe, it, expect } from "vitest";
import { getAll } from "../methods";

describe("getAll", () => {
  it("returns all items", () => {
    const items = [
      { id: 1, parent: null, label: "" },
      { id: 2, parent: 1, label: "" },
    ];

    const result = getAll(items);

    expect(result).toEqual(items);
  });

  it("returns empty array", () => {
    const result = getAll([]);

    expect(result).toEqual([]);
  });
});
