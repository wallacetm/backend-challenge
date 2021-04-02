import { ContainerModule } from 'inversify';
import { PropertyService } from './interfaces';
import { DefaultPropertyService } from './default-property.service';
import { TYPES } from '../../core/containers/types';

const PropertyContainerModule: ContainerModule = new ContainerModule((bind) => {
  bind<PropertyService>(TYPES.CONTAINER_DEFAULT_PROPERTY_SERVICE).to(DefaultPropertyService);
});

export { PropertyContainerModule };