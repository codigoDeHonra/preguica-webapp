import Vue from 'vue'
import Vuex from 'vuex'

import global from './global/index'
import usuario from './usuario/index'
import dashboard from './dashboard/index'
import noticias from './noticias/index'
import category from './category/index'
import broker from './broker/index'
import asset from './asset/index'
import wallet from './wallet/index'
import study from './study/index'
import profile from './profile/index'
import company from './company/index'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        global,
        usuario,
        dashboard,
        noticias,
        category,
        broker,
        asset,
        wallet,
        study,
        profile,
        company
    },
    debug: true,
})
