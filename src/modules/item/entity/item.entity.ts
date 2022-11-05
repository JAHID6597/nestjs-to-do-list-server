import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ItemStatusENUM } from '../enum/item-status.enum';

@Schema({ timestamps: true, collection: 'items' })
export class ItemEntity extends Document {
  @Prop({ required: true, type: String })
  title: string;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ enum: ItemStatusENUM, default: ItemStatusENUM.PENDING })
  status: string;

  @Prop()
  created_by: string;

  @Prop()
  updated_by: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const ItemSchema = SchemaFactory.createForClass(ItemEntity);
