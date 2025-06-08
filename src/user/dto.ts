import { IsEmail, IsString, Length } from 'class-validator';

export class userDto{
     
    @IsString()
    @IsEmail({},{message:"Is not email"})
    email:string;
  
    @IsString()
    @Length(6,20,{message:"Should be 6 caracteres for minimum and 20 for maximum"})
    passowrd:string;
    
}