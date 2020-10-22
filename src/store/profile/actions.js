import * as types from './types';
import * as study from '@/api/profile'
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
        .then(() => {
            // const { data } = response
            commit(types.INSERT_PROFILE, params)
            commit('noticias/SET_DADOS', {
                ativo: true,
                color: 'green',
                text: 'Salvo!',
            },
            { root: true });
        })
        .catch((error)=> {
            console.log(error)
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

export const syncAction = ({ commit, dispatch }, params) => {
    study.sync(params)
        .then((response) => {
            commit(types.SYNC_PROFILE, response.data);
            console.log(response.data[0]._id)

            dispatch(
                'wallet/syncAction', 
                response.data[0]._id,
                { root: true }
            );

            dispatch(
                'wallet/syncCountAction', 
                response.data[0]._id,
                { root: true }
            );

        })
        .catch((e)=> { console.log(e)})
};

export const syncCountAction = ({ commit }, params) => {
    study.count(params)
        .then((response) => {
            commit(types.SYNC_COUNT_PROFILE, response.data);

            // dispatch(
            //     'wallet/syncAction', 
            //     response.data[0]._id,
            //     { root: true }
            // );

            // dispatch(
            //     'wallet/syncCountAction', 
            //     response.data[0]._id,
            //     { root: true }
            // );

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
            commit(types.REMOVE_PROFILE);
        })
        .catch(()=> { })
};

export const  updateAction = ({ commit }, params) => {

    study.update(params)
        .then((response) => {
            const { data } = response
            commit(types.UPDATE_PROFILE, data)
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
