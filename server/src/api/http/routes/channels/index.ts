import express, {Router} from 'express';

export const channelsRoutes = (channelsService): Router => {
    const router = express.Router();

    router.get('/', async (req, res) => {
        const result = await channelsService.getChannels();
        res.json(result);
    });

    return router;
}
