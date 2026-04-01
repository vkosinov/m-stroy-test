import { describe, it, expect } from "vitest";
import { updateItem } from "../methods/updateItem";
import type { TreeItem } from "../types";

describe("updateItem", () => {
  it("updates item properties when item exists", () => {
    const items: TreeItem[] = [{ id: 1, parent: null, label: "Original" }];
    const itemsMap = new Map<TreeItem["id"], TreeItem>([[1, items[0]]]);
    const childrenMap = new Map<TreeItem["parent"], TreeItem[]>([
      [null, [items[0]]],
    ]);

    const updated: TreeItem = { id: 1, parent: null, label: "Updated" };
    updateItem(items, itemsMap, childrenMap, updated);

    expect(itemsMap.get(1)).toEqual(updated);
    expect(items[0]).toEqual(updated);
    expect(childrenMap.get(null)).toEqual([updated]);
  });

  it("does nothing when item does not exist", () => {
    const items: TreeItem[] = [{ id: 1, parent: null, label: "Original" }];
    const itemsMap = new Map<TreeItem["id"], TreeItem>([[1, items[0]]]);
    const childrenMap = new Map<TreeItem["parent"], TreeItem[]>([
      [null, [items[0]]],
    ]);

    const updated: TreeItem = { id: 2, parent: null, label: "Non-existent" };
    updateItem(items, itemsMap, childrenMap, updated);

    expect(items).toEqual([{ id: 1, parent: null, label: "Original" }]);
    expect(itemsMap.get(2)).toBeUndefined();
    expect(childrenMap.get(null)).toEqual([
      { id: 1, parent: null, label: "Original" },
    ]);
  });

  it("moves item to new parent when parent changes", () => {
    const items: TreeItem[] = [
      { id: 1, parent: null, label: "Root" },
      { id: 2, parent: 1, label: "Child" },
    ];
    const itemsMap = new Map<TreeItem["id"], TreeItem>([
      [1, items[0]],
      [2, items[1]],
    ]);
    const childrenMap = new Map<TreeItem["parent"], TreeItem[]>([
      [null, [items[0]]],
      [1, [items[1]]],
    ]);

    const updated: TreeItem = { id: 2, parent: null, label: "Moved to root" };
    updateItem(items, itemsMap, childrenMap, updated);

    expect(itemsMap.get(2)).toEqual(updated);
    expect(childrenMap.get(1)).toEqual([]);
    expect(childrenMap.get(null)).toEqual([
      { id: 1, parent: null, label: "Root" },
      { id: 2, parent: null, label: "Moved to root" },
    ]);
  });

  it("creates new children array for new parent if it doesn't exist", () => {
    const items: TreeItem[] = [{ id: 1, parent: null, label: "Root" }];
    const itemsMap = new Map<TreeItem["id"], TreeItem>([[1, items[0]]]);
    const childrenMap = new Map<TreeItem["parent"], TreeItem[]>([
      [null, [items[0]]],
    ]);

    const updated: TreeItem = {
      id: 1,
      parent: 2,
      label: "Updated with new parent",
    };
    updateItem(items, itemsMap, childrenMap, updated);

    expect(itemsMap.get(1)).toEqual(updated);
    expect(childrenMap.get(null)).toEqual([]);
    expect(childrenMap.get(2)).toEqual([updated]);
  });

  it("handles moving from one parent to another correctly", () => {
    const items: TreeItem[] = [
      { id: 1, parent: null, label: "Root" },
      { id: 2, parent: 1, label: "Child1" },
      { id: 3, parent: 1, label: "Child2" },
    ];
    const itemsMap = new Map<TreeItem["id"], TreeItem>([
      [1, items[0]],
      [2, items[1]],
      [3, items[2]],
    ]);
    const childrenMap = new Map<TreeItem["parent"], TreeItem[]>([
      [null, [items[0]]],
      [1, [items[1], items[2]]],
    ]);

    const updated: TreeItem = { id: 2, parent: 3, label: "Moved to sibling" };
    updateItem(items, itemsMap, childrenMap, updated);

    expect(itemsMap.get(2)).toEqual(updated);
    expect(childrenMap.get(1)).toEqual([items[2]]);
    expect(childrenMap.get(3)).toEqual([updated]);
  });

  it("updates item in items array at correct index", () => {
    const items: TreeItem[] = [
      { id: 1, parent: null, label: "First" },
      { id: 2, parent: null, label: "Second" },
      { id: 3, parent: null, label: "Third" },
    ];
    const itemsMap = new Map<TreeItem["id"], TreeItem>([
      [1, items[0]],
      [2, items[1]],
      [3, items[2]],
    ]);
    const childrenMap = new Map<TreeItem["parent"], TreeItem[]>([
      [null, items],
    ]);

    const updated: TreeItem = { id: 2, parent: null, label: "Updated Second" };
    updateItem(items, itemsMap, childrenMap, updated);

    expect(items).toEqual([
      { id: 1, parent: null, label: "First" },
      { id: 2, parent: null, label: "Updated Second" },
      { id: 3, parent: null, label: "Third" },
    ]);
  });

  it("preserves other properties when updating", () => {
    const items: TreeItem[] = [{ id: 1, parent: null, label: "Original" }];
    const itemsMap = new Map<TreeItem["id"], TreeItem>([[1, items[0]]]);
    const childrenMap = new Map<TreeItem["parent"], TreeItem[]>([
      [null, [items[0]]],
    ]);

    const updated: TreeItem = { id: 1, parent: null, label: "Updated" };
    updateItem(items, itemsMap, childrenMap, updated);

    expect(itemsMap.get(1)?.id).toBe(1);
    expect(itemsMap.get(1)?.parent).toBe(null);
    expect(itemsMap.get(1)?.label).toBe("Updated");
  });

  it("handles string IDs correctly", () => {
    const items: TreeItem[] = [
      { id: "item1", parent: null, label: "Original" },
    ];
    const itemsMap = new Map<TreeItem["id"], TreeItem>([["item1", items[0]]]);
    const childrenMap = new Map<TreeItem["parent"], TreeItem[]>([
      [null, [items[0]]],
    ]);

    const updated: TreeItem = {
      id: "item1",
      parent: "parent1",
      label: "Updated",
    };
    updateItem(items, itemsMap, childrenMap, updated);

    expect(itemsMap.get("item1")).toEqual(updated);
    expect(childrenMap.get(null)).toEqual([]);
    expect(childrenMap.get("parent1")).toEqual([updated]);
  });
});
