import { describe, it, expect } from "vitest";
import { getAllParents } from "../methods/getAllParents";
import type { TreeItem } from "../types";

describe("getAllParents", () => {
  it("returns parent chain from leaf to root", () => {
    const map = new Map<number, TreeItem>([
      [1, { id: 1, parent: null, label: "Root" }],
      [2, { id: 2, parent: 1, label: "Child" }],
      [3, { id: 3, parent: 2, label: "Grandchild" }],
    ]);

    const result = getAllParents(map, 3);

    expect(result).toEqual([
      { id: 3, parent: 2, label: "Grandchild" },
      { id: 2, parent: 1, label: "Child" },
      { id: 1, parent: null, label: "Root" },
    ]);
  });

  it("returns only the root item when its parent is null", () => {
    const map = new Map<number, TreeItem>([
      [1, { id: 1, parent: null, label: "Root" }],
    ]);

    const result = getAllParents(map, 1);

    expect(result).toEqual([{ id: 1, parent: null, label: "Root" }]);
  });

  it("returns empty array when item id does not exist", () => {
    const map = new Map<number, TreeItem>([
      [1, { id: 1, parent: null, label: "Root" }],
    ]);

    const result = getAllParents(map, 999);

    expect(result).toEqual([]);
  });

  it("returns chain until a missing parent entry", () => {
    const map = new Map<number, TreeItem>([
      [1, { id: 1, parent: null, label: "Root" }],
      [2, { id: 2, parent: 1, label: "Child" }],
      [3, { id: 3, parent: 999, label: "Orphan" }],
    ]);

    const result = getAllParents(map, 3);

    expect(result).toEqual([{ id: 3, parent: 999, label: "Orphan" }]);
  });
});
