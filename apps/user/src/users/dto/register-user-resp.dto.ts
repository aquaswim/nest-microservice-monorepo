import { User } from '../entities/user.entity';
import { Expose, plainToClass } from 'class-transformer';

export class RegisterUserRespDto {
  static fromUserEntity(user: User) {
    return plainToClass(RegisterUserRespDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Expose()
  email: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;
}
