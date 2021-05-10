import {Channel, Options, Replies} from 'amqplib';
import {ConsumeMessage} from 'amqplib/properties';
import {IChannel} from '../../../domains/channels/types';

export interface IPublisher {
    init: () => Promise<void>;
    publish: (payload) => Promise<void>;
}

export class Publisher implements IPublisher {
    q: Replies.AssertQueue

    constructor(
        readonly channel: Channel,
        readonly exchange: string,
        readonly exchangeType: string,
        readonly routingKey: string,
        readonly exchangeOptions?: Options.AssertExchange,
        readonly queue?: Replies.AssertQueue,
        readonly queueOptions?: Options.Consume
    ) {}

    public async init(): Promise<void> {
        await this.channel.assertExchange(this.exchange, this.exchangeType, {
            durable: false
        });
    }

    public async publish(payload): Promise<void> {
        await this.channel.publish(this.exchange, this.routingKey, Buffer.from(payload.toString()));
    }

}
