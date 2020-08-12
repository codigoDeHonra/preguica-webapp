import * as http from './http';

export const sync = (data) => http.get(`/profile/user/${data}`);

export const count = () => http.get('/profile/count');

export const insert = (data) => http.post('/profile', data);

export const remove = (data) => http.del(`/profile`, data);

export const update = (data) => http.put(`/profile`, data, data._id);

export const insertImportCEI = (data) => http.post(
    '/excel', 
    data, 
    {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
);

