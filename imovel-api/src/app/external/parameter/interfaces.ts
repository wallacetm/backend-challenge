import { ParameterDTO } from './parameter.dto';

export interface ParameterService {
  getParameter(name: string): Promise<ParameterDTO>;
}