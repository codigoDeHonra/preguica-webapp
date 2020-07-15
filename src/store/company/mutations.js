import * as types from './types';

export const state = {
    companies: [],
    companyAssets: [],
    assetItem: {},
};

export const mutations = {


    [types.SYNC_COMPANY](state, params) {
        state.companies = params
    },
    [types.SYNC_COMPANY_ASSETS](state, params) {
        state.companyAssets = params
    },
    [types.INSERT_ASSET](state, params) {
        state.asset.push(params)
    },
    [types.REMOVE_ASSET](state) {
        state.usuario = {}
    },
    [types.SYNC_ASSET](state, data) {
        state.asset = data;
    },
    [types.SHOW_ASSET](state, data) {
        state.assetItem = data;
    },
    [types.UPDATE_ASSET]() {
    },
};
