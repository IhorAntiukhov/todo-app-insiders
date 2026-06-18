import { Module } from "@nestjs/common";
import { TaskModule } from "./task/task.module";
import { PrismaModule } from "./prisma/prisma.module";
import { PrismaService } from "./prisma/prisma.service";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [TaskModule, PrismaModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
