import * as types from './types';
import vue from 'vue';

export const state = {
    breadcrumbs: [],
};

export const mutations = {
    [types.BREADCRUMB_INSERT](state, data) {
      vue.set(state.breadcrumbs, data.level, data)
    },
    [types.BREADCRUMB_DELETE]() {
      vue.set(state, 'breadcrumbs', [])
    },
};
