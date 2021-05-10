import 'reflect-metadata';
import { buildProviderModule } from 'inversify-binding-decorators';

import './MessageQueue'

import './subscribers/channels/ChannelsSubscribersFacrory'
import './subscribers'

import './publishers/channels/ChannelsPublisher'
import './publishers'

export const messageQueue = buildProviderModule();
