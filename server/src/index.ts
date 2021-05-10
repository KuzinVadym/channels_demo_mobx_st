import "reflect-metadata";
import { settings } from './settings';
import {RootContainer} from './rootContainer';
import pino from 'pino';

const logger = pino();

(async () => {
    try {
        logger.info('Starting HTTP server');

        const rootContainer = new RootContainer(settings, logger)

        rootContainer.init()

        const rootService = rootContainer.getRootService()

        await rootService.init();

        rootService.listen();
    } catch (e) {
        logger.error(e, 'An error occurred while initializing application.');
    }
})();
