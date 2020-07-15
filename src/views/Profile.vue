<template>
    <v-container
        fluid
        fill-height
    >
        <v-row
            flex
            align-center
            justify-center
        >
            <v-col cols="12">
                <v-subheader><h3>Configuração do Perfil</h3></v-subheader>
            </v-col>
            <v-col
                cols="6"
            >
                <v-card class="green darken-4 justify-center">
                    <v-card-text class="pt-4 white">
                        <div>
                            <h3>Perfil: {{ this.profileItem.name }}</h3>
                            <v-form
                                ref="form"
                                v-model="valid"
                            >
                                <v-text-field
                                    v-model="profileItem.name"
                                    required
                                   filled 
                                    label="Nome"
                                />
                                <v-switch v-model="profileItem.default" label="Perfil Padrão"></v-switch>
                                <v-layout justify-space-between>
                                    <v-btn
                                        :class=" { 'green darken-4 white--text' : valid, disabled: !valid }"
                                        color="teal lighten-1"
                                        dark
                                        @click="submit()"
                                    >
                                     {{ this.profileItem._id ? 'Atualizar': 'Cadastrar' }}
                                    </v-btn>
                                    <cancel-btn 
                                        text
                                        :to="{ name: 'login'}" 
                                        @click="reset()"
                                    />
                                </v-layout>
                            </v-form>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col
                cols="6"
            >
                <v-data-table
                    :headers="headers"
                    :items="profileGetter"
                    class="elevation-1"
                    :must-sort="true"
                >
                <template  v-slot:item="{ item }">
                        <tr >
                            <td class="text-xs-left">{{ item.name }}</td>
                            <td class="text-right px-0">
                                <v-icon
                                    @click="openUpdateModal(item)"
                                >
                                    mdi-pencil
                                </v-icon>
                                <v-icon
                                    @click="deleteItem(item)"
                                >
                                    mdi-delete
                                </v-icon>
                            </td>
                        </tr>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import CancelBtn from '../components/app/CancelBtn';

export default {
    name:'Profile',
    components:{
        CancelBtn
    },
    data() {
        return {
            valid: true,
            name: '',
            headers:[
                  {
                      text: 'Nome',
                      value: 'name',
                      sortable: false,
                      align: 'left'
                  },
                  {
                      text: 'Ações',
                      value: null,
                      sortable: false,
                      align: 'right'
                  },
            ],
            profileItem: {
                name: '',
                default: false
            }
        };
    },
    created() {
        this.syncBrokerAction()
        this.syncProfileAction(this.userGetter._id)
    },
    computed: {
        ...mapGetters({
            brokerGetter: 'broker/brokerGetter',
            profileGetter: 'profile/profileGetter',
            userGetter: 'usuario/usuarioGetter',
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
            insertBrokerAction: 'broker/insertAction',
            syncBrokerAction: 'broker/syncAction',
            removeAction: 'broker/removeAction',
            updateBrokerAction: 'broker/updateAction',
            insertProfileAction: 'profile/insertAction',
            updateProfileAction: 'profile/updateAction',
            syncProfileAction: 'profile/syncAction',
        }),
        submit() {
            const broker = { 
                _id: this.profileItem._id, 
                name: this.profileItem.name, 
            };

            if(this.profileItem._id) {
                this.updateProfileAction(broker);
            } else {
                this.insertProfileAction(broker);
            }

        },
        deleteItem (item) {
            const index = this.brokerGetter.indexOf(item)
            // console.log(item)
            item.index = index
            confirm('Tem certeza?') && this.removeAction(item)
        },
        openUpdateModal (item) {
            const index = this.brokerGetter.indexOf(item)
            this.profileItem = this.brokerGetter[index]
        },
        reset () {
            this.profileItem = {} 
        },
    }
}
</script>
