import { ITodoApiClient, TodoApiItem } from "../interfaces/todo-api.interface";
import { Todo, TodoStatus } from "../models/Todo";

export type TodoFilter = "all" | TodoStatus;
export type TodoSort = "createdAtAsc" | "createdAtDesc" | "dueDateAsc" | "dueDateDesc";

export class TodoService {
  constructor(private readonly apiClient: ITodoApiClient) {}

  async fetchTodos(): Promise<Todo[]> {
    const items = await this.apiClient.getTodos();
    return items.map((item) => this.toModel(item));
  }

  async createTodo(payload: Partial<TodoApiItem>): Promise<Todo> {
    const created = await this.apiClient.createTodo(payload);
    return this.toModel(created);
  }

  async updateTodo(id: string, payload: Partial<TodoApiItem>): Promise<Todo> {
    const updated = await this.apiClient.updateTodo(id, payload);
    return this.toModel(updated);
  }

  async deleteTodo(id: string): Promise<void> {
    await this.apiClient.deleteTodo(id);
  }

  async completeAll(todos: Todo[]): Promise<Todo[]> {
    const activeTodos = todos.filter((todo) => !todo.completed);
    const updated = await Promise.all(
      activeTodos.map((todo) => this.apiClient.updateTodo(todo.id, { completed: true }))
    );
    return updated.map((item) => this.toModel(item));
  }

  async deleteMany(ids: string[]): Promise<void> {
    await Promise.all(ids.map((id) => this.apiClient.deleteTodo(id)));
  }

  searchTodos(todos: Todo[], keyword: string): Todo[] {
    const normalized = keyword.trim().toLowerCase();
    if (!normalized) {
      return todos;
    }

    return todos.filter((todo) => {
      const title = todo.title.toLowerCase();
      const description = todo.description?.toLowerCase() || "";
      return title.includes(normalized) || description.includes(normalized);
    });
  }

  filterTodos(todos: Todo[], filter: TodoFilter): Todo[] {
    if (filter === "all") {
      return todos;
    }

    return todos.filter((todo) => todo.getStatus() === filter);
  }

  sortTodos(todos: Todo[], sort: TodoSort): Todo[] {
    const copiedTodos = [...todos];
    const safeTime = (date?: Date): number => (date ? date.getTime() : 0);

    return copiedTodos.sort((a, b) => {
      switch (sort) {
        case "createdAtAsc":
          return safeTime(a.createdAt) - safeTime(b.createdAt);
        case "createdAtDesc":
          return safeTime(b.createdAt) - safeTime(a.createdAt);
        case "dueDateAsc":
          return safeTime(a.dueDate) - safeTime(b.dueDate);
        case "dueDateDesc":
          return safeTime(b.dueDate) - safeTime(a.dueDate);
        default:
          return 0;
      }
    });
  }

  private toModel(item: TodoApiItem): Todo {
    return new Todo({
      id: item.id || item._id || "",
      title: item.title,
      description: item.description,
      completed: item.completed,
      dueDate: item.dueDate,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    });
  }
}
