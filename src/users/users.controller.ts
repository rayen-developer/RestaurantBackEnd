import {Body, Controller, Post, Request, UseGuards, Get, Req, Res, Response} from '@nestjs/common';
import { UsersService } from './users.service';
import {AuthService} from "../auth/auth.service";
import * as bcrypt from 'bcrypt';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import {JwtAuthGuard} from "../auth/jwt.auth.guard";


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService,
                private authService: AuthService
                ) {}

    @Post('/signup')
    async addUser(
        @Body('email') userEmail: string,
        @Body('password') userPassword: string,
    ) {

        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(userPassword, saltOrRounds);
        const result = await this.usersService.insertUser(
            userEmail,
            hashedPassword,
        );
        return {
            msg: 'User successfully registered',
            userId: result.id,
            userEmail: result.email,
            userPassword: result.password,
        };
    }
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }



}
