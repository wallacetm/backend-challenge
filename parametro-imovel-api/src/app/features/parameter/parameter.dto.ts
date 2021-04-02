
/**
 * @typedef Parameter
 * @property {number} name Parameter's name
 * @property {number} value Parameter's value
 */

export class ParameterDTO {
  constructor(partial: Partial<ParameterDTO> = {}) {
    Object.assign(this, partial);
  }

  value: number;
  name: string;

}