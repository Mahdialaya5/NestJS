import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../Schemas/user.schema';
import { Model } from 'mongoose';
import { CreatedUserDto, UpdateUserDto } from './dto';
import bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async CreateUser(CreatedUserDto: CreatedUserDto, file: Express.Multer.File) {
    const existingUser = await this.userModel.findOne({ email: CreatedUserDto.email });

    if (existingUser) {
      throw new ConflictException('Email exists, Please login');
    }

    const hashedPassword = await bcrypt.hash(CreatedUserDto.password, 10)

    const filePathOrUrl = file ? file.path : null; 

    const NewUser = new this.userModel({
      ...CreatedUserDto,
      password:hashedPassword,
      imgsrc: filePathOrUrl, 
    });
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
