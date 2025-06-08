import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {


    FindUser():String[]{
        return ['a','b','c']
    }
    FindOneUser(id:String):String{
        return 'a'
    }
}
