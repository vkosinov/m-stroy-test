import { describe, it, expect } from "vitest";
import { getAllChildren } from "../methods/getAllChildren";
import type { TreeItem } from "../types";

describe("getAllChildren", () => {
  it("returns an empty array when the parent has no descendants", () => {
    const childrenMap = new Map<number | null, TreeItem[]>([[1, []]]);

    const result = getAllChildren(childrenMap, 1);

    expect(result).toEqual([]);
  });

  it("returns all nested descendants in depth-first order", () => {
    const childrenMap = new Map<number | null, TreeItem[]>([
      [1, [{ id: 2, parent: 1, label: "Child A" }, { id: 3, parent: 1, label: "Child B" }]],
      [2, [{ id: 4, parent: 2, label: "Grandchild A1" }]],
      [3, [{ id: 5, parent: 3, label: "Grandchild B1" }, { id: 6, parent: 3, label: "Grandchild B2" }]],
    ]);

    const result = getAllChildren(childrenMap, 1);

    expect(result).toEqual([
      { id: 3, parent: 1, label: "Child B" },
      { id: 6, parent: 3, label: "Grandchild B2" },
      { id: 5, parent: 3, label: "Grandchild B1" },
      { id: 2, parent: 1, label: "Child A" },
      { id: 4, parent: 2, label: "Grandchild A1" },
    ]);
  });

  it("returns the full descendant chain for a single linear branch", () => {
    const childrenMap = new Map<number | null, TreeItem[]>([
      [1, [{ id: 2, parent: 1, label: "Child" }]],
      [2, [{ id: 3, parent: 2, label: "Grandchild" }]],
      [3, [{ id: 4, parent: 3, label: "Great Grandchild" }]],
    ]);

    const result = getAllChildren(childrenMap, 1);

    expect(result).toEqual([
      { id: 2, parent: 1, label: "Child" },
      { id: 3, parent: 2, label: "Grandchild" },
      { id: 4, parent: 3, label: "Great Grandchild" },
    ]);
  });

  it("returns an empty array for a non-existent parent id", () => {
    const childrenMap = new Map<number | null, TreeItem[]>([
      [1, [{ id: 2, parent: 1, label: "Child" }]],
    ]);

    const result = getAllChildren(childrenMap, 99);

    expect(result).toEqual([]);
  });
});
