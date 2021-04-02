import BigNumber from 'bignumber.js';

/**
 * @typedef Property
 * @property {number} meters Property meters
 * @property {number} squareMeterValue Property square meters value
 * @property {number} value Property value
 */


export class PropertyDTO {
  constructor(partial: Partial<Omit<PropertyDTO, 'toJSON'>> = {}) {
    Object.assign(this, partial);
  }

  meters: BigNumber;
  squareMeterValue: BigNumber;
  value: BigNumber;

  toJSON(): { [key in keyof Omit<PropertyDTO, 'toJSON'>]: number } {
    return {
      meters: this.meters.toNumber(),
      squareMeterValue: this.squareMeterValue.toNumber(),
      value: this.value.toNumber()
    }
  }

}