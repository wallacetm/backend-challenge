import { ParameterDTO } from './parameter.dto';
import { ParameterEntity } from './parameter.entity';

export function parameterFromEntities(entities: ParameterEntity[]): ParameterDTO[] {
  return entities.map(entity => entity.toDTO());
}