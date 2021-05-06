import { config } from 'dotenv';
import {ISettings} from './shared/interfaces/ISettings';

const env: any = config().parsed;
const values = process.env.NODE_ENV === 'production' ? { ...env } : {};

// here actually we need to define also config for dev and test db
const settings: ISettings = {
  port: values.PORT || process.env.PORT || 3001,
  rabbit_mq: {
    host: 'localhost',
    port: '15672'
  }
};

export { settings };
