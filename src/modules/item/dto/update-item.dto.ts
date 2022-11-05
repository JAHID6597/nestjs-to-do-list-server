import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsString } from 'class-validator';
import { ItemStatusENUM } from '../enum/item-status.enum';

export class UpdateItemDTO {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({ enum: ItemStatusENUM })
  @IsEnum(ItemStatusENUM)
  status: ItemStatusENUM;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;

  @ApiResponseProperty()
  updated_by: string;
}
