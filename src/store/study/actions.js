import * as types from './types';
import * as study from '@/api/study'
//import router from '../../router'

// export const  setUserLoginAction = ({ commit }, params) => {

//     usuario.login(params)
//         .then((response) => {
//             const { data } = response
//             commit(types.SET_USUARIO_LOGIN, data)
//             commit('noticias/SET_DADOS', {
//                 ativo: true,
//                 color: 'green',
//                 text: 'Bem vindo!',
//             },
//             { root: true });
//             router.push('/dashboard')
//         })
//         .catch((r)=> {
//             console.log('teste', r)
//             commit('noticias/SET_DADOS', {
//                 ativo: true,
//                 color: 'red',
//                 text: 'Erro ao tentar efetur login!',
//             },
//             { root: true });
//         });
// };

export const  insertAction = ({ commit }, params) => {

    study.insert(params)
        .then((response) => {
            const { data } = response
            commit(types.INSERT_STUDY, data.study)
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

// export const  setUsuarioAction = ({ commit }, params) => {
//     commit(types.SET_USUARIO, params);
// };

export const syncAction = ({ commit }, params) => {
    study.sync(params)
        .then((response) => {
            console.log('syncccc', types)
            commit(types.SYNC_STUDY, response.data);
        })
        .catch((e)=> { console.log(e)})
};

export const showAction = ({ commit }, params) => {
   console.log(params) 
    study.show(params)
        .then((response) => {
            commit(types.SHOW_STUDY, response.data);
        })
        .catch(()=> { })
};

export const  removeAction = ({ commit }, params) => {
    study.remove(params._id)
        .then(() => {
            commit(types.REMOVE_STUDY);
        })
        .catch(()=> { })

};

export const  updateAction = ({ commit }, params) => {

    study.update(params)
        .then((response) => {
            const { data } = response
            commit(types.UPDATE_STUDY, data)
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
