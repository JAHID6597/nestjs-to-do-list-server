import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  newPassword: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  oldPassword: string;

  @ApiResponseProperty()
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  firstname: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  lastname: string;

  @ApiResponseProperty()
  updated_by: string;

  @IsNotEmpty()
  is_active: boolean;
}
