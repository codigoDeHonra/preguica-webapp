import * as http from './http';

export const sync = () => http.get('/trades');

export const syncUsers = () => http.get('/user');

export const insert = (data) => http.post('/user', data);

export const login = (data) => http.post('/auth/login', data);

export const remove = (data) => http.del(`/user`, data);

export const update = (data) => http.put(`/user`, data);

export const updateActive = (data) => http.put(`/user/active`, data);
