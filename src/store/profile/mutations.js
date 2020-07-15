import * as types from './types';

export const state = {
    profiles: [],
};

export const mutations = {
    [types.INSERT_PROFILE](state, params) {
        state.asset.push(params)
    },
    [types.REMOVE_PROFILE]() {
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
