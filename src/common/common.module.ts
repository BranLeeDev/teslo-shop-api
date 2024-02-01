// NestJS modules
import { Module } from '@nestjs/common';

// Module imports
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ConfigModule, DatabaseModule],
})
export class CommonModule {}
