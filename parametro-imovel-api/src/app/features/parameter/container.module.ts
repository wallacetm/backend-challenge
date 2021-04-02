import { ContainerModule } from 'inversify';
import { ParameterService } from './interfaces';
import { DefaultParameterService } from './default-parameter.service';
import { TYPES } from '../../core/containers/types';

const ParameterContainerModule: ContainerModule = new ContainerModule((bind) => {
  bind<ParameterService>(TYPES.CONTAINER_DEFAULT_PARAMETER_SERVICE).to(DefaultParameterService);
});

export { ParameterContainerModule };