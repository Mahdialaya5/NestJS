import { Body, Controller, Get, HttpCode, HttpException, HttpStatus,Param, ParseIntPipe, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreatedUserDto, LoginUserDto, UpdateUserDto } from './dto';
import { userPipe } from './user.pipe';
import { UserService } from './user.service';
import mongoose from 'mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';

@Controller("user")
export class UserController {

  constructor(private UserServices: UserService) {}
     
    @Post()
    @HttpCode(HttpStatus.CREATED) 
    @UseInterceptors(FileInterceptor('imgsrc',multerOptions))
    CreateUser(@Body() CreatedUserDto: CreatedUserDto,@UploadedFile() file: Express.Multer.File) {
      return this.UserServices.CreateUser(CreatedUserDto,file);
    }

    @Get()
    @HttpCode(HttpStatus.OK) 
    GetUsers() {
      return this.UserServices.GetUsers();
    }

    @Get(":id")
    @HttpCode(HttpStatus.OK) 
    async GetUserById(@Param('id') id: string) {
      const valid = mongoose.Types.ObjectId.isValid(id);
      if (!valid) throw new HttpException("User not found", HttpStatus.NOT_FOUND);
      const user = await this.UserServices.GetUsersByID(id);
      if (!user) throw new HttpException("User not found", HttpStatus.NOT_FOUND);
      return user;
    }

    @Patch(":id")
    @HttpCode(HttpStatus.OK) 
    UpdateUser(@Param('id') id: string, @Body() UpdateUserDto: UpdateUserDto) {
      const valid = mongoose.Types.ObjectId.isValid(id);
      if (!valid) throw new HttpException("Invalid id", HttpStatus.BAD_REQUEST);
      return this.UserServices.UpdateUser(id, UpdateUserDto);
    }
}