import BigNumber from 'bignumber.js';
import { PropertyDTO } from './property.dto';

export interface PropertyService {

  calculateProperty(meters: BigNumber): Promise<PropertyDTO>;

}