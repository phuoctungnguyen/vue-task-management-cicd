export interface TodoApiItem {
  _id?: string;
  id?: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  success: false;
  errorCode: string;
  message: string;
  details: unknown;
}

export interface ITodoApiClient {
  getTodos(): Promise<TodoApiItem[]>;
  getTodoById(id: string): Promise<TodoApiItem>;
  createTodo(payload: Partial<TodoApiItem>): Promise<TodoApiItem>;
  updateTodo(id: string, payload: Partial<TodoApiItem>): Promise<TodoApiItem>;
  deleteTodo(id: string): Promise<void>;
}
