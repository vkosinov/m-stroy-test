<script setup lang="ts">
import { useTreeStore } from "@/features/tree-operations";
import { items } from "@/shared/constants";

const { store } = useTreeStore(items);

console.log("store.getAll() = ", store.getAll());
console.log("store.getItem('91064cee') = ", store.getItem("91064cee"));
console.log("store.getChildren(1) = ", store.getChildren(1));
console.log("store.getAllChildren(4) = ", store.getAllChildren(4));
console.log("store.getAllParents(4) = ", store.getAllParents(4));
console.log(
  "store.addItem({ id: 5, parent: 4, label: 'New Child' }) = ",
  store.addItem({ id: 5, parent: 4, label: "New Child" }),
);

console.log("store.getAll() = ", store.getAll());
</script>

<template>
  <h1>TreeTable</h1>
</template>
