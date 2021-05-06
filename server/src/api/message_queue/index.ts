import 'reflect-metadata';
import { buildProviderModule } from 'inversify-binding-decorators';
import './publishers/MessageQueuePublisher'
import './subscribers/MessageQueueSubscriber'

export const messageQueue = buildProviderModule();
