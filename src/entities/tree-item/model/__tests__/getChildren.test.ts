import { describe, it, expect } from "vitest";
import { getChildren } from "../methods/getChildren";
import type { TreeItem } from "../types";

describe("getChildren", () => {
  it("returns children for existing parent", () => {
    const childrenMap = new Map<number | null, TreeItem[]>([
      [
        1,
        [
          { id: 2, parent: 1, label: "Child 1" },
          { id: 3, parent: 1, label: "Child 2" },
        ],
      ],
    ]);

    const result = getChildren(childrenMap, 1);

    expect(result).toEqual([
      { id: 2, parent: 1, label: "Child 1" },
      { id: 3, parent: 1, label: "Child 2" },
    ]);
  });

  it("returns empty array for parent with no children", () => {
    const childrenMap = new Map<number | null, TreeItem[]>([[1, []]]);

    const result = getChildren(childrenMap, 1);

    expect(result).toEqual([]);
  });

  it("returns empty array for non-existent parent", () => {
    const childrenMap = new Map<number | null, TreeItem[]>([
      [1, [{ id: 2, parent: 1, label: "Child 1" }]],
    ]);

    const result = getChildren(childrenMap, 999);

    expect(result).toEqual([]);
  });

  it("returns root children", () => {
    const childrenMap = new Map<number | null, TreeItem[]>([
      [
        null,
        [
          { id: 1, parent: null, label: "Root 1" },
          { id: 2, parent: null, label: "Root 2" },
        ],
      ],
    ]);

    const result = getChildren(childrenMap, 0);

    expect(result).toEqual([]);
  });

  it("returns empty array for empty map", () => {
    const childrenMap = new Map<number | null, TreeItem[]>();

    const result = getChildren(childrenMap, 1);

    expect(result).toEqual([]);
  });

  it("handles single child", () => {
    const childrenMap = new Map<number | null, TreeItem[]>([
      [1, [{ id: 2, parent: 1, label: "Only Child" }]],
    ]);

    const result = getChildren(childrenMap, 1);

    expect(result).toEqual([{ id: 2, parent: 1, label: "Only Child" }]);
  });
});
