<template>
    <v-container
        fluid
        fill-height
    >
        <v-row
            flex
            align="center"
            justify="center"
        >
            <v-col
                cols="4"
            >
                <img src="../assets/preguica.png">
            </v-col>
            <v-col
                cols="4"
            >
                <v-card class="green darken-4 justify-center">
                    <v-card-text class="pt-4 white">
                        <CadastroForm/>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import CancelBtn from '../components/app/CancelBtn';
import CadastroForm from '../components/cadastro/Form';

export default {
    name:'Register',
    components: {
        CancelBtn,
        CadastroForm
    },
    
    created(){
        localStorage.removeItem('user');
        //this.removeAction()
    },
    computed: {
        ...mapGetters({
            usuarioGetter: 'usuario/usuarioGetter',
        }),
    },
    watch: {
        usuarioGetter(value) {
            if (value.status) {
                window.location.replace(value.redirect);
            }
        },
    },
    methods: {
        ...mapActions({
            insertUserAction: 'usuario/insertUserAction',
        })
    }
}
</script>
