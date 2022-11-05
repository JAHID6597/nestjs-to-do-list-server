import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'users' })
export class UserEntity extends Document {
  @Prop({ required: true, unique: true, type: String })
  username: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop()
  created_by: string;

  @Prop()
  updated_by: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
