import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import {
  ApiErrorResponse,
  ApiSuccessResponse,
  ITodoApiClient,
  TodoApiItem
} from "../core/interfaces/todo-api.interface";

export class TodoApiClient implements ITodoApiClient {
  private readonly http: AxiosInstance;

  constructor(baseURL: string = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api") {
    this.http = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json"
      }
    });

    this.http.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError<ApiErrorResponse>) => {
        const apiError = error.response?.data;
        const fallbackMessage = "Unexpected system error. Please try again.";
        const message = apiError?.message || fallbackMessage;
        return Promise.reject(new Error(message));
      }
    );
  }

  async getTodos(): Promise<TodoApiItem[]> {
    const response = await this.http.get<ApiSuccessResponse<TodoApiItem[]> | TodoApiItem[]>("/todos");
    return this.extractData<TodoApiItem[]>(response.data);
  }

  async getTodoById(id: string): Promise<TodoApiItem> {
    const response = await this.http.get<ApiSuccessResponse<TodoApiItem> | TodoApiItem>(`/todos/${id}`);
    return this.extractData<TodoApiItem>(response.data);
  }

  async createTodo(payload: Partial<TodoApiItem>): Promise<TodoApiItem> {
    const response = await this.http.post<ApiSuccessResponse<TodoApiItem> | TodoApiItem>("/todos", payload);
    return this.extractData<TodoApiItem>(response.data);
  }

  async updateTodo(id: string, payload: Partial<TodoApiItem>): Promise<TodoApiItem> {
    const response = await this.http.patch<ApiSuccessResponse<TodoApiItem> | TodoApiItem>(`/todos/${id}`, payload);
    return this.extractData<TodoApiItem>(response.data);
  }

  async deleteTodo(id: string): Promise<void> {
    await this.http.delete(`/todos/${id}`);
  }

  private extractData<T>(payload: ApiSuccessResponse<T> | T): T {
    if (payload && typeof payload === "object" && "data" in payload) {
      return payload.data as T;
    }
    return payload as T;
  }
}
