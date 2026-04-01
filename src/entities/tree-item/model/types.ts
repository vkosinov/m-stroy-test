export type TreeItemId = number | string;
export type TreeItemParentId = number | string | null;

export interface TreeItem {
  id: TreeItemId;
  parent: TreeItemParentId;
  label: string;
}
