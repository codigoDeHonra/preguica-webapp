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
                <v-subheader><h3>Meus do Perfis</h3></v-subheader>
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
                    <template v-slot:item="{ item }">
                        <tr>
                            <td class="text-xs-left">{{ item.name }}</td>
                            <td class="text-right px-0">
                                <v-btn :to="{ 
                                    name: 'my-wallets', 
                                    params: { profileId: item._id } }"
                                >
                                    <v-icon>
                                        mdi-eye
                                    </v-icon>
                                </v-btn>
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

export default {
    name:'Profile',
    components:{
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

        this.breadcrumbRemoveAction()
        this.breadcrumbInsertAction({
                disabled: false, 
                exact: false,
                href: '/teste',
                link: true,
                text: 'Meus Perfis',
                to: '/meus-perfis',
                level: 0
            })
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
            breadcrumbInsertAction: 'global/breadcrumbInsertAction',
            breadcrumbRemoveAction: 'global/breadcrumbRemoveAction',
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
