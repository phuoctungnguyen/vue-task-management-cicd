import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TODO_REPOSITORY } from '../../core/interfaces/itodo.repository';
import { TODO_SERVICE } from '../../core/interfaces/itodo.service';
import { TodoController } from './todo.controller';
import { TodoRepository } from './todo.repository';
import { TodoService } from './todo.service';
import { Todo, TodoSchema } from './schemas/todo.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }])],
  controllers: [TodoController],
  providers: [
    TodoRepository,
    TodoService,
    { provide: TODO_REPOSITORY, useExisting: TodoRepository },
    { provide: TODO_SERVICE, useExisting: TodoService },
  ],
  exports: [TODO_REPOSITORY, TODO_SERVICE],
})
export class TodoModule {}