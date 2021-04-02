/* eslint-disable no-console */
import { PropertyController } from './property.controller';
import { DefaultPropertyService } from './default-property.service';
import { ExternalParameterService } from '../../external/parameter/external-parameter.service';
import { ConfigService } from '../../core/config/interfaces';
import { LoggerService } from '../../core/logger/interfaces';
import { PropertyDTO } from './property.dto';
import BigNumber from 'bignumber.js';

describe('PropertyController', () => {
  const config = {
    get: jest.fn()
  };
  const parameterService = new ExternalParameterService((config as unknown) as ConfigService);
  const loggerService = jest.fn().mockImplementation(() => {
    return {
      info: jest.fn().mockImplementation((...args: any[]) => {
        console.log(args);
      }),
      error: jest.fn().mockImplementation((...args: any[]) => {
        console.log(args);
      }),
      warn: jest.fn().mockImplementation((...args: any[]) => {
        console.log(args);
      }),
      debug: jest.fn().mockImplementation((...args: any[]) => {
        console.log(args);
      })
    }
  });

  test('should call calculateProperty', async () => {
    //Arrange
    const service = new DefaultPropertyService(
      parameterService,
      (config as unknown) as ConfigService,
      (loggerService() as unknown) as LoggerService
    );
    const controller = new PropertyController(service)
    service.calculateProperty = jest.fn().mockImplementation(() => {
      return new PropertyDTO({
        meters: new BigNumber(10),
        squareMeterValue: new BigNumber(37.55),
        value: new BigNumber(375.5)
      });
    });
    //Act
    await controller.calculateProperty('10');
    //Assert
    expect(service.calculateProperty).toHaveBeenCalledWith(new BigNumber(10));
  });

  test('should throw error on call calculateProperty with 0 meters', async () => {
    //Arrange
    const service = new DefaultPropertyService(
      parameterService,
      (config as unknown) as ConfigService,
      (loggerService() as unknown) as LoggerService
    );
    const controller = new PropertyController(service)
    service.calculateProperty = jest.fn().mockImplementation(() => {
      return new PropertyDTO({
        meters: new BigNumber(10),
        squareMeterValue: new BigNumber(37.55),
        value: new BigNumber(375.5)
      });
    });
    //Act
    let e: any;
    try {
      await controller.calculateProperty('0');
    } catch (error) {
      e = error;
    }
    //Assert
    expect(e.message).toEqual('Query param "meters" cannot be empty');
    expect(e.statusCode).toEqual(400);
  });

  test('should throw error on call calculateProperty with 5 meters', async () => {
    //Arrange
    const service = new DefaultPropertyService(
      parameterService,
      (config as unknown) as ConfigService,
      (loggerService() as unknown) as LoggerService
    );
    const controller = new PropertyController(service)
    service.calculateProperty = jest.fn().mockImplementation(() => {
      return new PropertyDTO({
        meters: new BigNumber(10),
        squareMeterValue: new BigNumber(37.55),
        value: new BigNumber(375.5)
      });
    });
    //Act
    let e: any;
    try {
      await controller.calculateProperty('5');
    } catch (error) {
      e = error;
    }
    //Assert
    expect(e.message).toEqual('Meters value (5) need to be greater than 10 or less than 10000');
    expect(e.statusCode).toEqual(400);
  });
});


