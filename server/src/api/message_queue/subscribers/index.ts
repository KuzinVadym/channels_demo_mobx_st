import amqplib, {Channel, Connection} from 'amqplib';
import {provide} from 'inversify-binding-decorators';
import {MESSAGE_QUEUE_IDENTIFIER, SERVICE_IDENTIFIER} from '../../../shared/constants/identifiers';
import {inject} from 'inversify';
import {ILogger} from '../../../shared/interfaces/ILogger';
import {ISettings} from '../../../shared/interfaces/ISettings';
import {IMessageQueue} from '../MessageQueue';

export interface ISubscribers {
}

@provide(MESSAGE_QUEUE_IDENTIFIER.SUBSCRIBERS)
export class Subscribers implements ISubscribers {
    connection: Connection
    channel: Channel

    constructor(@inject('logger') private readonly logger: ILogger,
                @inject('settings') private readonly settings: ISettings,
                @inject(MESSAGE_QUEUE_IDENTIFIER.MESSAGE_QUEUE) private messageQueue: IMessageQueue
    ) {
        this.init().then(res => {
            logger.info('Message Queue Subscribers connected');
            this.messageQueue.registerSubscribers(this.channel)
        })
    }

    private async init(): Promise<void> {
        this.logger.info('Init Subscribers connection and channel')
        this.connection = await amqplib.connect(`amqp://${this.settings.rabbit_mq.host}`)
        this.channel = await this.connection.createChannel();
    }
}
