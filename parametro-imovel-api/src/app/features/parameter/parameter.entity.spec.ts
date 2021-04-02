import { ParameterEntity } from './parameter.entity';

test('should convert entity to dto', () => {
  //Arrange
  const entity = new ParameterEntity({
    name: 'square_meter',
    value: 37.55,
    uuid: 'xpto'
  });
  //Act
  const dto = entity.toDTO();
  //Assert
  expect(dto.name).toEqual('square_meter');
  expect(dto.value).toEqual(37.55);
  expect(dto).not.toHaveProperty('uuid')
}); 
