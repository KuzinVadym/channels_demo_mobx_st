import {inject} from 'inversify';
import {provide} from 'inversify-binding-decorators';
import amqplib, {Channel, Connection} from 'amqplib';

import {IMessageQueuePublisher} from '../interfaces/IMessageQueuePublisher';
import {API_IDENTIFIER} from '../../../shared/constants/identifiers';
import {ISettings} from '../../../shared/interfaces/ISettings';
import {ILogger} from '../../../shared/interfaces/ILogger';
import {IChannel} from '../../../domains/channels/types';

@provide(API_IDENTIFIER.MESSAGE_QUEUE_PUBLISHER)
export class UrersPublishers implements IMessageQueuePublisher {
    connection: Connection
    ch: Channel

    constructor(@inject('logger') private readonly logger: ILogger,
                @inject('settings') private readonly settings: ISettings) {
        this.init().then(res => {
            logger.info('Message Queue Publisher connected');
        })
    }

    private async init(): Promise<void> {
        this.connection = await amqplib.connect(`amqp://${this.settings.rabbit_mq.host}`)
        this.ch = await this.connection.createChannel();
    }

    public async channelsInfoPublisher(channel: IChannel): Promise<void> {
        try {
            const exchange = 'channels';
            const routingKey = 'info.temp'; // 'info', 'warning', 'error'.

            await this.ch.assertExchange(exchange, 'topic', {
                durable: false
            });

            await this.ch.publish(exchange, routingKey, Buffer.from('Channels data: info'));
        } catch (e) {
            this.logger.warn(e.message);
        }
    }

    public async channelsWarningsPublisher(channel: IChannel): Promise<void> {
        try {
            const exchange = 'channels';
            const routingKey = 'warning.temp'; // 'info', 'warning', 'error'.

            await this.ch.assertExchange(exchange, 'topic', {
                durable: false
            });

            await this.ch.publish(exchange, routingKey, Buffer.from('Channels warnings!'));
        } catch (e) {
            this.logger.warn(e.message);
        }
    }
}
