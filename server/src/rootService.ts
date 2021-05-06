import express, {Express, Router} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {ISettings} from './shared/interfaces/ISettings';
import {ILogger} from './shared/interfaces/ILogger';
import {inject, injectable} from 'inversify';
import {API_IDENTIFIER} from './shared/constants/identifiers';
import {IHttpRoutes} from './shared/interfaces/IHttpRoutes';
import {IMessageQueueSubscriber} from './api/message_queue/interfaces/IMessageQueueSubscriber';

export interface IRootService {
    app: Express;
    setting: ISettings;
    init: () => void;
    listen: () => void;
}

@injectable()
export class RootService implements IRootService {
    app: Express;

    constructor(
        @inject('logger') private readonly logger: ILogger,
        @inject('settings') private readonly settings: ISettings,
        @inject(API_IDENTIFIER.HTTP_ROUTES) private readonly httpRoutes: IHttpRoutes,
        @inject(API_IDENTIFIER.MESSAGE_QUEUE_SUBSCRIBER) private readonly messageQueueSubscriber: IMessageQueueSubscriber){

    }

    init(): void {
        this.logger.info('Init express service');
        this.app = express();

        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
        this.app.use(bodyParser.urlencoded({ extended: true }));

        this.app.use(cors());

        const mainRouter = this.httpRoutes.getMainRoute()
        this.app.use('/api/v1', mainRouter);
    }


    listen(): void {
        this.app.listen(this.settings.port, () => {
            this.logger.info(
                `==> 🌎 Listening on port %s. Open up http://127.0.0.1:${this.settings.port} in your browser.`
            );
        });
    }

    setting: ISettings;

}
