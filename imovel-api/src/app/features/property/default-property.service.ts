import { inject, injectable } from 'inversify';
import { PropertyService } from './interfaces';
import { PropertyDTO } from './property.dto';
import { TYPES } from '../../core/containers/types';
import { ParameterService } from '../../external/parameter/interfaces';
import { ConfigService } from '../../core/config/interfaces';
import { CONFIG_PROPERTY_PARAMETER_SQUARE_METER, DEFAULTS_SQUARE_METER } from '../../../constants';
import { LoggerService } from '../../core/logger/interfaces';
import BigNumber from 'bignumber.js';

@injectable()
export class DefaultPropertyService implements PropertyService {

  private readonly parameterSquareMeterName;

  constructor(
    @inject(TYPES.CONTAINER_EXTERNAL_PARAMETER_SERVICE) private readonly parameterService: ParameterService,
    @inject(TYPES.CONTAINER_MAP_CONFIG_SERVICE) private readonly config: ConfigService,
    @inject(TYPES.CONTAINER_CONSOLE_LOGGER_SERVICE) private readonly logger: LoggerService
  ) {
    this.parameterSquareMeterName = this.config.get<string>(CONFIG_PROPERTY_PARAMETER_SQUARE_METER, DEFAULTS_SQUARE_METER);
  }

  async calculateProperty(meters: BigNumber): Promise<PropertyDTO> {
    const squareMeterValue = await this.getSquareMeterValue();
    const value = meters.times(squareMeterValue);
    return new PropertyDTO({
      meters,
      value,
      squareMeterValue
    })
  }

  private async getSquareMeterValue(): Promise<BigNumber> {
    try {
      const squareMeterParameter = await this.parameterService.getParameter(this.parameterSquareMeterName);
      return new BigNumber(squareMeterParameter.value);
    } catch (error) {
      this.logger.error(`Error getting parameter with name: ${this.parameterSquareMeterName}`, error);
      throw error;
    }
  }

}