// NestJS modules
import { Module } from '@nestjs/common';

// Module imports
import { CommonModule } from './common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
