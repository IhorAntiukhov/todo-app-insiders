import { IsString, MaxLength } from "class-validator";

export class UpdateTaskDto {
  @IsString()
  @MaxLength(50)
  name: string;

  @IsString()
  @MaxLength(250)
  description: string;
}
