import { INestApplication, Module } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerModule as NestSwaggerModule,
} from '@nestjs/swagger';

@Module({})
export class SwaggerModule {
  static configure(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('Teslo Shop API Documentation')
      .setDescription(
        'REST API built with PNPM, SWC, NestJS, Fastify, Docker, PostgreSQL and TypeORM',
      )
      .setVersion('1.0')
      .build();
    const document = NestSwaggerModule.createDocument(app, config);
    NestSwaggerModule.setup('api/v1/docs', app, document);
  }
}
