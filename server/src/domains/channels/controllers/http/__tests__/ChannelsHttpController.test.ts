import "reflect-metadata";
import '../ChannelsHttpController'
import {ChannelsHttpController} from '../ChannelsHttpController';
import {IChannelsRepository} from '../../../../../infrastructure/repositories/ChannelsRepository';
import {IMessageQueuePublisher} from '../../../../../api/message_queue/interfaces/IMessageQueuePublisher';
import {IChannel} from '../../../types';

const channels_data = {
    data: [{
        "display_alias": "itv-1-london",
        "sharing": true
    }, {
        "display_alias": "itv-4",
        "sharing": true
    }]
}

const mockFindChannelsFn = jest.fn();

const mockChannelsRepo: IChannelsRepository = {
    find: mockFindChannelsFn
};
const mockChannelsPublisher: IMessageQueuePublisher = {
    channelsInfoPublisher: jest.fn(),
    channelsWarningsPublisher: jest.fn()
};

describe("ChannelsHttpController", () => {

    let controller: ChannelsHttpController;

    beforeEach(async () => {
        controller = new ChannelsHttpController(mockChannelsRepo, mockChannelsPublisher)

        mockFindChannelsFn.mockResolvedValue(channels_data)
    });

    it("Get Channels return right data", async () => {

        const result = await controller.getChannels();

        expect(result).toEqual(channels_data);
    });

});
