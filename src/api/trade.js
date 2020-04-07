import * as http from './http';

export const sync = (data) => http.get('/trades', data);

export const count = () => http.get('/trades/count');

export const insert = (data) => http.post('/trade', data);

export const remove = (data) => http.del(`/trade`, data);

export const update = (data) => http.put(`/trade`, data, data._id);


