import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { ItemStatusENUM } from '../enum/item-status.enum';

export class ItemsByStatusQueryDto {
  @IsEnum(ItemStatusENUM)
  @ApiProperty({ enum: ItemStatusENUM })
  status_type: ItemStatusENUM;
}
