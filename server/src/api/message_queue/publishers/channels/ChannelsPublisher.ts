import {Channel} from 'amqplib';
import {fluentProvide, provide} from 'inversify-binding-decorators';
import {MESSAGE_QUEUE_IDENTIFIER} from '../../../../shared/constants/identifiers';
import {inject} from 'inversify';
import {ILogger} from '../../../../shared/interfaces/ILogger';
import {ISettings} from '../../../../shared/interfaces/ISettings';
import {IPublisher, Publisher} from '../Publisher';

export interface IChannelsPublisher {
    register: (channel: Channel) => Promise<void>
    publishChannelsInfo: (payload: any) => Promise<void>
    publishChannelsWarnings: (payload: any) => Promise<void>
}

@fluentProvide(MESSAGE_QUEUE_IDENTIFIER.CHANNELS_PUBLISHER).inSingletonScope().done()
export class ChannelsPublisher implements IChannelsPublisher {
    channelsInfoPublisher: IPublisher
    channelsWarningsPublisher: IPublisher

    constructor(@inject('logger') private readonly logger: ILogger,
                @inject('settings') private readonly settings: ISettings) {

    }

    public async register(channel: Channel): Promise<void> {
        this.logger.info('Register Channels Publishers')

        this.channelsInfoPublisher = new Publisher(channel, 'channels', 'topic', 'info.temp');
        await this.channelsInfoPublisher.init();

        this.channelsWarningsPublisher = new Publisher(channel, 'channels', 'topic', 'warning.temp');
        await this.channelsWarningsPublisher.init();
    }

    public async publishChannelsInfo(payload): Promise<void> {
       await this.channelsInfoPublisher.publish(payload);
    }

    public async publishChannelsWarnings(payload): Promise<void> {
        await this.channelsWarningsPublisher.publish(payload);
    }
}
