import {IChannel} from '../../types';
import {provide} from 'inversify-binding-decorators';
import {
    CONTROLLERS_IDENTIFIER,
    INFRASTRUCTURE_IDENTIFIER, MESSAGE_QUEUE_IDENTIFIER
} from '../../../../shared/constants/identifiers';
import {inject} from 'inversify';
import {IChannelsRepository} from '../../../../infrastructure/repositories/ChannelsRepository';
import {IChannelsPublisher} from '../../../../api/message_queue/publishers/channels/ChannelsPublisher';

export interface IChannelsHttpController {
    getChannels(): Promise<IChannel[]>
}


@provide(CONTROLLERS_IDENTIFIER.CHANNELS)
export class ChannelsHttpController implements IChannelsHttpController {

    constructor(
        @inject(INFRASTRUCTURE_IDENTIFIER.CHANNELS_REPO) private readonly channels_repo: IChannelsRepository,
        @inject(MESSAGE_QUEUE_IDENTIFIER.CHANNELS_PUBLISHER) private readonly publisher: IChannelsPublisher,
    ) {}

    async getChannels(): Promise<IChannel[]> {
        const res = await this.channels_repo.find();
        this.publisher.publishChannelsInfo(res[0]);
        this.publisher.publishChannelsWarnings(res[0]);
        return res
    }

}
