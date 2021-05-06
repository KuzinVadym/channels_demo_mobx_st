import {IChannel} from '../../../domains/channels/types';

export interface IMessageQueuePublisher {
    channelsInfoPublisher(channel: IChannel): Promise<void>
    channelsWarningsPublisher(channel: IChannel): Promise<void>
}
