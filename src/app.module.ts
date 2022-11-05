import { Module } from '@nestjs/common';
import { MongoModule } from './database/mongo/mongo.module';
import { ItemModule } from './modules/item/item.module';
import { ConfigModule } from './modules/config/config.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [ConfigModule, MongoModule, UserModule, ItemModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
