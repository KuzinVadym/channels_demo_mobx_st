import {IRootService} from '../../rootService';

export interface IRootContainer {
    init: () => void;
    getRootService: () => IRootService
}
