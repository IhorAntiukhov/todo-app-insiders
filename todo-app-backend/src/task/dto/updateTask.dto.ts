import { IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateTaskDto {
  @IsString()
  @MaxLength(50)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(250)
  description: string;
}
