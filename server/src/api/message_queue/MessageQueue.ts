import {provide} from 'inversify-binding-decorators';
import {MESSAGE_QUEUE_IDENTIFIER, SERVICE_IDENTIFIER} from '../../shared/constants/identifiers';
import {Channel} from 'amqplib';
import {inject} from 'inversify';
import {ILogger} from '../../shared/interfaces/ILogger';
import {ISettings} from '../../shared/interfaces/ISettings';
import {IChannelsHttpService} from '../../domains/channels/services/http/ChannelsHttpService';
import {IChannelsSubscribersFactory} from './subscribers/channels/ChannelsSubscribersFacrory';
import {IChannelsPublisher} from './publishers/channels/ChannelsPublisher';

export interface IMessageQueue {
    registerSubscribers: (channel: Channel) => Promise<void>
    registerPublishers: (channel: Channel) => Promise<void>
}

@provide(MESSAGE_QUEUE_IDENTIFIER.MESSAGE_QUEUE)
export class MessageQueue implements IMessageQueue {


    constructor(@inject('logger') private readonly logger: ILogger,
                @inject('settings') private readonly settings: ISettings,
                @inject(MESSAGE_QUEUE_IDENTIFIER.CHANNELS_SUB_FACTORY) private channelsSubscribersFactory: IChannelsSubscribersFactory,
                @inject(MESSAGE_QUEUE_IDENTIFIER.CHANNELS_PUBLISHER) private channelsPublishers: IChannelsPublisher,
                @inject(SERVICE_IDENTIFIER.CHANNELS) private channelsService: IChannelsHttpService,
                ) {
    }

    public async registerSubscribers(channel): Promise<void> {
        this.logger.info('Register Subscribers');

        const channelsInfoSubscriber = await this.channelsSubscribersFactory.createSubscriber(channel, 'info.*');
        await channelsInfoSubscriber.start(this.channelsService.channelsInfo, true);

        const channelsWarningsSubscriber = await this.channelsSubscribersFactory.createSubscriber(channel, 'warning.temp');
        await channelsWarningsSubscriber.start(this.channelsService.channelsInfo, true);
    }

    public async registerPublishers(channel): Promise<void> {
        this.logger.info('Register Publishers');
        await this.channelsPublishers.register(channel);
    }
}
