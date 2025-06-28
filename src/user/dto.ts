import { IsEmail, IsOptional, IsString, Length, ValidateIf } from 'class-validator';

export class LoginUserDto{
     
    @IsString()
    @IsEmail({},{message:"Is not email"})
    email:string;
  
    @IsString()
    @Length(6,20,{message:"Should be 6 caracteres for minimum and 20 for maximum"})
    password:string;
    
}

export class CreatedUserDto{
    @IsString()
    @IsEmail({},{message:"Is not email"})
    email:string;
  
    @IsString()
    @Length(6,20,{message:"Should be 6 caracteres for minimum and 20 for maximum"})
    password:string;

    @IsString()
    name:string;
    
    @IsOptional()
    @IsString()
    imgsrc?:string;

}

export class UpdateUserDto{
    @IsOptional()
    @IsString()
    @IsEmail({},{message:"Is not email"})
    email?:string;
  
    @IsOptional()
    @ValidateIf((o) => o.password !== undefined)
    @IsString({ message: "Password must be a string" })
    @Length(6, 20, { message: "Password should be 6 characters minimum and 20 maximum" })
    password?: string;

    @IsOptional()
    @IsString()
    name?:string;
    
    @IsOptional()
    @IsString()
    imgsrc?:string;

}