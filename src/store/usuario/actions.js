import * as types from './types';
import * as usuario from '@/api/usuario'
import router from '../../router'

export const  setUserLoginAction = ({ commit, dispatch }, params) => {

    usuario.login(params)
        .then((response) => {
            const { data } = response

            commit(types.SET_USUARIO_LOGIN, data)

            commit(
                'noticias/SET_DADOS', 
                {
                    ativo: true,
                    color: 'green',
                    text: 'Bem vindo!',
                },
                { root: true }
            );

            dispatch(
                'profile/syncAction', 
                data._id, 
                { root: true }
            )

            router.push('/meus-perfis')
        })
        .catch((r)=> {
            console.log('teste', r)
            commit('noticias/SET_DADOS', {
                ativo: true,
                color: 'red',
                text: 'Erro ao tentar efetur login!',
            },
            { root: true });
        });
};

export const  insertUserAction = ({ commit }, params) => {

    usuario.insert(params)
        .then((response) => {
            const { data } = response
            commit(types.INSERT_USUARIO, data)
            commit(
                'noticias/SET_DADOS', 
                {
                    ativo: true,
                    color: 'green',
                    text: 'Salvo!',
                    timeout: 1000
                },
                { root: true }
            );

            router.push({name: 'login'})
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

export const  setUsuarioAction = ({ commit }, params) => {
    commit(types.SET_USUARIO, params);
};

export const  syncUsuarioAction = ({ commit }, params) => {
    commit(types.SYNC_USUARIO, params);
};

export const  removeUsuarioAction = ({ commit }) => {
    commit(types.REMOVE_USUARIO);
    router.push('/')
};
