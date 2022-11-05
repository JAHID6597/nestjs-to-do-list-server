import { ApiResponseProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiResponseProperty()
  _id: string;

  @ApiResponseProperty()
  username: string;

  @ApiResponseProperty()
  firstname: string;

  @ApiResponseProperty()
  lastname: string;

  @ApiResponseProperty()
  createdAt: Date;

  @ApiResponseProperty()
  created_by: string;

  @ApiResponseProperty()
  updatedAt: Date;

  @ApiResponseProperty()
  updated_by: string;

  @ApiResponseProperty()
  isActive: boolean;
}
