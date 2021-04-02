import BigNumber from 'bignumber.js';
import { PropertyDTO } from './property.dto';
test('should convert and DTO to JSON (express use)', () => {
  //Arrange
  const dto = new PropertyDTO({
    meters: new BigNumber(10),
    squareMeterValue: new BigNumber(37.55),
    value: new BigNumber(375.5),
  });
  //Act
  const json = dto.toJSON();
  //Assert
  expect(json.meters).toEqual(10);
  expect(json.squareMeterValue).toEqual(37.55);
  expect(json.value).toEqual(375.5);
});
