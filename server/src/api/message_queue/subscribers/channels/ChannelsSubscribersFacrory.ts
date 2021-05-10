import {provide} from 'inversify-binding-decorators';
import {MESSAGE_QUEUE_IDENTIFIER} from '../../../../shared/constants/identifiers';
import {Channel} from 'amqplib';
import {inject} from 'inversify';
import {ILogger} from '../../../../shared/interfaces/ILogger';
import {ISettings} from '../../../../shared/interfaces/ISettings';
import {IMessageQueue} from '../../MessageQueue';
import {Subscriber} from '../Subscriber';

export interface IChannelsSubscribersFactory {
    createSubscriber: (channel: Channel, routingKey: string) => Promise<Subscriber>
}

@provide(MESSAGE_QUEUE_IDENTIFIER.CHANNELS_SUB_FACTORY)
export class ChannelsSubscribersFactory implements IChannelsSubscribersFactory {

    constructor(@inject('logger') private readonly logger: ILogger,
                @inject('settings') private readonly settings: ISettings,
    ) {}

    public async createSubscriber(channel: Channel, routingKey: string): Promise<Subscriber> {
        this.logger.info(`Create Channels Subscriber: ${routingKey}`);
        const subscriber = new Subscriber(channel, 'channels', 'topic', routingKey);
        await subscriber.init();
        return subscriber
    }
}
