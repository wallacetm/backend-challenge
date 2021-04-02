import { VanillaColumnNumericTransformer } from './vanilla-column-numeric.transformer';

test('should convert number to number', () => {
  //Arrange
  const columTransformer = new VanillaColumnNumericTransformer();
  //Act
  const number = columTransformer.to(10.35);
  //Assert
  expect(number).toEqual(10.35);
});

test('should convert postgres string number representation to number', () => {
  //Arrange
  const columTransformer = new VanillaColumnNumericTransformer();
  //Act
  const number = columTransformer.from('10.55');
  //Assert
  expect(number).toEqual(10.55);
});

