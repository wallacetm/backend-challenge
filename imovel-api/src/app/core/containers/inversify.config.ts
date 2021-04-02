import { Container } from 'inversify';
import { ParameterContainerModule } from '../../external/parameter/container.module';
import { PropertyContainerModule } from '../../features/property/container.module';
import { ConfigContainerModule } from '../config/container.module';
import { LoggerContainerModule } from '../logger/container.module';
import { SwaggerContainerModule } from '../swagger/container.module';
import './controllers'; //Load all controllers

const CoreContainer: Container = new Container();

CoreContainer.load(
  ConfigContainerModule,
  LoggerContainerModule,
  SwaggerContainerModule,
  PropertyContainerModule,
  ParameterContainerModule
);

export { CoreContainer };
