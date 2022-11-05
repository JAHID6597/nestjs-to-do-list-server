import { ConfigService } from '../../modules/config/config.service';

export class MongoService {
  constructor(private readonly configService: ConfigService) {
    this.configService = new ConfigService();
  }

  public async getMongoConfig() {
    const user = this.configService.get('MONGO_USER');
    const password = this.configService.get('MONGO_PASSWORD');
    const host = this.configService.get('MONGO_HOST');
    const database = this.configService.get('MONGO_DATABASE');
    const mongodb = {
      uri: `mongodb+srv://${user}:${password}@${host}/${database}`,
    };

    return mongodb;
  }
}
