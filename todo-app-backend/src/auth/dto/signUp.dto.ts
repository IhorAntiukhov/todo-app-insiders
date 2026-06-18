import { IsEmail, IsString, Length, MaxLength } from "class-validator";

export class SignUpDto {
  @IsString()
  @MaxLength(50)
  name: string;

  @IsString()
  @IsEmail()
  @MaxLength(50)
  email: string;

  @IsString()
  @Length(6, 20)
  password: string;
}
