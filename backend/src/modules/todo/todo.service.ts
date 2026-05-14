import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ITodoRepository, TODO_REPOSITORY } from "../../core/interfaces/itodo.repository";
import { ITodoService } from "../../core/interfaces/itodo.service";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { Todo } from "./schemas/todo.schema";

@Injectable()
export class TodoService implements ITodoService {
  constructor(@Inject(TODO_REPOSITORY) private readonly todoRepository: ITodoRepository) {}

  async create(dto: CreateTodoDto): Promise<Todo> {
    return this.todoRepository.create({ ...dto, dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined });
  }

  async findAll(): Promise<Todo[]> {
    return this.todoRepository.findAll();
  }

  async findById(id: string): Promise<Todo> {
    const todo = await this.todoRepository.findById(id);
    if (!todo) throw new NotFoundException("Todo not found");
    return todo;
  }

  async updateById(id: string, dto: UpdateTodoDto): Promise<Todo> {
    const todo = await this.todoRepository.updateById(id, { ...dto, dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined });
    if (!todo) throw new NotFoundException("Todo not found");
    return todo;
  }

  async deleteById(id: string): Promise<Todo> {
    const todo = await this.todoRepository.deleteById(id);
    if (!todo) throw new NotFoundException("Todo not found");
    return todo;
  }
}
