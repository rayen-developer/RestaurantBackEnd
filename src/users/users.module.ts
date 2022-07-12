import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose"
import { UserSchema } from "./users.model"
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {AuthService} from "../auth/auth.service";
import {JwtService} from "@nestjs/jwt";

@Module({
  imports: [MongooseModule.forFeature([{ name: "user", schema: UserSchema }])],
  providers: [UsersService,AuthService,JwtService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
