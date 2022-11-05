import { UpdateItemDTO } from './dto/update-item.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ItemService } from './item.service';
import { CreateItemDTO } from './dto/create-item.dto';
import { ItemResponseDTO } from './dto/item-response.dto';
import { Schema as MongooseSchema } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { UpdateResponseDto } from '../shared/dto/update-response.dto';
import { UserPayload } from '../auth/user-payload';
import { DeleteResponseDto } from '../shared/dto/delete-response.dto';
import { ItemsByStatusQueryDto } from './dto/items-by-status-query.dto';
import { ApiGuard } from 'src/decorators/api.guard.decorator';

@ApiTags('List Items APIs')
@ApiGuard()
@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @ApiOkResponse({ type: CreateItemDTO })
  @HttpCode(HttpStatus.CREATED)
  @Post('add')
  async addItem(@Body() body: CreateItemDTO, @CurrentUser() user: UserPayload) {
    return await this.itemService.addItem(body, user);
  }

  @ApiOkResponse({ type: [ItemResponseDTO] })
  @HttpCode(HttpStatus.OK)
  @Get('get-all')
  public getItems(
    @Query() query: ItemsByStatusQueryDto,
    @CurrentUser() user: UserPayload,
  ) {
    return this.itemService.getAllItem(query, user);
  }

  @ApiOkResponse({ type: ItemResponseDTO })
  @HttpCode(HttpStatus.OK)
  @Get('get-by-id/:id')
  async getItemById(
    @Param('id') id: string | MongooseSchema.Types.ObjectId,
    @CurrentUser() user: UserPayload,
  ) {
    const item = this.itemService.getItemById(id, user);
    if (!item) throw new NotFoundException(`No such item exists by _id=${id}`);
    return item;
  }

  @ApiOkResponse({ type: UpdateResponseDto })
  @HttpCode(HttpStatus.OK)
  @Patch('update/:id')
  public async updateItem(
    @Param('id') id: string | MongooseSchema.Types.ObjectId,
    @Body() body: UpdateItemDTO,
    @CurrentUser() user: UserPayload,
  ) {
    return await this.itemService.updateItem(id, body, user);
  }

  @ApiOkResponse({ type: DeleteResponseDto })
  @HttpCode(HttpStatus.OK)
  @Delete('delete/:id')
  public async deleteItem(
    @Param('id') id: string | MongooseSchema.Types.ObjectId,
    @CurrentUser() user: UserPayload,
  ) {
    return await this.itemService.deleteItem(id, user);
  }
}
