import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { UserPayload } from '../auth/user-payload';
import { DeleteResponseDto } from '../shared/dto/delete-response.dto';
import { UpdateResponseDto } from '../shared/dto/update-response.dto';
import { CreateItemDTO } from './dto/create-item.dto';
import { UpdateItemDTO } from './dto/update-item.dto';
import { ItemEntity } from './entity/item.entity';
import { ItemsByStatusQueryDto } from './dto/items-by-status-query.dto';

@Injectable()
export class ItemService {
  constructor(
    @InjectModel(ItemEntity.name)
    private readonly itemModel: Model<ItemEntity>,
  ) {}

  public async addItem(body: CreateItemDTO, user: UserPayload) {
    body.created_by = user.user_id;
    const item = new this.itemModel(body);

    return await item.save();
  }

  public getAllItem(query: ItemsByStatusQueryDto, user: UserPayload) {
    return this.itemModel.find({
      status: query.status_type,
      created_by: user.user_id,
    });
  }

  public getItemById(
    id: string | MongooseSchema.Types.ObjectId,
    user: UserPayload,
  ) {
    return this.itemModel.findOne({ _id: id, created_by: user.user_id });
  }

  public async updateItem(
    id: string | MongooseSchema.Types.ObjectId,
    body: UpdateItemDTO,
    user: UserPayload,
  ) {
    body.updated_by = user.user_id;
    const updatedItem = await this.itemModel.findOneAndUpdate(
      { _id: id, created_by: user.user_id },
      body,
    );

    const response = new UpdateResponseDto(id.toString());
    response.is_updated = updatedItem ? true : false;
    response.message = response.is_updated
      ? 'Successfully updated.'
      : 'Update failed.';

    return response;
  }

  async deleteItem(
    id: string | MongooseSchema.Types.ObjectId,
    user: UserPayload,
  ) {
    const deletedItem = await this.itemModel.findOneAndDelete({
      _id: id,
      created_by: user.user_id,
    });

    const deletePostResponse = new DeleteResponseDto();
    deletePostResponse.is_success = deletedItem ? true : false;
    deletePostResponse.message = deletePostResponse.is_success
      ? 'Successfully deleted.'
      : `Not found any item with this _id="${id}".`;

    return deletePostResponse;
  }
}
