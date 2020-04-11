<template>
  <v-app>
      <v-app-bar
          v-if="usuario.email"
          app
          color="indigo"
          dark
      >
          <v-toolbar-title>
              <v-btn text to="/minhas-carteiras">
                  {{app}}
              </v-btn>
          </v-toolbar-title>

          <v-btn text to="/dashboard">Extrato</v-btn>

          <v-btn text to="/meus-ativos">
              Ativo
          </v-btn>
          <v-spacer></v-spacer>
         <v-menu :nudge-width="100">
            <template v-slot:activator="{ on }">

              <v-btn text v-on="on">
                  Configuração
                <v-icon>mdi-menu-down</v-icon>
              </v-btn>
            </template>

            <v-list>
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
              <v-list-item @click="$router.push('/ativo')">
                <v-list-tile-title >
                   <v-icon>mdi-cash</v-icon>
                   Ativo
                </v-list-tile-title>
              </v-list-item>
            </v-list>
          </v-menu> 

      {{usuario.email}}
          <v-btn 
              v-if="usuario.email"
              text  
              @click="logoff()">
              sair</v-btn>

      </v-app-bar>

    <v-content>
        <v-container
            fluid
        >
            <v-fade-transition mode="out-in">
                <router-view/>
            </v-fade-transition>
        </v-container>
    </v-content>
    <v-snackbar
        v-model="snackbar"
        :color="getSnackbar.color"
        :top="true"
        :left="true"
        :timeout="2000"
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
       // usuario: {}
        snackbar: false,
        app: process.env.VUE_APP_NAME
    }
  },
    created() {
        this.syncUsuarioAction()
    },
    computed: {
        ...mapGetters({
            getUsuario: 'usuario/usuarioGetter',
            getSnackbar: 'noticias/getDados',
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
        }),
        logoff(){
            this.removeUsuarioAction()
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
