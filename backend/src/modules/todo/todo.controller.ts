import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { ITodoService, TODO_SERVICE } from "../../core/interfaces/itodo.service";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";

@ApiTags("todos")
@Controller("todos")
export class TodoController {
  constructor(@Inject(TODO_SERVICE) private readonly todoService: ITodoService) {}

  @Post()
  @ApiOperation({ summary: "Create todo" })
  create(@Body() dto: CreateTodoDto) {
    return this.todoService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all todos" })
  findAll() {
    return this.todoService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get todo by id" })
  findById(@Param("id") id: string) {
    return this.todoService.findById(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update todo by id" })
  updateById(@Param("id") id: string, @Body() dto: UpdateTodoDto) {
    return this.todoService.updateById(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete todo by id" })
  deleteById(@Param("id") id: string) {
    return this.todoService.deleteById(id);
  }
}
