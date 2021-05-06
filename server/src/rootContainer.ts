import { Container} from "inversify";
import {ILogger} from './shared/interfaces/ILogger';
import {IRootService, RootService} from './rootService';
import {ISettings} from './shared/interfaces/ISettings';
import {SERVICE_IDENTIFIER} from './shared/constants/identifiers';
import {IRootContainer} from './shared/interfaces/IRootContainer';
import {httpServices} from './domains';
import {httpRoutes} from './api/http/routes';
import {messageQueue} from './api/message_queue';
import {infrastructureModules} from './infrastructure';



export class RootContainer implements IRootContainer {
    private container: Container;

    constructor(settings, logger) {
        this.container = new Container();
        this.container.bind<ILogger>('logger').toConstantValue(logger);
        this.container.bind<ISettings>('settings').toConstantValue(settings);
    }

    init(): void {
        this.container.load({...httpServices, ...httpRoutes, ...messageQueue, ...infrastructureModules})
        this.container.bind<IRootService>(SERVICE_IDENTIFIER.ROOT).to(RootService)
    }

    getRootService(): IRootService {
        return this.container.get<IRootService>(SERVICE_IDENTIFIER.ROOT);
    }

}
