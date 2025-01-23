import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignupDto } from '../auth/auth.dto';
import { User, UserSchemaErrorCode } from './users.model';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findOne(email: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ email });
    return user ? user.toObject() : undefined;
  }

  async create(body: SignupDto) {
    try {
      const newUser = new this.userModel(body);
      await newUser.save();
      return newUser.toObject();
    } catch (error) {
      if (error.message.includes(UserSchemaErrorCode.EMAIL_ALREADY_IN_USE)) {
        throw new BadRequestException(UserSchemaErrorCode.EMAIL_ALREADY_IN_USE);
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
