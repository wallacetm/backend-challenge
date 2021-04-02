import { ParameterDTO } from './parameter.dto';
export interface ParameterService {

  get(name: string): Promise<ParameterDTO>;
  getAll(): Promise<ParameterDTO[]>;

}