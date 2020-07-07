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
                xs="12"
                sm="4"
                cols="6"
                elevation-6
            >
                <img src="../assets/preguica.png">
            </v-col>
            <v-col
                xs="12"
                sm="4"
                cols="6"
            >
                <v-card class="green justify-center">
                    <v-layout
                        row
                        align-center
                        justify-center
                    >
                    </v-layout>
                    <v-card-text class="pt-4 white">
                        <div>
                            <v-form
                                ref="form"
                                v-model="valid"
                            >
                                <v-text-field
                                    v-model="email"
                                    required
                                    filled 
                                    prepend-icon="mdi-email"
                                    label="E-mail"
                                    :rules="emailRules"
                                />
                                <v-text-field
                                    v-model="password"
                                    :append-icon="e1 ? 'mdi-visibility' : 'mdi-visibility_off'"
                                    :type="e1 ? 'password' : 'text'"
                                    :rules="senhaRules"
                                    label="Senha"
                                    required
                                    filled 
                                    prepend-icon="mdi-lock"
                                    @click:append="() => (e1 = !e1)"
                                />
                                <v-card-actions justify-space-between>
                                    <v-row
                                        flex
                                        align="center"
                                        justify="center"
                                    >
                                    <v-col cols="12">
                                        <v-btn
                                            :disabled="!valid"
                                            color="success"
                                            block
                                            @click="submit()"
                                        >
                                            Entrar
                                        </v-btn>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-btn
                                            color=" darken-4"
                                            dark
                                            block
                                            :to="{ name:'cadastro'}"
                                        >
                                           Cadastrar
                                        </v-btn>
                                    </v-col>
                                    </v-row>
                                </v-card-actions>
                            </v-form>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name:'Login',
    data() {
        return {
            valid: false,
            e1: 'visibility',
            password: '',
            senhaRules: [
                v => !!v || 'Preencher Senha!',
            ],
            emailRules: [
                v => !!v || 'Preencher E-mail',
                v => /.+@.+\..+/.test(v) || 'E-mail precisa ser valido',
            ],
            email: ''
        };
    },
    created(){
        localStorage.removeItem('user');
        this.removeAction()
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
            loginAction: 'usuario/setUserLoginAction',
            removeAction: 'usuario/removeUsuarioAction',
        }),
        submit() {
            const user = { email: this.email, password: this.password };
            this.loginAction(user);
        },
    }
}
</script>
