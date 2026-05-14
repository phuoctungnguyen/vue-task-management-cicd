<template>
  <section class="layout">
    <form class="create-form" @submit.prevent="onSubmitCreate">
      <input v-model="createForm.title" type="text" placeholder="Task title" required maxlength="200" />
      <input v-model="createForm.description" type="text" placeholder="Description (optional)" maxlength="1000" />
      <input v-model="createForm.dueDate" type="datetime-local" />
      <button type="submit" :disabled="store.loading">Add task</button>
    </form>

    <header class="toolbar">
      <h1>Todo Board</h1>
      <div class="controls">
        <input
          :value="store.searchKeyword"
          type="text"
          placeholder="Search todos..."
          @input="onSearchInput"
        />
        <select v-model="store.filter">
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
        <select v-model="store.sort">
          <option value="createdAtDesc">Newest</option>
          <option value="createdAtAsc">Oldest</option>
          <option value="dueDateAsc">Due Date ↑</option>
          <option value="dueDateDesc">Due Date ↓</option>
        </select>
        <button type="button" @click="store.completeAll">Complete all</button>
        <button type="button" :disabled="store.selectedCount === 0" @click="store.deleteSelected">
          Delete selected ({{ store.selectedCount }})
        </button>
      </div>
    </header>

    <p v-if="store.loading">Loading todos...</p>
    <p v-else-if="store.error" class="error">{{ store.error }}</p>
    <p v-else-if="store.visibleTodos.length === 0">No todos found.</p>

    <div v-else class="grid">
      <TodoItem
        v-for="todo in store.visibleTodos"
        :key="todo.id"
        :todo="todo"
        :selected="store.selectedIds.includes(todo.id)"
        @toggle-select="store.toggleSelection"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import TodoItem from "../components/TodoItem.vue";
import { useTodoStore } from "../stores/todoStore";

const store = useTodoStore();
const createForm = reactive({
  title: "",
  description: "",
  dueDate: ""
});

async function onSubmitCreate(): Promise<void> {
  await store.addTodo({
    title: createForm.title.trim(),
    description: createForm.description.trim() || undefined,
    dueDate: createForm.dueDate ? new Date(createForm.dueDate).toISOString() : undefined,
    completed: false
  });

  createForm.title = "";
  createForm.description = "";
  createForm.dueDate = "";
}

function onSearchInput(event: Event): void {
  const target = event.target as HTMLInputElement;
  store.setSearchKeyword(target.value);
}

onMounted(() => {
  store.fetchTodos();
});
</script>

<style scoped>
.layout { max-width: 900px; margin: 0 auto; }
.create-form { display: grid; grid-template-columns: 1.2fr 1.6fr 1fr auto; gap: 8px; margin-bottom: 12px; }
.toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; gap: 10px; }
.controls { display: flex; gap: 8px; }
select, input, button { border: 1px solid #c5cff4; border-radius: 8px; padding: 8px; background: #fff; }
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px; }
.error { color: #b42318; }
@media (max-width: 900px) {
  .create-form { grid-template-columns: 1fr; }
  .toolbar { flex-direction: column; align-items: stretch; }
  .controls { flex-wrap: wrap; }
}
</style>
