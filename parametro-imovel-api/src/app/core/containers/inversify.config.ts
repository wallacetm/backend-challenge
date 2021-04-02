import { Container } from 'inversify';
import { ParameterContainerModule } from '../../features/parameter/container.module';
import { ConfigContainerModule } from '../config/container.module';
import { DatabaseContainerModule } from '../database/container.module';
import { LoggerContainerModule } from '../logger/container.module';
import { SwaggerContainerModule } from '../swagger/container.module';
import './controllers'; //Load all controllers

const CoreContainer: Container = new Container();

CoreContainer.load(
  ConfigContainerModule,
  LoggerContainerModule,
  SwaggerContainerModule,
  DatabaseContainerModule,
  ParameterContainerModule
);

export { CoreContainer };
