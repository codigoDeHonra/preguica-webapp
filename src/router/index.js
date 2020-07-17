// import Vue from 'vue'
// import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

// Vue.use(VueRouter)

// const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home
//   },
//   {
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   }
// ]

// const router = new VueRouter({
//   routes
// })

// export default router


import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import(/* webpackChunkName: "Dashboard" */ '../views/Dashboard.vue')
    },
    {
      path: '/extrato',
      name: 'extract',
      component: () => import(/* webpackChunkName: "Extract" */ '../views/Extract.vue')
    },
    {
      path: '/',
      name: 'login',
      component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: () => import(/* webpackChunkName: "Cadastro" */ '../views/Cadastro.vue')
    },
    {
      path: '/categoria',
      name: 'category',
      component: () => import(/* webpackChunkName: "Cadastro" */ '../views/Category.vue')
    },
    {
      path: '/corretora',
      name: 'broker',
      component: () => import(/* webpackChunkName: "Broker" */ '../views/Broker.vue')
    },
    {
      path: '/ativo',
      name: 'asset',
      component: () => import(/* webpackChunkName: "Asset" */ '../views/Asset.vue')
    },
    {
      path: '/ativo/:code/detalhes',
      name: 'asset-details',
      component: () => import(/* webpackChunkName: "Asset" */ '../views/AssetDetails.vue')
    },
    {
      path: '/carteira',
      name: 'carteira',
      component: () => import(/* webpackChunkName: "Carteira" */ '../views/Wallet.vue')
    },
    {
      path: '/minhas-carteiras/:profileId',
      name: 'my-wallets',
      component: () => import(/* webpackChunkName: "Carteira" */ '../views/MyWallet.vue')
    },
    {
        path: '/minhas-categorias/:id',
      name: 'carteira-id',
      component: () => import(/* webpackChunkName: "Carteira" */ '../views/MyCategory.vue')
    },
    {
      path: '/meus-ativos',
      name: 'MyAssets',
      component: () => import(/* webpackChunkName: "MyAssets" */ '../views/MyAssets.vue')
    },
    {
      path: '/minhas-corretoras',
      name: 'MyAssets',
      component: () => import(/* webpackChunkName: "MyAssets" */ '../views/MyBroker.vue')
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: () => import(/* webpackChunkName: "MyAssets" */ '../views/Profile.vue')
    },
    {
      path: '/meus-perfis',
      name: 'perfil',
      component: () => import(/* webpackChunkName: "MyAssets" */ '../views/MyProfiles.vue')
    },
    {
        path: '/config/importar',
      name: 'config-importar',
      component: () => import(/* webpackChunkName: "MyAssets" */ '../views/ImportCEI.vue')
    },
    {
      path: '/config/company',
      name: 'config-company',
      component: () => import(/* webpackChunkName: "MyAssets" */ '../views/Company.vue')
    }
  ]

const router = new Router({ routes });

// router.beforeEach(function(to, from, next) {
//     const store = JSON.parse(localStorage.getItem('user'))

//     if (store) {
//         console.log('/')
//         next()
//     }

//     // const usuario = (router.app.$store.state.usuario.usuario)
//     // console.log(usuario)

//     // // if (
//     // //     (
//     // //         to.name == 'Eventos' ||
//     // //         to.name == 'Inscricao' ||
//     // //         to.name == 'Eventos'
//     // //     )
//     // //     && Object.keys(usuario).length == 0
//     // // ) {
//     // //     next('/login')
//     // // } else {
//          // next()
//     // // }

// });

export default router;
