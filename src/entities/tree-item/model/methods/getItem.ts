import type { TreeItem, TreeItemId } from "../types";

export const getItem = (
  itemsMap: Map<TreeItemId, TreeItem>,
  id: TreeItemId,
): TreeItem | undefined => {
  return itemsMap.get(id);
};
