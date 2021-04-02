import { parameterFromEntities } from './parameter.helper';
import { ParameterEntity } from './parameter.entity';
import { ParameterDTO } from './parameter.dto';

test('should convert entity list to dto list', () => {
  //Arrange
  const entities: ParameterEntity[] = [
    new ParameterEntity({
      name: 'square_meter',
      value: 37.55,
      uuid: 'xpto'
    }),
    new ParameterEntity({
      name: 'square_meter2',
      value: 39.32,
      uuid: 'xpto2'
    })
  ];
  const mockToDTO = jest.fn().mockReturnValue(new ParameterDTO());
  entities.forEach(entity => {
    entity.toDTO = mockToDTO;
  });
  //Act
  const ret = parameterFromEntities(entities);
  //Assert
  expect(mockToDTO).toBeCalledTimes(2);
  expect(ret).toHaveLength(2);
});
