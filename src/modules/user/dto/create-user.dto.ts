import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
