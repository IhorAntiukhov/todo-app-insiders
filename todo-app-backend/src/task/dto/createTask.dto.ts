import { IsString, IsUUID, MaxLength } from "class-validator";

export class CreateTaskDto {
  @IsString()
  @MaxLength(50)
  name: string;

  @IsString()
  @MaxLength(250)
  description: string;

  @IsUUID()
  userId: string;
}
