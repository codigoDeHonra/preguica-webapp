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
                <v-subheader><h3>Carteiras</h3></v-subheader>
            </v-col>
            <v-col cols="4">
                <bar v-if="Object.keys(g).length > 0" :chart-data="g"></bar>
            </v-col>
            <v-col
                cols="4"
                elevation-6
            >
                <v-card class="green darken-4 justify-center">
                    <v-card-text class="pt-4 white">
                        <div>
                            <h3>Carteira: {{ this.walletItem.name }}</h3>
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
                                        color="red"
                                        dark
                                        text
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
                cols="4"
            >
                <wallet-table 
                    :items="walletGetter"
                    @update-wallet="openUpdateModal"
                    @delete-wallet="deleteItem"
                />
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
  import Bar from '../components/Pie'
  import WalletTable from '../components/wallet/Table'

export default {
    name:'Wallet',
      components:{
          Bar,
          WalletTable
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
