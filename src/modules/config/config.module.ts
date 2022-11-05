import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
