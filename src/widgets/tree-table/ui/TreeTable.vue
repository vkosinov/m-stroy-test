<script setup lang="ts">
import { useTreeStore } from "@/features/tree-operations";
import { items } from "@/shared/constants";

const { store } = useTreeStore(items);

console.log("store.getAll() = ", store.getAll());
console.log("store.removeItem(4)", store.removeItem(4));
console.log("store.getAll() = ", store.getAll());
</script>

<template>
  <h1>TreeTable</h1>
</template>
