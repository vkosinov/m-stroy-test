import type { TreeItem } from "@/entities/tree-item";
import { TreeStore } from "@/entities/tree-item";

export const useTreeStore = (items: TreeItem[]) => {
  const store = new TreeStore(items);

  return {
    store,
    getAll: store.getAll,
    getItem: store.getItem,
    getChildren: store.getChildren,
  };
};
