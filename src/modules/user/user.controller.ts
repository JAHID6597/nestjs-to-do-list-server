import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Schema as MongooseSchema } from 'mongoose';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { AuthService } from '../auth/auth.service';
import { AuthUserDto } from '../auth/dto/auth-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserPayload } from '../auth/user-payload';
import { DeleteResponseDto } from '../shared/dto/delete-response.dto';
import { UpdateResponseDto } from '../shared/dto/update-response.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UserService } from './user.service';

@ApiTags('User APIs')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @ApiOkResponse({ type: [UserResponseDto] })
  @HttpCode(HttpStatus.OK)
  @Get()
  public getUsers() {
    return this.userService.findUsers();
  }

  @ApiOkResponse({ type: UserResponseDto })
  @HttpCode(HttpStatus.OK)
  @Get('get-by-id/:id')
  public async findUserById(
    @Param('id') id: string | MongooseSchema.Types.ObjectId,
  ) {
    const user = await this.userService.findUserById(id);
    if (!user) throw new NotFoundException(`No such user exists by _id=${id}`);
    return user;
  }

  @ApiOkResponse({ type: UserResponseDto })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Get('get-by-auth')
  public async authUserProfile(@CurrentUser() authUser: UserPayload) {
    return await this.userService.findUserByAuth(authUser);
  }

  @ApiOkResponse({ type: CreateUserDto })
  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  public async createUser(@Body() userDto: CreateUserDto) {
    return await this.userService.createUser(userDto);
  }

  @ApiOkResponse({ type: LoginResponseDto })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  public async loginUser(@Body() body: AuthUserDto) {
    return await this.authService.loginUser(body);
  }

  @ApiOkResponse({ type: UpdateResponseDto })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch('update')
  public async updateUser(
    @Body() body: UpdateUserDto,
    @CurrentUser() user: UserPayload,
  ) {
    return await this.userService.updateUser(body, user);
  }

  @ApiOkResponse({ type: DeleteResponseDto })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete('delete')
  public async deleteUser(@CurrentUser() user: UserPayload) {
    return await this.userService.deleteUser(user);
  }
}
