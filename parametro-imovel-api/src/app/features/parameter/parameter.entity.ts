import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { VanillaColumnNumericTransformer } from '../../core/database/vanilla-column-numeric.transformer';
import { ParameterDTO } from './parameter.dto';

@Entity('parameters')
export class ParameterEntity {
  constructor(partial: Partial<Omit<ParameterEntity, 'toDTO'>> = {}) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('uuid', { name: 'uuid' })
  uuid: string;

  @Column({ name: 'name' })
  name: string;

  @Column('numeric', {
    precision: 10,
    scale: 2,
    transformer: new VanillaColumnNumericTransformer(),
    name: 'value'
  })
  value: number;

  toDTO(): ParameterDTO {
    return new ParameterDTO({
      value: this.value,
      name: this.name
    });
  }

}
