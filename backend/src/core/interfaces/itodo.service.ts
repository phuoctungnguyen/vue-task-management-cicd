import { CreateTodoDto } from "../../modules/todo/dto/create-todo.dto";
import { UpdateTodoDto } from "../../modules/todo/dto/update-todo.dto";
import { Todo } from "../../modules/todo/schemas/todo.schema";

export const TODO_SERVICE = "TODO_SERVICE";

export interface ITodoService {
  create(dto: CreateTodoDto): Promise<Todo>;
  findAll(): Promise<Todo[]>;
  findById(id: string): Promise<Todo>;
  updateById(id: string, dto: UpdateTodoDto): Promise<Todo>;
  deleteById(id: string): Promise<Todo>;
}
