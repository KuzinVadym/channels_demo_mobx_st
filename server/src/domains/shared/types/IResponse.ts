export interface IResponse<T = null> {
  data?: T | T[];
  error?: Error;
  success?: boolean;
  status?: number;
}
