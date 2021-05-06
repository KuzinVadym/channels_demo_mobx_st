import {inject} from 'inversify';
import {provide} from 'inversify-binding-decorators';
import amqplib, {Connection} from 'amqplib';

import {API_IDENTIFIER, SERVICE_IDENTIFIER} from '../../../shared/constants/identifiers';
import {ISettings} from '../../../shared/interfaces/ISettings';
import {IMessageQueueSubscriber} from '../interfaces/IMessageQueueSubscriber';
import {ILogger} from '../../../shared/interfaces/ILogger';
import {IChannelsHttpService} from '../../../domains/channels/services/http/ChannelsHttpService';

@provide(API_IDENTIFIER.MESSAGE_QUEUE_SUBSCRIBER)
export class ChannelsSubscribers implements IMessageQueueSubscriber {
    connection: Connection

    constructor(@inject('logger') private readonly logger: ILogger,
                @inject('settings') private readonly settings: ISettings,
                @inject(SERVICE_IDENTIFIER.CHANNELS) private channelsService: IChannelsHttpService
                ) {
        this.init().then(res => {
            logger.info('Message Queue Subscriber connected');
        })
    }

    private async init(): Promise<void> {
        this.connection = await amqplib.connect(`amqp://${this.settings.rabbit_mq.host}`)
        const ch = await this.connection.createChannel();

        await this.registerChannelsInfoSubscriber(ch, this.channelsService.channelsInfo);
        await this.registerChannelsWarningsSubscriber(ch, this.channelsService.channelsWarnings);
    }

    private async registerChannelsInfoSubscriber(ch, handler) {
        const exchange_topic = 'channels';
        const topicRoutingKey = 'info.*';

        await ch.assertExchange(exchange_topic, 'topic', {
            durable: false
        });

        const q1 = await ch.assertQueue('', {
            exclusive: true
        });

        await ch.bindQueue(q1.queue, exchange_topic, topicRoutingKey)

        await ch.prefetch(1);
        await ch.consume(q1.queue, handler, {
            noAck: true
        });
    }

    private async registerChannelsWarningsSubscriber(ch, handler) {
        const exchange_direct = 'channels';
        const directRoutingKey = 'warning.temp';

        await ch.assertExchange(exchange_direct, 'topic', {
            durable: false
        });

        const q2 = await ch.assertQueue('', {
            exclusive: true
        });

        await ch.bindQueue(q2.queue, exchange_direct, directRoutingKey)

        await ch.consume(q2.queue, handler, {
            noAck: true
        });
    }

}
