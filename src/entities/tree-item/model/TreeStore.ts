import { getAll, getItem } from "./methods";
import type { TreeItem, TreeItemId, TreeItemParentId } from "./types";

export class TreeStore {
  private items: TreeItem[];
  private itemsMap: Map<TreeItemId, TreeItem>;
  private childrenMap: Map<TreeItemParentId, TreeItem[]>;

  constructor(items: TreeItem[]) {
    this.items = items;
    this.itemsMap = new Map();
    this.childrenMap = new Map();

    this.createMaps();
  }

  private createMaps() {
    this.itemsMap.clear();
    this.childrenMap.clear();

    for (const item of this.items) {
      this.itemsMap.set(item.id, item);

      if (!this.childrenMap.has(item.parent)) {
        this.childrenMap.set(item.parent, []);
      }

      this.childrenMap.get(item.parent)!.push(item);
    }
  }

  getAll() {
    return getAll(this.items);
  }

  getItem(id: TreeItemId) {
    return getItem(this.itemsMap, id);
  }
}
