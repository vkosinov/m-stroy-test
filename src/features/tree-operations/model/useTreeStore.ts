import type { TreeItem } from "@/entities/tree-item";
import { TreeStore } from "@/entities/tree-item";

export const useTreeStore = (items: TreeItem[]) => {
  const store = new TreeStore(items);

  return {
    store,
    getAll: store.getAll,
    getState: store.getState,
    getItem: store.getItem,
    getChildren: store.getChildren,
    getAllChildren: store.getAllChildren,
    getAllParents: store.getAllParents,
    addItem: store.addItem,
    removeItem: store.removeItem,
    updateItem: store.updateItem,
  };
};
