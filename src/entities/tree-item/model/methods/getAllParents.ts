import type { TreeItem, TreeItemId } from "../types";

export const getAllParents = (
  map: Map<TreeItemId, TreeItem>,
  id: TreeItemId,
): TreeItem[] => {
  const result: TreeItem[] = [];
  let current = map.get(id);

  while (current) {
    result.push(current);
    current = map.get(current.parent);
  }

  return result;
};
