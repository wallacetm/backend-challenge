import { Connection } from 'typeorm';
import { DefaultParameterService } from './default-parameter.service';
import { ParameterEntity } from './parameter.entity';

describe('Service test suite', () => {
  const findOneOrFail: jest.Mock = jest.fn().mockImplementation(() => {
    return new ParameterEntity({
      name: 'square_meter',
      uuid: 'abacate',
      value: 37.55
    });
  });
  const find: jest.Mock = jest.fn().mockImplementation(() => {
    return [
      new ParameterEntity({
        name: 'square_meter',
        uuid: 'abacate',
        value: 37.55
      }),
      new ParameterEntity({
        name: 'square_meter2',
        uuid: 'abacate1',
        value: 33.55
      })
    ];
  });
  const connection: jest.Mock<{ getRepository: jest.Mock<{ findOneOrFail: jest.Mock, find: jest.Mock }> }> = jest.fn().mockImplementation(() => {
    return {
      getRepository: jest.fn().mockImplementation(() => {
        return {
          findOneOrFail,
          find
        }
      })
    }
  });

  test('should call get with an name and return one dto', async () => {
    //Arrange
    findOneOrFail.mockClear();
    const service = new DefaultParameterService((connection() as unknown) as Connection);
    const name = 'square_meter';
    //Act
    const ret = await service.get(name);
    //Assert
    expect(ret.name).toEqual(name);
    expect(findOneOrFail).toHaveBeenCalledWith({
      where: {
        name
      }
    });
  });

  test('should call getAll and return list dto', async () => {
    //Arrange
    find.mockClear();
    const service = new DefaultParameterService((connection() as unknown) as Connection);
    //Act
    const ret = await service.getAll();
    //Assert
    expect(ret).toHaveLength(2);
    expect(find).toHaveBeenCalled();
  });
});

