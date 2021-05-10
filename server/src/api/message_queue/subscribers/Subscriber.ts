import {Channel, Options, Replies} from 'amqplib';
import {ConsumeMessage} from 'amqplib/properties';

export interface ISubscriber {

}

export class Subscriber implements ISubscriber {
    q: Replies.AssertQueue

    constructor(
        readonly channel: Channel,
        readonly exchange: string,
        readonly topic: string,
        readonly routingKey: string,
        readonly exchangeOptions?: Options.AssertExchange,
        readonly queue?: Replies.AssertQueue,
        readonly queueOptions?: Options.Consume
    ) {}

    public async init(): Promise<void> {
        await this.channel.assertExchange(this.exchange, this.topic, {
            durable: false
        });

        this.q = this.queue || await this.channel.assertQueue('', this.exchangeOptions);

        await this.channel.bindQueue(this.q.queue, this.exchange, this.routingKey)
    }

    public async start(handler: (msg: ConsumeMessage | null) => void, prefetchStatus?): Promise<void> {
        if(prefetchStatus) {
            await this.channel.prefetch(1);
        }

        await this.channel.consume(this.q.queue, handler, this.queueOptions);
    }

}
