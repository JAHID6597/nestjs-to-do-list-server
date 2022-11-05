import * as dotenv from 'dotenv';

export class ConfigService {
  private readonly envConfig: Record<string, string>;

  constructor() {
    const result = dotenv.config();

    if (result.error) {
      this.envConfig = process.env;
    } else {
      this.envConfig = result.parsed;
    }
  }

  public get(key: string): string {
    return this.envConfig[key];
  }

  public async getPortConfig() {
    return this.get('PORT');
  }
}
