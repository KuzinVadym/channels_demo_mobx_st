import express, {Router} from 'express';
import {inject} from 'inversify';
import {provide} from 'inversify-binding-decorators';
import {channelsRoutes} from './channels';

import {API_IDENTIFIER, SERVICE_IDENTIFIER} from '../../../shared/constants/identifiers';
import {IHttpRoutes} from '../../../shared/interfaces/IHttpRoutes';
import {IService} from '../../../shared/interfaces/IService';


@provide(API_IDENTIFIER.HTTP_ROUTES)
export class HttpRoutes implements IHttpRoutes {
    router: Router

    constructor(
        @inject(SERVICE_IDENTIFIER.CHANNELS) private channelsService: IService
    ) {
        this.router = express.Router()
        this.router.use('/channels', channelsRoutes(channelsService))
    }

    getMainRoute(): Router{
        return this.router
    }
}
