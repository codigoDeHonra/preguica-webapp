import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import pt from 'vuetify/src/locale/pt.ts'

Vue.use(Vuetify)

// Vue.use(Vuetify);

export default new Vuetify({
    icons:{
        iconfont: 'mdi'
    },
    lang: {
        locales: { pt },
        current: 'pt',
    },
});
