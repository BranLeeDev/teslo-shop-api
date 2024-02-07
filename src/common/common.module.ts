// NestJS modules
import { Module } from '@nestjs/common';

// Module imports
import { ConfigModule } from './modules/config/config.module';
import { DatabaseModule } from './modules/database/database.module';
import { SwaggerModule } from './modules/swagger/swagger.module';

@Module({
  imports: [ConfigModule, DatabaseModule, SwaggerModule],
})
export class CommonModule {}
