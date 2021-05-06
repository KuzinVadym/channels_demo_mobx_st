import 'reflect-metadata';
import { buildProviderModule } from 'inversify-binding-decorators';
import './HttpRoutes'

export const httpRoutes = buildProviderModule();
