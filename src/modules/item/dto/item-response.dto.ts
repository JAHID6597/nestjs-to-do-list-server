import { ApiResponseProperty } from '@nestjs/swagger';

export class ItemResponseDTO {
  @ApiResponseProperty()
  _id: string;

  @ApiResponseProperty()
  title: string;

  @ApiResponseProperty()
  description: string;

  @ApiResponseProperty()
  status: string;

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
