// import * as avaliacaoResultadosHelperAPI from '@/helpers/api/AvaliacaoResultados';
import * as types from './types';

export const dadosMenu = () => {
    // avaliacaoResultadosHelperAPI.dadosMenu()
    //     .then((response) => {
    //         const data = response.data;
    //         const dadosTabela = data.data;
    //         commit(types.SET_REGISTROS_TABELA, dadosTabela);
    //     });
};

export const breadcrumbInsertAction = ({ commit }, params) => {
    commit(types.BREADCRUMB_INSERT, params);
};

export const breadcrumbRemove = ({ commit }, params) => {
    commit(types.BREADCRUMB_DELETE, params);
};
