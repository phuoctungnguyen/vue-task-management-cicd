<template>
  <article class="todo-item" :class="{ done: todo.completed, expired: todo.isExpired() }">
    <header>
      <label class="title-wrap">
        <input type="checkbox" :checked="selected" @change="$emit('toggle-select', todo.id)" />
        <h3>{{ todo.title }}</h3>
      </label>
      <span class="status">{{ todo.getStatus() }}</span>
    </header>
    <p v-if="todo.description" class="description">{{ todo.description }}</p>
    <footer>
      <small>Due: {{ todo.getFormattedDate() }}</small>
    </footer>
  </article>
</template>

<script setup lang="ts">
import { Todo } from "../core/models/Todo";

defineProps<{
  todo: Todo;
  selected: boolean;
}>();

defineEmits<{
  (e: "toggle-select", id: string): void;
}>();
</script>

<style scoped>
.todo-item { background: #fff; border: 1px solid #dbe2ff; border-radius: 12px; padding: 14px; }
.todo-item header { display: flex; justify-content: space-between; align-items: center; gap: 8px; }
.title-wrap { display: flex; align-items: center; gap: 8px; }
.todo-item h3 { margin: 0; font-size: 16px; }
.status { text-transform: capitalize; color: #3651b5; font-size: 12px; }
.description { margin: 10px 0; color: #4d5b89; }
.done { opacity: 0.75; }
.expired { border-color: #ffad99; }
</style>
