import {IChannel} from '../../types';
import {provide} from 'inversify-binding-decorators';
import {
    API_IDENTIFIER,
    CONTROLLERS_IDENTIFIER,
    INFRASTRUCTURE_IDENTIFIER
} from '../../../../shared/constants/identifiers';
import {inject, injectable} from 'inversify';
import {IChannelsRepository} from '../../../../infrastructure/repositories/ChannelsRepository';
import {IMessageQueuePublisher} from '../../../../api/message_queue/interfaces/IMessageQueuePublisher';

export interface IChannelsHttpController {
    getChannels(): Promise<IChannel[]>
}


@provide(CONTROLLERS_IDENTIFIER.CHANNELS)
export class ChannelsHttpController implements IChannelsHttpController {

    constructor(
        @inject(INFRASTRUCTURE_IDENTIFIER.CHANNELS_REPO) private readonly channels_repo: IChannelsRepository,
        @inject(API_IDENTIFIER.MESSAGE_QUEUE_PUBLISHER) private readonly publisher: IMessageQueuePublisher,
    ) {}

    async getChannels(): Promise<IChannel[]> {
        const res = await this.channels_repo.find();
        this.publisher.channelsInfoPublisher(res[0]);
        this.publisher.channelsWarningsPublisher(res[0]);
        return res
    }

}
