import { IsEnum, IsOptional } from "class-validator";
import { Status } from "generated/prisma/enums";

export class GetAllTasksDto {
  @IsOptional()
  @IsEnum(Status)
  status: Status;
}
