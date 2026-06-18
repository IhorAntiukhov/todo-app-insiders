import { IsOptional, IsString, MaxLength } from "class-validator";

export class CreateTaskDto {
  @IsString()
  @MaxLength(50)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(250)
  description: string;
}
