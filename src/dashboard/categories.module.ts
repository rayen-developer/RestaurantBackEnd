import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { MongooseModule } from "@nestjs/mongoose";
import {CategorySchema} from "./categories.model";


@Module({
  imports: [MongooseModule.forFeature([{ name: "category", schema: CategorySchema }])],
  providers: [CategoriesService],
  controllers: [CategoriesController],
  exports: [CategoriesService],
})
export class CategoriesModule {}
