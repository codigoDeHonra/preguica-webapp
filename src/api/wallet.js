import * as http from './http';

export const sync = (data) => http.get(`/wallet/profile/${data}`);

export const syncCount = (data) => http.get(`/wallet/count/profile/${data}`);

export const insert = (data) => http.post('/wallet', data);

export const remove = (id) => http.del(`/wallet`, id);

export const update = (data) => http.put(`/wallet`, data, data._id);
