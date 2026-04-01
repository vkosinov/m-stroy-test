import type { TreeItem, TreeItemId } from "../types";

export const addItem = (
  items: TreeItem[],
  itemsMap: Map<TreeItemId, TreeItem>,
  childrenMap: Map<TreeItemId, TreeItem[]>,
  item: TreeItem,
) => {
  items.push(item);
  itemsMap.set(item.id, item);

  if (!childrenMap.has(item.parent)) {
    childrenMap.set(item.parent, []);
  }

  childrenMap.get(item.parent)!.push(item);
};
