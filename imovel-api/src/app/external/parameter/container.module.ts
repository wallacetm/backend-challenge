import { ContainerModule } from 'inversify';
import { ExternalParameterService } from './external-parameter.service';
import { TYPES } from '../../core/containers/types';
import { ParameterService } from './interfaces';

const ParameterContainerModule: ContainerModule = new ContainerModule((bind) => {
  bind<ParameterService>(TYPES.CONTAINER_EXTERNAL_PARAMETER_SERVICE).to(ExternalParameterService);
});

export { ParameterContainerModule };