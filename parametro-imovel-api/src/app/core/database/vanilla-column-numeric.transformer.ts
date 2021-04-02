/**
 * Postgres 64 bit numeric convertion to 53 bits. 
 * Risk taker, should use an external lib (https://www.npmjs.com/package/bignumber.js)
 */
export class VanillaColumnNumericTransformer {
  to(data: number): number {
    return data;
  }
  from(data: string): number {
    return parseFloat(data);
  }
}