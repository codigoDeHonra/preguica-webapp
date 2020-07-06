import * as types from './types';

export const state = {
    profiles: [],
    studyItem: {}
};

export const mutations = {
    [types.INSERT_PROFILE](state, params) {
        state.asset.push(params)
    },
    [types.REMOVE_PROFILE](state) {
        state.usuario = {}
    },
    [types.SYNC_PROFILE](state, data) {
        state.profiles = data;
    },
    [types.SHOW_PROFILE](state, data) {
        state.studyItem = data;
    },
    [types.UPDATE_PROFILE]() {
    },
};
