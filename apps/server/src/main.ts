/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { ValidationPipe, Logger as NestLogger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import helmet from 'helmet';
// import session from 'express-session';
// import passport from 'passport';
import cookieParser from 'cookie-parser';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));
  // for logging http errors with proper message and stack trace
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.use(helmet());
  app.use(cookieParser(process.env.SESSION_SECRET));

  // app.use(
  //   session({
  //     secret: process.env.SESSION_SECRET as string,
  //     resave: false,
  //     saveUninitialized: false,
  //     // TODO: enable store
  //     // store:
  //     //   process.env.NODE_ENV === 'production'
  //     //     ? new MongoDBStore({
  //     //       uri: 'mongodb://127.0.0.1:27017/connect_mongodb_session_test',
  //     //       collection: 'mySessions'
  //     //     })
  //     //     : new session.MemoryStore(),
  //     cookie: {
  //       httpOnly: true,
  //       signed: true,
  //       // sameSite: 'strict',
  //       // TODO: enable secure based on NODE_ENV
  //       // secure: process.env.NODE_ENV === 'production',
  //       secure: false,
  //     },
  //   })
  // );

  // app.use(passport.initialize());
  // app.use(passport.session());

  app.enableCors({
    origin: true,
    credentials: true,
    exposedHeaders: ['Authorization'],
  });

  // for adding validation pipe globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  NestLogger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
