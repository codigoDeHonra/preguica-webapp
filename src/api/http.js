import axios from 'axios';
import vue from 'vue';

axios.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const conf = config;

    if (user) {
        conf.headers.Authorization = `Bearer ${user.token}`;
    }

    return conf;
}, err => Promise.reject(err));


export const get = (path, queryParams = '') => vue.axios.get(`${path}${queryParams}`)
// export const get = (path, queryParams = '') => instance.get(`${path}${queryParams}`)

export const post = (path, data, config) => vue.axios.post(path, data, config)

export const put = (path, bodyFormData, id) => vue.axios.put(`${path}/${id}`, bodyFormData)

export const del = (path, id) => vue.axios.delete(`${path}/${id}`)

export const HTTP = config => axios.create(config);
