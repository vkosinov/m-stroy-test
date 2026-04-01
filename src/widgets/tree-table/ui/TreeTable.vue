<script setup lang="ts">
import { useTreeStore } from "@/features/tree-operations";

const items = [
  { id: 1, parent: null, label: "item 1" },
  { id: 2, parent: 1, label: "item 2" },
];

const { store } = useTreeStore(items);

console.log(store.getAll());
console.log(store.getItem(2));
</script>

<template>
  <h1>TreeTable</h1>
</template>
