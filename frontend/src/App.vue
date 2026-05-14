<template>
  <main class="app-shell">
    <TodoLayout />
  </main>
</template>

<script setup lang="ts">
import TodoLayout from "./views/TodoLayout.vue";
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
  padding: 24px;
  background: linear-gradient(180deg, #f5f7ff 0%, #e9eefb 100%);
}
</style>
