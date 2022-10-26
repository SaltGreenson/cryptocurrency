import { instance } from './api';
import { ResponseType } from './types-api';

export const marketsApi = {
  async markets() {
    const response = await instance.get<ResponseType>('markets');
    return response.data;
  },
};
