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
            <v-col>
                <bar v-if="Object.keys(g).length > 0" :chart-data="g"></bar>
            </v-col>
            <v-col
                cols="6"
                elevation-6
            >
                <v-card class="green darken-4 justify-center">
                    <v-card-text class="pt-4 white">
                        <div>
                            <h3>Wallet: {{ this.walletItem.name }}</h3>
                            <v-form
                                ref="form"
                                v-model="valid"
                            >
                                <v-text-field
                                    v-model="walletItem.name"
                                    required
                                   filled 
                                    label="Nome"
                                />
                                <v-layout justify-space-between>
                                    <v-btn
                                        :class=" { 'green darken-4 white--text' : valid, disabled: !valid }"
                                        color="teal lighten-1"
                                        dark
                                        @click="submit()"
                                    >
                                     {{ this.walletItem._id ? 'Atualizar': 'Cadastrar' }}
                                    </v-btn>
                                    <v-btn
                                        :class=" { 'green darken-4 white--text' : valid, disabled: !valid }"
                                        color="teal lighten-1"
                                        dark
                                        @click="reset()"
                                    >
                                    Cancelar
                                    </v-btn>
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
                    :items="walletGetter"
                    class="elevation-1"
                    :must-sort="true"
                >
                <template  v-slot:item="{ item }">
                        <tr >
                            <td class="text-xs-left">{{ item.name }}</td>
                            <td class="justify-center layout px-0">
                                <v-btn
                                    :to="`/carteira/${item._id}`"
                                    text
                                >
                                    <v-icon
                                        class="mr-2"
                                    >
                                        mdi-eye
                                    </v-icon>
                                </v-btn>
                                <v-icon
                                    class="mr-2"
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
  import Bar from '../components/Pie'

export default {
    name:'Login',
      components:{
          Bar
      },
    data() {
        return {
            valid: true,
            name: '',
            category: '',
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
                      align: 'left'
                  },
            ],
            walletItem: {}
        };
    },
    async created() {
      await this.syncWalletAction()
      await this.syncWalletCountAction()
    },
    computed: {
        ...mapGetters({
            walletCountGetter: 'wallet/walletCountGetter',
            walletGetter: 'wallet/walletGetter',
            getCategory: 'category/categoryGetter',
        }),
        g() {
            let vm = this
            let labels = []
            let datasets = []
            let colors = []
            let d = {} 

            this.walletCountGetter.forEach(function (element){
              labels.push(element.name)    
              colors.push(vm.dynamicColors())
              datasets.push(element.total)
            })

            d = { 
                labels: labels, 
                datasets: [{ 
                  backgroundColor: colors,
                  data: datasets
                }]
            } 

            if(Object.keys(labels).length > 0 ){
                return d 
            } else {
                return {}
            }
        }
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
            insertWalletAction: 'wallet/insertAction',
            syncWalletAction: 'wallet/syncAction',
            removeAction: 'wallet/removeAction',
            updateWalletAction: 'wallet/updateAction',
            syncCategoryAction: 'category/syncAction',
            syncWalletCountAction: 'wallet/syncCountAction',
        }),
        submit() {
            const wallet = { 
                _id: this.walletItem._id, 
                name: this.walletItem.name, 
                category: this.walletItem.category, 
            };

            if(this.walletItem._id) {
                this.updateWalletAction(wallet);
            } else {
                this.insertWalletAction(wallet);
            }

        },
        deleteItem (item) {
            const index = this.walletGetter.indexOf(item)
            // console.log(item)
            item.index = index
            confirm('Tem certeza?') && this.removeAction(item)
        },
        openUpdateModal (item) {
            const index = this.walletGetter.indexOf(item)
            this.walletItem = this.walletGetter[index]
        },
        reset () {
            this.walletItem = {} 
        },
        dynamicColors () {
            var r = Math.floor(Math.random() * 255);
            var g = Math.floor(Math.random() * 255);
            var b = Math.floor(Math.random() * 255);
            return "rgb(" + r + "," + g + "," + b + ")";
        }
    }
}
</script>
