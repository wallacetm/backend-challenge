import { inject, injectable } from 'inversify';
import { Connection, Repository } from 'typeorm';
import { ParameterService } from './interfaces';
import { ParameterEntity } from './parameter.entity';
import { TYPES } from '../../core/containers/types';
import { parameterFromEntities } from './parameter.helper';
import { ParameterDTO } from './parameter.dto';

@injectable()
export class DefaultParameterService implements ParameterService {

  @inject(TYPES.CONTAINER_DATABASE_CONNECTION) connection: Connection;

  get repository(): Repository<ParameterEntity> {
    return this.connection.getRepository(ParameterEntity);
  }

  async get(name: string): Promise<ParameterDTO> {
    const entity = await this.repository.findOne({
      where: {
        name
      }
    });
    return entity.toDTO();
  }

  async getAll(): Promise<ParameterDTO[]> {
    const entities = await this.repository.find();
    return parameterFromEntities(entities);
  }

}