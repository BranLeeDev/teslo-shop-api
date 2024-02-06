import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { PORT } from '@env/variables.environment';
import { SwaggerModule } from './common/swagger/swagger.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  SwaggerModule.configure(app);
  await app.listen(PORT, '0.0.0.0');
}
bootstrap();
