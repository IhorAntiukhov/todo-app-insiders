import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { TaskService } from "./task.service";
import { GetAllTasksDto } from "./dto/getAllTasks.dto";
import { CreateTaskDto } from "./dto/createTask.dto";
import { UpdateTaskDto } from "./dto/updateTask.dto";
import { UpdateStatusDto } from "./dto/updateStatus.dto";

@Controller("tasks")
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  findAll(@Query() query: GetAllTasksDto) {
    return this.taskService.findAll(query);
  }

  @Post()
  create(@Body() body: CreateTaskDto) {
    return this.taskService.create(body);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() body: UpdateTaskDto) {
    return this.taskService.update(+id, body);
  }

  @Patch(":id")
  updateStatus(@Param("id") id: string, @Body() body: UpdateStatusDto) {
    return this.taskService.updateStatus(+id, body);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.taskService.delete(+id);
  }
}
