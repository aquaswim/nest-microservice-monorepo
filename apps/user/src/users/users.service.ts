import { Injectable, Logger } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ForbiddenError, UserAlreadyExistError } from '@app/sharedlib/errors';
import { RegisterUserRespDto } from './dto/register-user-resp.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginRespDto } from './dto/login-resp.dto';

@Injectable()
export class UsersService {
  private readonly l = new Logger(UsersService.name);
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(registerData: RegisterUserDto) {
    // check if email already exists
    const existingUser = await this.userRepository.findOneBy({
      email: registerData.email,
    });
    if (existingUser) {
      throw new UserAlreadyExistError();
    }
    // encrypt password
    const user = this.userRepository.create(registerData);
    this.l.log(`create user ${user.email}`);
    await user.setPassword(registerData.password);
    // save data
    await this.userRepository.save(user);
    return RegisterUserRespDto.fromUserEntity(user);
  }

  findByEmail(email: string) {
    return this.userRepository.findOneByOrFail({ email });
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOneBy({ email: loginDto.email });
    if (!user) {
      this.l.error(`user ${loginDto.email} not found`);
      // compare random string to avoid timing attack
      await User.doCompareRandom();
      throw new ForbiddenError('Invalid email/password combination');
    }

    if (!(await user.comparePassword(loginDto.password))) {
      this.l.error(`invalid password for user ${user.email}`);
      throw new ForbiddenError('Invalid email/password combination');
    }
    // generate token
    const token = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });

    return new LoginRespDto(token);
  }

  async checkAccessToken(token: string) {
    return await this.jwtService.verifyAsync<{
      sub: number;
      email: string;
    }>(token);
  }
}
