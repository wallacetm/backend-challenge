import { inject } from 'inversify';
import { BaseHttpController, controller, interfaces, httpGet, queryParam } from 'inversify-express-utils';
import { PropertyService } from './interfaces';
import { TYPES } from '../../core/containers/types';
import BigNumber from 'bignumber.js';
import * as createHttpError from 'http-errors';

@controller('/property')
export class PropertyController extends BaseHttpController {

  constructor(@inject(TYPES.CONTAINER_DEFAULT_PROPERTY_SERVICE) private readonly service: PropertyService) {
    super();
  }

  /**
   * Calculate an property value based on meters
   * 
   * @route GET /property/calculate
   * @group Property
   * @param {string} meters.query.required - Property meters.
   * @returns {Property.model} 200 - Property calculated.
   */
  @httpGet('/calculate')
  public async calculateProperty(@queryParam('meters') meters: string): Promise<interfaces.IHttpActionResult> {
    try {
      if (!meters || +meters === 0) {
        throw createHttpError(400, 'Query param "meters" cannot be empty');
      }
      const metersValue = new BigNumber(meters);
      if (metersValue.lt(10) || metersValue.gt(10000)) {
        throw createHttpError(400, `Meters value (${metersValue}) need to be greater than 10 or less than 10000`);
      }
      return this.ok(await this.service.calculateProperty(metersValue))
    } catch (error) {
      throw error;
    }
  }

}