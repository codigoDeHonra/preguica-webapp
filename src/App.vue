<template>
  <v-app>
      <v-app-bar
          v-if="usuario.email"
          app
          color="indigo"
          dark
      >
          <v-toolbar-title>
              <div class="font-weight-thin">{{app}} <br>
                  <span 
                      class="font-weight-bold"
                      @click="$router.push('/meus-perfis')"
                  >Perfil: Teste</span>
              </div>
          </v-toolbar-title>

          <v-spacer></v-spacer>
          <v-btn text to="/minhas-corretoras">Corretoras</v-btn>
          <v-toolbar-title>
              <v-btn text to="/minhas-carteiras">
                  carteiras
              </v-btn>
          </v-toolbar-title>

         <v-menu :nudge-width="100">
            <template v-slot:activator="{ on }">

              <v-btn text v-on="on">
                Cartegorias
                <v-icon>mdi-menu-down</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item 
                  v-for=" (cat, index) in getCategory"
                  :key="index"
                  @click="$router.push(`/minhas-categorias/${cat._id}`)">
                <v-list-tile-title >
                    {{cat.name}} 
                </v-list-tile-title>
              </v-list-item>

            </v-list>
          </v-menu> 



          <v-btn text to="/meus-ativos">Ativos</v-btn>
          <v-btn text to="/extrato">Extrato</v-btn>
          <v-btn text to="/dashboard">Painel</v-btn>
          <v-spacer></v-spacer>
          <v-menu :nudge-width="100">
            <template v-slot:activator="{ on }">

              <v-btn text v-on="on">
                  Configuração
                <v-icon>mdi-menu-down</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item @click="$router.push('/perfil')">
                <v-list-tile-title >
                  <v-icon>mdi-account-supervisor</v-icon>
                  Perfil 
                </v-list-tile-title>
              </v-list-item>
              <v-list-item @click="$router.push('/corretora')">
                <v-list-tile-title >
                   <v-icon>mdi-bank</v-icon>
                   Corretora 
                </v-list-tile-title>
              </v-list-item>
              <v-list-item @click="$router.push('/carteira')">
                <v-list-tile-title >
                   <v-icon>mdi-wallet</v-icon>
                   Carteira 
                </v-list-tile-title>
              </v-list-item>
              <v-list-item @click="$router.push('/categoria')">
                <v-list-tile-title >
                   <v-icon>mdi-folder</v-icon>
                   Categoria 
                </v-list-tile-title>
              </v-list-item>
              <v-list-item @click="$router.push('/config/company')">
                <v-list-tile-title >
                  Company 
                </v-list-tile-title>
              </v-list-item>
              <v-list-item @click="$router.push('/ativo')">
                <v-list-tile-title >
                   <v-icon>mdi-cash</v-icon>
                   Ativo
                </v-list-tile-title>
              </v-list-item>
              <v-list-item @click="$router.push('/config/importar')">
                <v-list-tile-title >
                  Importar CEI 
                </v-list-tile-title>
              </v-list-item>
            </v-list>
          </v-menu> 

          <v-menu :nudge-width="100">
            <template v-slot:activator="{ on }">
              <v-btn text v-on="on">
                  {{ usuario.email }}
                <v-icon>mdi-menu-down</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item @click="logoff()">
                <v-list-item-title>
                  <v-icon> mdi-logout </v-icon>
                  sair
                </v-list-item-title>
              </v-list-item>
              <v-list-item 
                  @click="logoff()">
                <v-list-item-title>
                  <v-icon> mdi-user </v-icon>
                 trocar perfil 
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu> 
      </v-app-bar>

    <v-content>
        <v-container
            fluid
        > 
            <v-breadcrumbs 
                v-if="usuario.email"
                :items="breadcrumbsGetter"
            />
            <v-fade-transition mode="out-in">
                <router-view/>
            </v-fade-transition>
        </v-container>
    </v-content>

    <v-footer
        dark
        padless
        color="blue darken-4"
        height="100px"
    >
        <v-card flat
            width="100%" 
            color="transparent"
        >
            <p class="text-center">{{ new Date().getFullYear() }} — <strong>{{ app }}</strong></p>
        </v-card>
    </v-footer>

    <v-snackbar
        v-model="snackbar"
        :color="getSnackbar.color"
        :top="true"
        :left="true"
        :timeout="getSnackbar.timeout"
        @input="fecharSnackbar"
    >
        {{ getSnackbar.text }}
    </v-snackbar>
  </v-app>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'App',
  data () {
    return { 
        snackbar: false,
        app: process.env.VUE_APP_NAME,
    }
  },
    async created() {
      await this.syncUsuarioAction()
      await this.syncCategoryAction()
      await this.syncCategoryByWalletAction(this.$route.params.id)
    },
    computed: {
        ...mapGetters({
            getUsuario: 'usuario/usuarioGetter',
            getSnackbar: 'noticias/getDados',
            getCategory: 'category/categoryGetter',
            getCategoryByWallet: 'category/byWalletGetter',
            breadcrumbsGetter: 'global/breadcrumbsGetter',
        }),
        usuario(){
            return this.getUsuario && Object.keys(this.getUsuario).length > 0 ? this.getUsuario : {};
        }
    },
    methods:{
        ...mapActions({
            syncUsuarioAction: 'usuario/syncUsuarioAction',
            removeUsuarioAction: 'usuario/removeUsuarioAction',
            setSnackbar: 'noticias/setDados',
            syncCategoryAction: 'category/syncAction',
            syncCategoryByWalletAction: 'category/syncByWalletAction',
        }),
        logoff(){
            this.removeUsuarioAction()
        },
        fecharSnackbar(){
        }
    },
    // watch:{
    //     getUsuario(){
    //         this.usuario = Object.keys(this.getUsuario).lenth > 0 ? this.getUsuario : {};
    //     }
    // }
    watch: {
        getSnackbar(val) {
            this.snackbar = val.ativo;
        },
    },
}
</script>
