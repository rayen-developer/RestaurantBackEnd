import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}
    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.getUser(email);
        if (!user) {
            throw new NotAcceptableException('could not find the user');
        }
        const passwordValid = await bcrypt.compare(password, user.password)
        if (user && passwordValid) {
            return {
                userId: user.id,
                userEmail: user.email
            };
        }
        return null;
    }

    async login(user: any) {
        console.log(user);
        const payload = { email: user.userEmail, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload,
                {secret: "rayen", expiresIn: '3600s'})};
    }

}
