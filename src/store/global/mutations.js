import * as types from './types';

export const state = {
    breadcrumbs: [],
};

export const mutations = {
    [types.BREADCRUMB_INSERT](state, data) {
        state.breadcrumbs.push(data) 
    },
    [types.BREADCRUMB_REMOVE]() {
    },
};
