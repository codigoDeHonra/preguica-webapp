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
                <v-subheader><h3>Minhas Corretoras</h3></v-subheader>
            </v-col>
            <v-col
                cols="6"
            >
                <v-data-table
                    :headers="headers"
                    :items="brokerGetter"
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

export default {
    name:'Broker',
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
            brokerItem: {}
        };
    },
    created() {
        this.syncBrokerAction()
    },
    computed: {
        ...mapGetters({
            brokerGetter: 'broker/brokerGetter',
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
        }),
        submit() {
            const broker = { 
                _id: this.brokerItem._id, 
                name: this.brokerItem.name, 
            };

            if(this.brokerItem._id) {
                this.updateBrokerAction(broker);
            } else {
                this.insertBrokerAction(broker);
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
            this.brokerItem = this.brokerGetter[index]
        },
        reset () {
            this.brokerItem = {} 
        },
    }
}
</script>
