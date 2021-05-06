export const SERVICE_IDENTIFIER = {
    ROOT: Symbol.for('RootService'),
    CHANNELS: Symbol.for('ChannelsHttpService')
};

export const CONTROLLERS_IDENTIFIER = {
    CHANNELS: Symbol.for('ChannelsHttpController')
};

export const API_IDENTIFIER = {
    HTTP_ROUTES: Symbol.for('HttpRoutes'),
    MESSAGE_QUEUE_PUBLISHER: Symbol.for('MessageQueuePublisher'),
    MESSAGE_QUEUE_SUBSCRIBER: Symbol.for('MessageQueueSubscriber'),
};

export const INFRASTRUCTURE_IDENTIFIER = {
    CHANNELS_REPO: Symbol.for('ChannelsRepository'),
}

