import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { TodoModule } from "./modules/todo/todo.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI || process.env.MONGODB_URL || "", {
      family: 4,
    }),
    TodoModule,
  ],
})
export class AppModule {}
