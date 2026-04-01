<template>
  <ag-grid-vue
    class="ag-theme-alpine"
    style="height: 600px; width: 100%"
    :rowData="rowData"
    :columnDefs="columnDefs"
    :treeData="true"
    :getDataPath="getDataPath"
    :defaultColDef="defaultColDef"
    :autoGroupColumnDef="autoGroupColumnDef"
    @grid-ready="onGridReady"
    @row-group-opened="onRowGroupOpened"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { AgGridVue } from "ag-grid-vue3";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { TreeDataModule, LicenseManager } from "ag-grid-enterprise";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useTreeStore } from "@/features/tree-operations";
import { items } from "@/shared/constants";
const gridApi = ref<any>(null);

LicenseManager.setLicenseKey("");
ModuleRegistry.registerModules([AllCommunityModule, TreeDataModule]);

const { store } = useTreeStore(items);

const rowData = ref(store.getAll());

const refreshIndexes = () => {
  if (gridApi.value) {
    gridApi.value.refreshCells({
      columns: ["index"],
      force: true,
    });
  }
};

const onRowGroupOpened = () => {
  refreshIndexes();
};

const onGridReady = (params: any) => {
  gridApi.value = params.api;
};

const columnDefs = [
  {
    field: "index",
    headerName: "№ п\\п",
    valueGetter: (params: any) => params.node.rowIndex + 1,
    width: 100,
    cellStyle: { fontWeight: "bold" } as const,
    pinned: "left" as const,
  },
  {
    field: "category",
    headerName: "Наименование",
    valueGetter: (params: any) => {
      return params.data.label;
    },
    cellStyle: (params: any) => {
      const hasChildren = rowData.value.some(
        (item) => item.parent === params.data.id,
      );
      return hasChildren
        ? { fontWeight: "bold" as const, textAlign: "left" as const }
        : { fontWeight: "normal" as const, textAlign: "left" as const };
    },
    flex: 1,
  },
];

const defaultColDef = {
  sortable: true,
  resizable: true,
  filter: false,
};

const autoGroupColumnDef = {
  headerName: "Категория",
  cellRendererParams: {
    suppressCount: true,
  },
  valueGetter: (params: any) => {
    const hasChildren = rowData.value.some(
      (item) => item.parent === params.data.id,
    );
    return hasChildren ? "Группа" : "Элемент";
  },
  cellStyle: (params: any) => {
    const hasChildren = rowData.value.some(
      (item) => item.parent === params.data.id,
    );
    return hasChildren
      ? { fontWeight: "bold" as const }
      : { fontWeight: "normal" as const };
  },
  flex: 1,
};

const getDataPath = (data: any) => {
  const path: string[] = [];
  let current = data;
  while (current) {
    path.unshift(current.label);
    current = rowData.value.find((item) => item.id === current.parent);
  }
  return path;
};
</script>
