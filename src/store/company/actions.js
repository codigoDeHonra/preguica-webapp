import * as types from './types';
import * as company from '@/api/company'

export const  insertAction = ({ commit }, params) => {

    company.insert(params)
        .then((response) => {
            const { data } = response
            commit(types.INSERT_company, data.company)
            commit('noticias/SET_DADOS', {
                ativo: true,
                color: 'green',
                text: 'Salvo!',
            },
            { root: true });
        })
        .catch(()=> {
            commit('noticias/SET_DADOS', {
                ativo: true,
                color: 'red',
                text: 'Erro',
            },
            { root: true });
        });
};


export const syncAction = ({ commit }, params) => {
    company.sync(params)
        .then((response) => {
            commit(types.SYNC_COMPANY, response.data);
        })
        .catch(()=> { })
};

export const syncCompanyAssetsAction = ({ commit }) => {
    company.syncCompanyAssets()
        .then((response) => {
            commit(types.SYNC_COMPANY_ASSETS, response.data);
        })
        .catch(()=> { })
};

export const showAction = ({ commit }, params) => {
   console.log(params) 
    company.show(params)
        .then((response) => {
            commit(types.SHOW_COMPANY, response.data);
        })
        .catch(()=> { })
};

export const  removeAction = ({ commit }, params) => {
    company.remove(params._id)
        .then(() => {
            commit(types.REMOVE_company);
        })
        .catch(()=> { })

};

export const  updateAction = ({ commit }, params) => {

    company.update(params)
        .then((response) => {
            const { data } = response
            commit(types.UPDATE_company, data)
            commit('noticias/SET_DADOS', {
                ativo: true,
                color: 'green',
                text: 'Salvo!',
            },
            { root: true });
        })
        .catch(()=> {
            commit('noticias/SET_DADOS', {
                ativo: true,
                color: 'red',
                text: 'Erro',
            },
            { root: true });
        });
};
