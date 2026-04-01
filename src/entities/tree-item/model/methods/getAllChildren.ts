import type { TreeItem, TreeItemId, TreeItemParentId } from "../types";
import { getChildren } from "./getChildren";

export const getAllChildren = (
  childrenMap: Map<TreeItemParentId, TreeItem[]>,
  id: TreeItemId,
): TreeItem[] => {
  const result: TreeItem[] = [];
  const stack = [...getChildren(childrenMap, id)];

  while (stack.length) {
    const item = stack.pop()!;
    result.push(item);
    stack.push(...getChildren(childrenMap, item.id));
  }

  return result;
};
