import { inject } from 'inversify';
import { BaseHttpController, controller, interfaces, requestParam, httpGet } from 'inversify-express-utils';
import { ParameterService } from './interfaces';
import { TYPES } from '../../core/containers/types';
import * as createHttpError from 'http-errors';

@controller('/parameter')
export class ParameterController extends BaseHttpController {

  @inject(TYPES.CONTAINER_DEFAULT_PARAMETER_SERVICE) private readonly service: ParameterService;

  /**
   * List all parameters.
   * 
   * @route GET /parameter
   * @group Parameter
   * @returns {Array<Parameter>} 200 - Parameters list.
   */
  @httpGet('')
  public async getAll(): Promise<interfaces.IHttpActionResult> {
    try {
      return this.ok(await this.service.getAll())
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get a parameter by a name.
   *
   * @route GET /parameter/:name
   * @group Parameter
   * @param {string} name.param - Parameter name.
   * @returns {Movie.model} 200 - Parameter.
   * @returns {HttpError.model} 404 - Parameter not found.
   */
  @httpGet('/:name')
  public async get(@requestParam('name') name: string): Promise<interfaces.IHttpActionResult> {
    try {
      return this.ok(await this.service.get(name));
    } catch (error) {
      throw createHttpError(404, `Parameter not found with name: ${name}`);
    }
  }
}