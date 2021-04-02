
export class ParameterDTO {
  constructor(partial: Partial<ParameterDTO> = {}) {
    Object.assign(this, partial);
  }

  value: number;
  name: string;

}