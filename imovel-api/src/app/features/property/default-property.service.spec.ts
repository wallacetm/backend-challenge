/* eslint-disable no-console */
import { DefaultPropertyService } from './default-property.service';
import { ExternalParameterService } from '../../external/parameter/external-parameter.service';
import BigNumber from 'bignumber.js';
import { ParameterDTO } from '../../external/parameter/parameter.dto';
import { LoggerService } from '../../core/logger/interfaces';
import { ConfigService } from '../../core/config/interfaces';

describe('DefaultPropertyService', () => {
  const config = {
    get: jest.fn().mockImplementation(() => {
      return 'square_meter';
    })
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

  test('should calculate property', async () => {
    //Arrange
    const service = new DefaultPropertyService(
      parameterService,
      (config as unknown) as ConfigService,
      (loggerService() as unknown) as LoggerService
    );
    const meters = new BigNumber(255);
    const squareMeterValue = new BigNumber(37.55)
    parameterService.getParameter = jest.fn().mockImplementation(() => {
      return new ParameterDTO({
        value: squareMeterValue.toNumber(),
        name: 'square_meter'
      });
    });
    //Act
    const ret = await service.calculateProperty(meters);
    //Assert
    expect(ret.meters).toEqual(meters);
    expect(ret.squareMeterValue).toEqual(squareMeterValue)
    expect(ret.value).toEqual(new BigNumber(9575.25));
    expect(parameterService.getParameter).toHaveBeenCalled();
  });

  test('should throw error on get squareMeters value on calculate property', async () => {
    //Arrange
    const service = new DefaultPropertyService(
      parameterService,
      (config as unknown) as ConfigService,
      (loggerService() as unknown) as LoggerService
    );
    const meters = new BigNumber(255);
    parameterService.getParameter = jest.fn().mockImplementation(() => {
      throw new Error('Not Found');
    });
    //Act
    let e: any;
    try {
      await service.calculateProperty(meters);
    } catch (error) {
      e = error;
    }
    //Assert
    expect(e.message).toEqual('Not Found');
  });

});

