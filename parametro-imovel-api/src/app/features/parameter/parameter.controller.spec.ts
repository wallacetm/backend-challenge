import { ParameterController } from './parameter.controller';
import { ParameterService } from './interfaces';
import { ParameterDTO } from './parameter.dto';

class FakeParameterService implements ParameterService {
  public get = jest.fn().mockImplementation(() => {
    return Promise.resolve(new ParameterDTO());
  });
  public getAll = jest.fn().mockImplementation(() => {
    return Promise.resolve([new ParameterDTO()]);
  });
}

test('should call service.get on call get', async () => {
  //Arrange
  const service = new FakeParameterService();
  const controller = new ParameterController(service);
  const name = 'square_meter';
  //Act
  await controller.get(name);
  //Assert
  expect(service.get).toHaveBeenCalledWith(name);
});

test('should call service.get with wrong name and throw error on call get', async () => {
  //Arrange
  const service = new FakeParameterService();
  service.get = jest.fn().mockImplementation(() => {
    throw new Error('Not found');
  });
  const controller = new ParameterController(service);
  const name = 'square_meter';
  //Act
  let e: any;
  try {
    await controller.get(name);
  } catch (error) {
    e = error;
  }
  //Assert
  expect(e.message).toEqual('Parameter not found with name: square_meter');
  expect(e.statusCode).toEqual(404);
  expect(service.get).toHaveBeenCalledWith(name);

});

test('should call service.getAll on call getAll', async () => {
  //Arrange
  const service = new FakeParameterService();
  const controller = new ParameterController(service);
  //Act
  await controller.getAll();
  //Assert
  expect(service.getAll).toHaveBeenCalled();
});

test('should call service.getAll and throw error on call getAll', async () => {
  //Arrange
  const service = new FakeParameterService();
  service.getAll = jest.fn().mockImplementation(() => {
    throw new Error('Something went wrong');
  });
  const controller = new ParameterController(service);
  //Act
  let e: any;
  try {
    await controller.getAll();
  } catch (error) {
    e = error;
  }
  //Assert
  expect(e.message).toEqual('Something went wrong');
  expect(service.getAll).toHaveBeenCalled();
});