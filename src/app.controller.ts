import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import {JwtAuthGuard} from "./auth/jwt.auth.guard";
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
