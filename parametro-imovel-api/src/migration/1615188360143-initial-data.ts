import { MigrationInterface, QueryRunner } from 'typeorm';
import { ConfigService } from '../app/core/config/interfaces';
import { CoreContainer } from '../app/core/containers/inversify.config';
import { TYPES } from '../app/core/containers/types';
import { CONFIG_DATABASE_SCHEMA } from '../constants';

export class initialData1615188360143 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const config: ConfigService = CoreContainer.get(TYPES.CONTAINER_MAP_CONFIG_SERVICE);
    const schema = config.get<string>(CONFIG_DATABASE_SCHEMA);
    await queryRunner.query(`
      INSERT INTO ${schema}.parameters (uuid,"name",value) VALUES 
      ('6b100f7e-3460-4a2a-b3af-d171a83f69b5','square_meter',37.55);   
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const config: ConfigService = CoreContainer.get(TYPES.CONTAINER_MAP_CONFIG_SERVICE);
    const schema = config.get<string>(CONFIG_DATABASE_SCHEMA);
    await queryRunner.query(`
      DELETE FROM ${schema}.users
      WHERE uuid='6b100f7e-3460-4a2a-b3af-d171a83f69b5';
    `);
  }

}

//Copied generated INSERT/DELETE SQL from DBeaver version 7.0.4