import {provide} from 'inversify-binding-decorators';
import {INFRASTRUCTURE_IDENTIFIER} from '../../shared/constants/identifiers';
import {IChannel} from '../../domains/channels/types';
import channels from './channels.json'
import {injectable} from 'inversify';

export interface IChannelsRepository {
    find(): Promise<IChannel[]>;
}

function eval_level(value) {
    let temp;
    switch (value) {
        case 'uhd':
            temp = 3;
            break;
        case 'hd':
            temp = 2;
            break;
        case 'sd':
            temp = 1;
            break;
        default:
            temp = 0;
    }
    return temp;
}

function comparator(a,b) {
    return eval_level(b.level) - eval_level(a.level);
}

@provide(INFRASTRUCTURE_IDENTIFIER.CHANNELS_REPO)
export class ChannelsRepository implements IChannelsRepository {

    async findById(id: string): Promise<IChannel> {
        return {
            id: '1'
        };
    }
    async findOne(filters?: Partial<IChannel>): Promise<IChannel> {
        return {
            id: '1'
        };
    }

    async find(): Promise<IChannel[]> {
        const prepared_channels = channels.channels.map(item => {
            if (item.qualities.length == 1 && item.qualities[0].availability === 'available') {
                return item;
            } else {
                let available_qualities = item.qualities.filter(item => item.availability === 'available').sort(comparator).slice(0,1);
                if (available_qualities.length > 0) {
                    item.qualities = available_qualities;
                    return item;
                }
            }
        }).filter(item => item != undefined );
        return prepared_channels;
    }

}
