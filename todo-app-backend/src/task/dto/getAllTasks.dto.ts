import { IsEnum, IsOptional, IsUUID } from "class-validator";
import { Status } from "generated/prisma/enums";

export class GetAllTasksDto {
  @IsUUID()
  userId: string;

  @IsOptional()
  @IsEnum(Status)
  status: Status;
}
