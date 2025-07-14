import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../Schemas/user.schema';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';


@Module({
    imports:[MongooseModule.forFeature([{
        name:User.name,
        schema:UserSchema}]),
        MulterModule.register(multerOptions),
    ],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}