import {provide} from "inversify-binding-decorators";
import {CONTROLLERS_IDENTIFIER, SERVICE_IDENTIFIER} from '../../../../shared/constants/identifiers';
import {IService} from '../../../../shared/interfaces/IService';
import {IChannelsResponse} from '../../types';
import {inject} from 'inversify';
import {IChannelsHttpController} from '../../controllers/http/ChannelsHttpController';
import {ConsumeMessage} from 'amqplib/properties';

export interface IChannelsHttpService extends IService{
    getChannels: () => Promise<IChannelsResponse>;
    channelsInfo: (msg: ConsumeMessage) => Promise<void>;
    channelsWarnings: (msg: ConsumeMessage) => Promise<void>;
}

@provide(SERVICE_IDENTIFIER.CHANNELS)
export class ChannelsHttpService implements IChannelsHttpService{

    constructor(
        @inject(CONTROLLERS_IDENTIFIER.CHANNELS) private readonly channelsHttpControllers: IChannelsHttpController
    ) {}

    async getChannels(): Promise<IChannelsResponse> {
        try {
            const result = await this.channelsHttpControllers.getChannels();
            return { data: result, success: true };
        } catch (error) {
            return { error, success: false, status: error.status };
        }
    }

    async channelsInfo(msg): Promise<void> {
        try {
            setTimeout(()=> {
                if (msg !== null) {
                    console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString());
                    // ch.ack(msg);
                }
            }, 1000)
        } catch (error) {
            console.log(error)
        }
    }

    async channelsWarnings(msg): Promise<void> {
        try {
            setTimeout(()=> {
                if (msg !== null) {
                    console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString());
                    // ch.ack(msg);
                }
            }, 1000)
        } catch (error) {
            console.log(error)
        }
    }
}
