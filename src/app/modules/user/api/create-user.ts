import { httpApi } from '../../../http/http-api.ts';

export const createUser = <T>(name: string): Promise<T> => {
  return httpApi.post<T>('user', { name: name });
};
