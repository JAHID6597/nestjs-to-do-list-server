import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { UserPayload } from '../auth/user-payload';
import { DeleteResponseDto } from '../shared/dto/delete-response.dto';
import { UpdateResponseDto } from '../shared/dto/update-response.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: Model<UserEntity>,
  ) {}

  public findUserById(id: string | MongooseSchema.Types.ObjectId) {
    return this.userModel.findById(id).select('-password');
  }

  public async findUserByAuth(authUser: UserPayload) {
    const user = await this.findUserById(authUser.user_id);
    if (!user) throw new NotFoundException(`No such user exists.`);
    return user;
  }

  public findUserByUsername(username: string) {
    return this.userModel.findOne({ username });
  }

  public findUsers() {
    return this.userModel.find().select('-password');
  }

  private generateHashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  public async createUser(userDto: CreateUserDto) {
    userDto.password = await this.generateHashPassword(userDto.password);
    const user = new this.userModel(userDto);

    return await user.save();
  }

  async updateUser(body: UpdateUserDto, authUser: UserPayload) {
    const user = await this.userModel.findById(authUser.user_id);
    if (!user) throw new NotFoundException(`No such user exists.`);

    body.updated_by = authUser.user_id;
    if (body.newPassword) {
      const passwordValid = await bcrypt.compare(
        body.oldPassword,
        user.password,
      );
      if (passwordValid) {
        body.password = await this.generateHashPassword(body.newPassword);
        delete body.newPassword;
        delete body.oldPassword;
      } else {
        throw new BadRequestException('Invalid Password.');
      }
    }
    const updatedUser = await this.userModel.findByIdAndUpdate(
      authUser.user_id,
      body,
    );

    const response = new UpdateResponseDto(authUser.user_id);
    response.is_updated = updatedUser ? true : false;
    response.message = response.is_updated
      ? 'Successfully updated.'
      : 'Update failed.';

    return response;
  }

  async deleteUser(user: UserPayload) {
    const deletedUser = await this.userModel.findByIdAndDelete(user.user_id);

    const deletePostResponse = new DeleteResponseDto();
    deletePostResponse.is_success = deletedUser ? true : false;
    deletePostResponse.message = deletePostResponse.is_success
      ? 'Successfully deleted.'
      : `Not found any user.`;

    return deletePostResponse;
  }
}
