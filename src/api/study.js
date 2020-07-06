import * as http from './http';

export const sync = (data) => http.get(`/study/${data.code}`);

export const show = (data) => http.get(`/study/${data.code}`);

export const insert = (data) => http.post('/study', data);

export const remove = (id) => http.del(`/study`, id);

export const update = (data) => http.put(`/study`, data, data._id);
