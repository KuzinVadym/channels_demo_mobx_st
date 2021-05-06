import {IResponse} from '../../shared/types/IResponse';


type IQuality = {
    logo_white_84?: string;
    logo_black_42?: string;
    logo_black_84?: string;
    level?: string;
    stream_types?: any[];
    title?: string;
    logo_white_42?: string;
    availability?: string;
    logo_token?: string;
};

export type IChannel = {
    logo_token?: string;
    selected?: boolean;
    display_alias?: string;
    sharing?: boolean;
    is_radio?: boolean;
    title?: string;
    cid?: string;
    group_index?: number;
    recording?: boolean;
    qualities?: IQuality[];
    recommendations?: boolean;
    id: string;
};

export type IGetChannelsPayload = Partial<IChannel>;

export type IChannelsResponse = IResponse<IChannel[]>;
