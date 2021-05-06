export type IFirebaseAdminSettings = {
  type: string
  projectId: string
  privateKeyId: string
  privateKey: string
  clientEmail: string
  clientId: string
  authUri: string
  tokenUri: string
  authProviderX509CertUrl: string
  clientC509CertUrl: string
}

export type IConnectionSettings = {
  firebase: IFirebaseAdminSettings;
  url: string
}

export type IRabbitMqSetting = {
  host: string;
  port: string;
}

export interface ISettings {
  port: string;
  rabbit_mq: IRabbitMqSetting
}
