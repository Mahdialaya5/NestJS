import { Body, Controller, Get, HttpCode, HttpStatus,Param, ParseIntPipe, Post } from '@nestjs/common';
import { userDto } from './dto';
import { userPipe } from './user.pipe';
import { UserService } from './user.service';


@Controller("users")
export class userController{

  constructor(private UserServices:UserService ){}
     
    @Get("/all")
    FindUser():String[]{
        return this.UserServices.FindUser()
    }
     
    @Get(":id")
    FindOneUser(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
    id: string):String{
        return this.UserServices.FindOneUser(id)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    AddUser(@Body(userPipe) user:userDto ):String{
        return 'Created'
    }
}