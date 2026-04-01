import type { TreeItem, TreeItemId, TreeItemParentId } from "../types";
import { getAllChildren } from "./getAllChildren";

export const removeItem = (
  items: TreeItem[],
  itemsMap: Map<TreeItemId, TreeItem>,
  childrenMap: Map<TreeItemParentId, TreeItem[]>,
  id: TreeItemId,
): TreeItem[] => {
  const toRemove = [id, ...getAllChildren(childrenMap, id).map((i) => i.id)];

  for (const removeId of toRemove) {
    const item = itemsMap.get(removeId);
    if (!item) continue;

    const index = items.findIndex((i) => i.id === removeId);

    if (index !== -1) {
      items.splice(index, 1);
    }

    itemsMap.delete(removeId);

    const siblings = childrenMap.get(item.parent);

    if (siblings) {
      childrenMap.set(
        item.parent,
        siblings.filter((i) => i.id !== removeId),
      );
    }

    childrenMap.delete(removeId);
  }

  return items;
};
