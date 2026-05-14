import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { TodoService, TodoFilter, TodoSort } from "../core/services/TodoService";
import { TodoApiClient } from "../infra/TodoApiClient";
import { Todo } from "../core/models/Todo";
import { TodoApiItem } from "../core/interfaces/todo-api.interface";

const todoService = new TodoService(new TodoApiClient());

export const useTodoStore = defineStore("todo", () => {
  const todos = ref<Todo[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const filter = ref<TodoFilter>("all");
  const sort = ref<TodoSort>("createdAtDesc");
  const selectedIds = ref<string[]>([]);
  const searchKeyword = ref("");
  const debouncedKeyword = ref("");
  let searchTimer: ReturnType<typeof setTimeout> | null = null;

  const visibleTodos = computed(() => {
    const filtered = todoService.filterTodos(todos.value, filter.value);
    const searched = todoService.searchTodos(filtered, debouncedKeyword.value);
    return todoService.sortTodos(searched, sort.value);
  });

  const selectedCount = computed(() => selectedIds.value.length);

  async function fetchTodos(): Promise<void> {
    loading.value = true;
    error.value = null;
    try {
      todos.value = await todoService.fetchTodos();
    } catch (e) {
      error.value = e instanceof Error ? e.message : "Failed to load todos.";
    } finally {
      loading.value = false;
    }
  }

  async function addTodo(payload: Pick<TodoApiItem, "title"> & Partial<TodoApiItem>): Promise<void> {
    loading.value = true;
    error.value = null;
    try {
      await todoService.createTodo(payload);
      await fetchTodos();
    } catch (e) {
      error.value = e instanceof Error ? e.message : "Failed to create todo.";
      loading.value = false;
    }
  }

  function setSearchKeyword(value: string): void {
    searchKeyword.value = value;
    if (searchTimer) {
      clearTimeout(searchTimer);
    }
    searchTimer = setTimeout(() => {
      debouncedKeyword.value = value;
    }, 300);
  }

  function toggleSelection(id: string): void {
    if (selectedIds.value.includes(id)) {
      selectedIds.value = selectedIds.value.filter((item) => item !== id);
      return;
    }
    selectedIds.value.push(id);
  }

  async function completeAll(): Promise<void> {
    loading.value = true;
    error.value = null;
    try {
      await todoService.completeAll(todos.value);
      await fetchTodos();
    } catch (e) {
      error.value = e instanceof Error ? e.message : "Failed to complete all todos.";
      loading.value = false;
    }
  }

  async function deleteSelected(): Promise<void> {
    if (selectedIds.value.length === 0) {
      return;
    }
    loading.value = true;
    error.value = null;
    try {
      await todoService.deleteMany(selectedIds.value);
      selectedIds.value = [];
      await fetchTodos();
    } catch (e) {
      error.value = e instanceof Error ? e.message : "Failed to delete selected todos.";
      loading.value = false;
    }
  }

  return {
    todos,
    visibleTodos,
    loading,
    error,
    filter,
    sort,
    searchKeyword,
    selectedIds,
    selectedCount,
    fetchTodos,
    addTodo,
    setSearchKeyword,
    toggleSelection,
    completeAll,
    deleteSelected
  };
});
