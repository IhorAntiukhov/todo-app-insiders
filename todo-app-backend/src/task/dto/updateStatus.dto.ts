import { IsEnum } from "class-validator";
import { Status } from "generated/prisma/enums";

export class UpdateStatusDto {
  @IsEnum(Status)
  status: Status;
}
