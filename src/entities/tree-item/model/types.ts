export type TreeItemId = number;
export type TreeItemParentId = number | null;

export interface TreeItem {
  id: TreeItemId;
  parent: TreeItemParentId;
  label: string;
}
