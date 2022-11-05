import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { AuthUserDto } from './dto/auth-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtTokenService: JwtService,
  ) {}

  public async validateUser(userDto: AuthUserDto) {
    const user = await this.userService.findUserByUsername(userDto.username);
    if (!user) {
      throw new BadRequestException('Invalid credentials.');
    }
    const passwordValid = await bcrypt.compare(userDto.password, user.password);
    if (user && passwordValid) {
      return user;
    }

    return null;
  }

  public async loginUser(user: AuthUserDto) {
    const validUser = await this.validateUser({
      username: user.username,
      password: user.password,
    });
    if (!validUser) {
      throw new BadRequestException('Invalid credentials.');
    }

    const payload = {
      username: validUser.username,
      sub: validUser._id,
    };

    return {
      access_token: this.jwtTokenService.sign(payload),
    };
  }
}
