import * as types from './types';
import vue from 'vue';

export const state = {
    usuario: {},
    users: [],
};

export const mutations = {
    [types.SET_USUARIO](state, params) {
        state.usuario = params
        localStorage.setItem('user', JSON.stringify(params));
    },
    [types.INSERT_USUARIO]() {
        // state.usuario = params
    },
    [types.REMOVE_USUARIO](state) {
        state.usuario = {}
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    },
    [types.REMOVE_USER_LIST](state, params) {
        console.log(params)
        vue.delete(state.users, params.index)
    },
    [types.SET_USUARIO_LOGIN](state, params) {
        state.usuario = params
        localStorage.setItem('user', JSON.stringify(params));
    },
    [types.SYNC_USUARIO](state) {
        state.usuario = JSON.parse(localStorage.getItem('user'));
    },
    [types.SYNC_USERS](state, params) {
        state.users = params;
    },
};
