import type { TreeItem, TreeItemId, TreeItemParentId } from "../types";

export const updateItem = (
  items: TreeItem[],
  itemsMap: Map<TreeItemId, TreeItem>,
  childrenMap: Map<TreeItemParentId, TreeItem[]>,
  updated: TreeItem,
) => {
  const old = itemsMap.get(updated.id);
  if (!old) return;

  if (old.parent !== updated.parent) {
    const oldSiblings = childrenMap.get(old.parent);
    if (oldSiblings) {
      childrenMap.set(
        old.parent,
        oldSiblings.filter((i) => i.id !== old.id),
      );
    }

    if (!childrenMap.has(updated.parent)) {
      childrenMap.set(updated.parent, []);
    }

    childrenMap.get(updated.parent)!.push(updated);
  }

  Object.assign(old, updated);

  const index = items.findIndex((i) => i.id === updated.id);

  if (index !== -1) {
    items[index] = old;
  }
};
