import * as types from './types';

export const state = {
    studies: [],
    studyItem: {}
};

export const mutations = {
    [types.INSERT_STUDY](state, params) {
        state.asset.push(params)
    },
    [types.REMOVE_STUDY](state) {
        state.usuario = {}
    },
    [types.SYNC_STUDY](state, data) {
        console.log('mut')
        state.studies = data;
    },
    [types.SHOW_STUDY](state, data) {
        state.studyItem = data;
    },
    [types.UPDATE_STUDY]() {
    },
};
