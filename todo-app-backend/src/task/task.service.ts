import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { GetAllTasksDto } from "./dto/getAllTasks.dto";
import { CreateTaskDto } from "./dto/createTask.dto";
import { UpdateTaskDto } from "./dto/updateTask.dto";
import { UpdateStatusDto } from "./dto/updateStatus.dto";

@Injectable()
export class TaskService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll({ userId, status }: GetAllTasksDto) {
    return await this.prismaService.task.findMany({
      where: {
        userId,
        status,
      },
    });
  }

  async create(dto: CreateTaskDto) {
    return await this.prismaService.task.create({
      data: dto,
    });
  }

  async update(id: number, dto: UpdateTaskDto) {
    return await this.prismaService.task.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  async updateStatus(id: number, dto: UpdateStatusDto) {
    return await this.prismaService.task.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  async delete(id: number) {
    return await this.prismaService.task.delete({
      where: {
        id,
      },
    });
  }
}
