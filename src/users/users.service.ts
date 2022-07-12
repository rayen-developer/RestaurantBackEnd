import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.model';


@Injectable()
export class UsersService {
    constructor(@InjectModel('user') private readonly userModel: Model<User>) {}
    async insertUser(email: string, password: string) {
        const newUser = new this.userModel({
            email,
            password,
        });
        await newUser.save();
        return newUser;
    }
    async getUser(email: string) {

        return this.userModel.findOne({ email });
    }
}
