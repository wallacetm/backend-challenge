import { MigrationInterface, QueryRunner } from 'typeorm';
import { ConfigService } from '../app/core/config/interfaces';
import { CoreContainer } from '../app/core/containers/inversify.config';
import { TYPES } from '../app/core/containers/types';
import { CONFIG_DATABASE_SCHEMA } from '../constants';

export class initial1615186268511 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const config: ConfigService = CoreContainer.get(TYPES.CONTAINER_MAP_CONFIG_SERVICE);
    const schema = config.get<string>(CONFIG_DATABASE_SCHEMA);
    await queryRunner.query(`CREATE SCHEMA ${schema};`);
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    //Admins
    await queryRunner.query(`
      CREATE TABLE ${schema}.parameters (
        uuid uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" varchar NOT NULL,
        value numeric(10,2) NOT NULL,
        CONSTRAINT "PK_6c35d69855797017008b3fbbae6" PRIMARY KEY (uuid)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const config: ConfigService = CoreContainer.get(TYPES.CONTAINER_MAP_CONFIG_SERVICE);
    const schema = config.get<string>(CONFIG_DATABASE_SCHEMA);
    await queryRunner.query(`DROP TABLE ${schema}.parameters;`);
  }

}

//Copied generated DDL from DBeaver version 7.0.4