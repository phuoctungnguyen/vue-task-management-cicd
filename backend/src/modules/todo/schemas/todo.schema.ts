import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TodoDocument = HydratedDocument<Todo>;

@Schema({ timestamps: true, versionKey: false })
export class Todo {
  @Prop({ required: true, trim: true })
  title!: string;

  @Prop({ default: '' })
  description!: string;

  @Prop({ default: false })
  completed!: boolean;

  @Prop()
  dueDate?: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);