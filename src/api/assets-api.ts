import { instance } from './api';
import { ResponseType } from './types-api';

export enum IntervalEnum {
    m1='m1',
    m5='m5',
    m15='m15',
    m30='m30',
    h1='h1',
    h2='h2',
    h6='h6',
    h12='h12',
    d1='d1'
}

export const assetsApi = {
  async assets(offset: number, limit: number): Promise<ResponseType> {
    const response = await instance.get<ResponseType>(`assets?offset=${offset}&limit=${limit}`);
    return response.data;
  },
  async assetsById(id: string): Promise<ResponseType> {
    const response = await instance.get<ResponseType>(`assets/${id}`);
    return response.data;
  },
  async assetsHistoryById(id: string, interval: IntervalEnum): Promise<ResponseType> {
    const response = await instance.get<ResponseType>(`assets/${id}/history?interval=${interval}`);
    return response.data;
  },
  async assetsMarketsById(id:string, limit = 10): Promise<ResponseType> {
    const response = await instance.get<ResponseType>(`assets/${id}/markets?limit=${limit}`);
    return response.data;
  },
};
