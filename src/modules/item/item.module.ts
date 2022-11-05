import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemEntity, ItemSchema } from './entity/item.entity';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ItemEntity.name, schema: ItemSchema }]),
  ],
  controllers: [ItemController],
  providers: [ItemService],
  exports: [ItemService],
})
export class ItemModule {}
