import axios from 'axios';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../core/containers/types';
import { ParameterService } from './interfaces';
import { ParameterDTO } from './parameter.dto';
import { ConfigService } from '../../core/config/interfaces';
import { CONFIG_PROPERTY_PARAMETER_URL } from '../../../constants';

@injectable()
export class ExternalParameterService implements ParameterService {

  constructor(@inject(TYPES.CONTAINER_MAP_CONFIG_SERVICE) private readonly config: ConfigService) { }

  private _baseUrl: string;

  get baseUrl(): string {
    if (!this._baseUrl) {
      this._baseUrl = this.config.get<string>(CONFIG_PROPERTY_PARAMETER_URL)
    }
    return this._baseUrl;
  }

  async getParameter(name: string): Promise<ParameterDTO> {
    return axios.get(`${this.baseUrl}/parameter/${name}`).then(ret => ret.data);
  }
}