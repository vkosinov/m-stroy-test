<script setup lang="ts">
import { useTreeStore } from "@/features/tree-operations";
import { items } from "@/shared/constants";

const { store } = useTreeStore(items);

console.log("store.getAll() = ", store.getAll());
console.log(
  'store.updateItem({ id: 4, label: "", parent: null })',
  store.updateItem({ id: 4, label: "", parent: null }),
);
console.log("store.state() = ", store.getState());
</script>

<template>
  <h1>TreeTable</h1>
</template>
