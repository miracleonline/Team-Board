import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  create(user: Partial<User>) {
    return this.userModel.create(user);
  }

  findById(id: string) {
    return this.userModel.findById(id).select('-password');
  }
}