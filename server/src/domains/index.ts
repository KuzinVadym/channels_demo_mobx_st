import 'reflect-metadata';
import { buildProviderModule } from 'inversify-binding-decorators';
import './channels/services/http/ChannelsHttpService'
import './channels/controllers/http/ChannelsHttpController'

export const httpServices = buildProviderModule();
