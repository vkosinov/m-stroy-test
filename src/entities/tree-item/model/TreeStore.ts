import * as methods from "./methods";
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

  // Должен возвращать изначальный массив элементов
  getAll(): TreeItem[] {
    return methods.getAll(this.items);
  }

  // Принимает id элемента и возвращает сам объект элемента.
  getItem(id: TreeItemId): TreeItem | undefined {
    return methods.getItem(this.itemsMap, id);
  }

  // Принимает id элемента и возвращает массив элементов,
  // являющихся дочерними для того элемента, чей id получен в аргументе. Если у
  // элемента нет дочерних, то должен возвращаться пустой массив
  getChildren(id: TreeItemId): TreeItem[] {
    return methods.getChildren(this.childrenMap, id);
  }

  // Принимает id элемента и возвращает массив элементов,
  // являющихся прямыми дочерними элементами того, чей id получен в аргументе +
  // если у них в свою очередь есть еще дочерние элементы, они все тоже будут
  // включены в результат и так до самого глубокого уровня.
  getAllChildren(id: TreeItemId): TreeItem[] {
    return methods.getAllChildren(this.childrenMap, id);
  }

  // Принимает id элемента и возвращает массив из цепочки
  // родительских элементов, начиная от самого элемента, чей id был передан в
  // аргументе и до корневого элемента, т.е. должен получиться путь элемента
  // наверх дерева через цепочку родителей к корню дерева. В результате
  // getAllParents ПОРЯДОК ЭЛЕМЕНТОВ ВАЖЕН!
  getAllParents(id: TreeItemId): TreeItem[] {
    return methods.getAllParents(this.itemsMap, id);
  }
}
