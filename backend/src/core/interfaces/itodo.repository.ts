import { Todo } from "../../modules/todo/schemas/todo.schema";

export const TODO_REPOSITORY = "TODO_REPOSITORY";

export interface ITodoRepository {
  create(payload: Partial<Todo>): Promise<Todo>;
  findAll(): Promise<Todo[]>;
  findById(id: string): Promise<Todo | null>;
  updateById(id: string, payload: Partial<Todo>): Promise<Todo | null>;
  deleteById(id: string): Promise<Todo | null>;
}
