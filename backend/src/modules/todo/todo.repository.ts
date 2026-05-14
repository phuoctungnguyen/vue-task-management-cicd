import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ITodoRepository } from "../../core/interfaces/itodo.repository";
import { Todo, TodoDocument } from "./schemas/todo.schema";

export class TodoRepository implements ITodoRepository {
  constructor(@InjectModel(Todo.name) private readonly todoModel: Model<TodoDocument>) {}

  async create(payload: Partial<Todo>): Promise<Todo> {
    const created = await this.todoModel.create(payload);
    return created.toObject();
  }

  async findAll(): Promise<Todo[]> {
    return this.todoModel.find().sort({ createdAt: -1 }).lean();
  }

  async findById(id: string): Promise<Todo | null> {
    return this.todoModel.findById(id).lean();
  }

  async updateById(id: string, payload: Partial<Todo>): Promise<Todo | null> {
    return this.todoModel.findByIdAndUpdate(id, payload, { new: true }).lean();
  }

  async deleteById(id: string): Promise<Todo | null> {
    return this.todoModel.findByIdAndDelete(id).lean();
  }
}
