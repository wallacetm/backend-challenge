import { ConfigService } from '../../core/config/interfaces';
import { ExternalParameterService } from './external-parameter.service';
import { MapConfigService } from '../../core/config/map-config.service';
import { mocked } from 'ts-jest/utils';
import axios from 'axios';
import { ParameterDTO } from './parameter.dto';

jest.mock('axios');


test('should call axios get on parameter external api', async () => {
  //Arrange
  const baseUrl = 'base_url';
  const name = 'square_meter';
  const config: ConfigService = new MapConfigService();
  config.get = jest.fn().mockImplementation(() => {
    return baseUrl;
  });
  const axiosMock = mocked(axios);
  axiosMock.get = jest.fn().mockImplementation(() => {
    return new ParameterDTO({
      name,
      value: 37.55
    });
  });
  const service = new ExternalParameterService(config);
  //Act
  const ret = await service.getParameter(name);
  //Assert
  expect(ret.name).toEqual(name);
  expect(ret.value).toEqual(37.55);
  expect(axiosMock.get).toHaveBeenCalledWith(`${baseUrl}/parameter/${name}`);
});
