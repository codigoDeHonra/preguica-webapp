import * as types from './types';

export const state = {
    profiles: [],
    count:[]
};

export const mutations = {
    [types.INSERT_PROFILE](state, params) {
        state.profiles.push(params)
    },
    [types.REMOVE_PROFILE]() {
    },
    [types.SYNC_PROFILE](state, data) {
        state.profiles = data;
    },
    [types.SYNC_COUNT_PROFILE](state, data) {
        state.count = data;
    },
    [types.SHOW_PROFILE](state, data) {
        state.studyItem = data;
    },
    [types.UPDATE_PROFILE]() {
    },
};
