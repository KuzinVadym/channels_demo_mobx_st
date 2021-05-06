import 'reflect-metadata';
import { buildProviderModule } from 'inversify-binding-decorators';
import './repositories/ChannelsRepository';

export const infrastructureModules = buildProviderModule();
