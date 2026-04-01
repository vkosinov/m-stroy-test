import { describe, it, expect } from "vitest";
import { addItem } from "../methods/addItem";
import type { TreeItem } from "../types";

describe("addItem", () => {
  it("adds item to items array, map, and childrenMap when parent exists", () => {
    const items: TreeItem[] = [{ id: 1, parent: null, label: "Root" }];
    const itemsMap = new Map([[1, items[0]]]);
    const childrenMap = new Map([[1, [{ id: 2, parent: 1, label: "Existing child" }]]]);

    const item: TreeItem = { id: 3, parent: 1, label: "New child" };
    addItem(items, itemsMap, childrenMap, item);

    expect(items).toContain(item);
    expect(itemsMap.get(3)).toEqual(item);
    expect(childrenMap.get(1)).toEqual([
      { id: 2, parent: 1, label: "Existing child" },
      { id: 3, parent: 1, label: "New child" },
    ]);
  });

  it("creates a new children array when parent has no entry", () => {
    const items: TreeItem[] = [];
    const itemsMap = new Map<TreeItem["id"], TreeItem>();
    const childrenMap = new Map<TreeItem["parent"], TreeItem[]>();

    const item: TreeItem = { id: "root", parent: null, label: "Root item" };
    addItem(items, itemsMap, childrenMap, item);

    expect(items).toEqual([{ id: "root", parent: null, label: "Root item" }]);
    expect(itemsMap.get("root")).toEqual(item);
    expect(childrenMap.get(null)).toEqual([{ id: "root", parent: null, label: "Root item" }]);
  });

  it("appends another item to an existing children list for the same parent", () => {
    const items: TreeItem[] = [];
    const itemsMap = new Map<TreeItem["id"], TreeItem>();
    const childrenMap = new Map<TreeItem["parent"], TreeItem[]>([
      [null, [{ id: 10, parent: null, label: "First root" }]],
    ]);

    const item: TreeItem = { id: 11, parent: null, label: "Second root" };
    addItem(items, itemsMap, childrenMap, item);

    expect(childrenMap.get(null)).toEqual([
      { id: 10, parent: null, label: "First root" },
      { id: 11, parent: null, label: "Second root" },
    ]);
  });
});
