import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from "express-session"
import * as passport from "passport"
import * as cookieParser from 'cookie-parser';

import * as bodyParser from "body-parser";

async function bootstrap() {
  var cors = require('cors')
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());
  app.use(cookieParser());

  await app.listen(8000);

}
bootstrap();
