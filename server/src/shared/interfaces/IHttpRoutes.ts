import { Router } from 'express';

export interface IHttpRoutes {
    getMainRoute: () => Router
}
