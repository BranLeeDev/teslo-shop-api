// NestJS modules
import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

// Third-party libraries
import { fastifyHelmet } from '@fastify/helmet';
import { fastifyMultipart } from '@fastify/multipart';

// Config imports
import { SwaggerModule } from './common/modules/swagger/swagger.module';
import { corsOptions } from './common/modules/config/libs/cors.lib';
import { PORT } from '@env/variables.environment';

// Module imports
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.enableCors(corsOptions);
  await app.register(fastifyHelmet, {
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        'img-src': ['self', 'https: data:'],
      },
    },
  });
  app.register(fastifyMultipart);
  app.setGlobalPrefix('api/v1');
  SwaggerModule.configure(app);
  await app.listen(PORT, '0.0.0.0');
}
bootstrap();
