import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './Schemas/user.schema';
import { Model } from 'mongoose';
import { CreatedUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  CreateUser(CreatedUserDto: CreatedUserDto) {
    const NewUser = new this.userModel(CreatedUserDto);
    return NewUser.save();
  }

  GetUsers() {
    return this.userModel.find();
  }

  GetUsersByID(id: string) {
    return this.userModel.findById(id);
  }
  UpdateUser(id: string, UpdateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, UpdateUserDto, { new: true });
  }
}
