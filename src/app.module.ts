import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from "./users/users.module";
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './dashboard/categories.module';
import {ItemsModule} from "./dashboard/items.module";
import {JwtService} from "@nestjs/jwt";


@Module({
  imports: [
    MongooseModule.forRoot(
        "mongodb+srv://rayen:rayen@menu-project.o4xtk.mongodb.net/?retryWrites=true&w=majority"
    ),
    UsersModule,
    AuthModule,
    CategoriesModule,
    ItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService,JwtService],
})
export class AppModule {}
