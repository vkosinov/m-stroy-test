import type { TreeItem, TreeItemId, TreeItemParentId } from "../types";

export const getChildren = (
  childrenMap: Map<TreeItemParentId, TreeItem[]>,
  id: TreeItemId,
): TreeItem[] => childrenMap.get(id) || [];
