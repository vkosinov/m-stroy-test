import { describe, it, expect } from "vitest";
import { removeItem } from "../methods/removeItem";
import type { TreeItem } from "../types";

describe("removeItem", () => {
  it("removes item and all descendants, updating items, itemsMap, and childrenMap", () => {
    const items: TreeItem[] = [
      { id: 1, parent: null, label: "Root" },
      { id: 2, parent: 1, label: "Child A" },
      { id: 3, parent: 2, label: "Grandchild" },
      { id: 4, parent: 1, label: "Child B" },
    ];
    const itemsMap = new Map(items.map((item) => [item.id, item]));
    const childrenMap = new Map<number | null, TreeItem[]>([
      [null, [{ id: 1, parent: null, label: "Root" }]],
      [
        1,
        [
          { id: 2, parent: 1, label: "Child A" },
          { id: 4, parent: 1, label: "Child B" },
        ],
      ],
      [2, [{ id: 3, parent: 2, label: "Grandchild" }]],
    ]);

    const result = removeItem(items, itemsMap, childrenMap, 2);

    expect(result).toBe(items);
    expect(items).toEqual([
      { id: 1, parent: null, label: "Root" },
      { id: 4, parent: 1, label: "Child B" },
    ]);
    expect(itemsMap.has(2)).toBe(false);
    expect(itemsMap.has(3)).toBe(false);
    expect(childrenMap.get(1)).toEqual([
      { id: 4, parent: 1, label: "Child B" },
    ]);
    expect(childrenMap.has(2)).toBe(false);
    expect(childrenMap.has(3)).toBe(false);
  });

  it("does nothing when id does not exist", () => {
    const items: TreeItem[] = [{ id: 1, parent: null, label: "Root" }];
    const itemsMap = new Map([[1, items[0]]]);
    const childrenMap = new Map<number | null, TreeItem[]>([
      [null, [items[0]]],
    ]);

    const result = removeItem(items, itemsMap, childrenMap, 999);

    expect(result).toBe(items);
    expect(items).toEqual([{ id: 1, parent: null, label: "Root" }]);
    expect(itemsMap.has(1)).toBe(true);
    expect(childrenMap.get(null)).toEqual([items[0]]);
  });
});
