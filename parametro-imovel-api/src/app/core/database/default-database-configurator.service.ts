import { inject, injectable } from 'inversify';
import { Connection, ConnectionOptions, createConnection, getConnection } from 'typeorm';
import { CONFIG_APPLICATION_BASEDIR, CONFIG_DATABASE_HOST, CONFIG_DATABASE_PASS, CONFIG_DATABASE_PORT, CONFIG_DATABASE_USER, CONFIG_DATABASE_NAME, CONFIG_DATABASE_LOGGING, CONFIG_DATABASE_SCHEMA, CONFIG_DATABASE_URL } from '../../../constants';
import { ConfigService } from '../config/interfaces';
import { TYPES } from '../containers/types';
import { LoggerService } from '../logger/interfaces';
import { DatabaseConfiguratorService } from './interfaces';

@injectable()
export class DefaultDatabaseConfiguratorService implements DatabaseConfiguratorService {
  @inject(TYPES.CONTAINER_MAP_CONFIG_SERVICE) private readonly config: ConfigService;
  @inject(TYPES.CONTAINER_CONSOLE_LOGGER_SERVICE) private readonly logger: LoggerService;

  async configure(): Promise<void> {
    try {
      const connectionOptions: ConnectionOptions = {
        host: this.config.get<string>(CONFIG_DATABASE_HOST),
        port: +this.config.get<number>(CONFIG_DATABASE_PORT),
        username: this.config.get<string>(CONFIG_DATABASE_USER),
        password: this.config.get<string>(CONFIG_DATABASE_PASS),
        database: this.config.get<string>(CONFIG_DATABASE_NAME),
        type: 'postgres',
        synchronize: false,
        logging: this.config.get<boolean>(CONFIG_DATABASE_LOGGING, false),
        url: this.config.get<string>(CONFIG_DATABASE_URL),
        ssl: {
          rejectUnauthorized: false,
        }
      };
      const migrationConnection = await createConnection({
        ...connectionOptions,
        name: 'migrations',
        migrations: [`${this.config.get(CONFIG_APPLICATION_BASEDIR)}/migration/*{.ts,.js}`],
        migrationsTransactionMode: 'all'
      });

      if (!migrationConnection.isConnected) {
        migrationConnection.connect();
      }

      await migrationConnection.runMigrations();
      this.logger.info('Base migration run successfully');

      const defaultConnection = await createConnection({
        name: 'default',
        ...connectionOptions,
        schema: this.config.get<string>(CONFIG_DATABASE_SCHEMA),
        entities: [`${this.config.get(CONFIG_APPLICATION_BASEDIR)}/**/*.entity{.ts,.js}`],
      });

      defaultConnection.entityMetadatas.forEach(entity => {
        this.logger.info(`Mapped entity'${entity.name}'`);
      });
    } catch (error) {
      this.logger.error('Error connecting to database', error);
      throw error;
    }
  }

  static getConnection(): Connection {
    return getConnection('default');
  }
}
