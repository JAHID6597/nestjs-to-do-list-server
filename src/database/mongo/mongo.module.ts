import { Module } from '@nestjs/common';
import { MongoService } from './mongo.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [MongoModule],
      inject: [MongoService],
      useFactory: async (mongoService: MongoService) =>
        await mongoService.getMongoConfig(),
    }),
  ],
  controllers: [],
  providers: [MongoService],
  exports: [MongoService],
})
export class MongoModule {}
