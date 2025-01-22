/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app/app.module';
import helmet from '@fastify/helmet';
import fastifyCookie from '@fastify/cookie';
import fastifySession from '@fastify/session';
import fastifyPassport from '@fastify/passport';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true })
  );
  await app.register(helmet);
  app.enableCors({
    origin: true,
    credentials: true,
  });

  await app.register(fastifyCookie);
  await app.register(fastifySession, {
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    cookie: {
      secure: false, // TODO: change to true in production
      httpOnly: true,
      maxAge: parseInt(process.env.SESSION_COOKIE_MAX_AGE),
    },
  });
  await app.register(fastifyPassport.initialize());
  await app.register(fastifyPassport.secureSession());

  fastifyPassport.registerUserSerializer(async (user) => {
    return user;
  });

  fastifyPassport.registerUserDeserializer(async (user) => {
    return user;
  });

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
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
