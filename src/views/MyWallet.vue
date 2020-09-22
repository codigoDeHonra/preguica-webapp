<template>
    <v-container
        fluid
        fill-height
    >
        <v-row>
            <v-col>
                <h3>Minhas Carteiras</h3>
            </v-col>
        </v-row>
        <v-row
            v-if="Object.keys(g).length > 0"
            flex
            align-center
            justify-center
        >
            <v-col cols="3">
                <v-card
                    class="mx-auto"
                >
                <v-card-text>
                    <bar v-if="Object.keys(g).length > 0" :chart-data="g"></bar>
                </v-card-text>
                </v-card>
            </v-col>
            <v-col
                cols="9"
            >
                <v-data-table
                    v-if="Object.keys(g).length > 0"
                    :headers="headers"
                    :items="walletCountGetter"
                    class="elevation-1"
                    :must-sort="true"
                >
                    <template  v-slot:item="{ item }">
                        <tr >
                            <td class="text-xs-left">{{ item.name }}</td>
                            <td class="text-right">{{ item.total | money }}</td>
                            <td class="justify-center layout">
                                <v-btn
                                    :to="`/minhas-categorias/${item._id}`"
                                    text
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
        <v-row
            v-if="!(Object.keys(g).length > 0)"
            flex
            align-center
            justify-center
        >
            <p>Sem dados</p>
        </v-row>
    </v-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import Bar from '../components/Pie'
import money from '../filters/money'

export default {
    name:'MyWallet',
    components:{
        Bar
    },
    filters: {
       money
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
                      text: 'Investimento',
                      value: null,
                      sortable: false,
                      align: 'right'
                  },
                  {
                      text: 'Ações',
                      value: null,
                      sortable: false,
                      align: 'center'
                  },
            ],
            walletItem: {}
        };
    },
    async created() {
      await this.syncWalletAction(this.$route.params.profileId)
      await this.syncWalletCountAction(this.$route.params.profileId)

      await this.breadcrumbInsertAction({
                disabled: false, 
                exact: false,
                href: '/minhas-carteiras',
                link: true,
                text: 'Minhas Carteiras',
                to: '/minhas-carteiras',
                level: 1 
            })
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

            if (Object.keys(this.walletCountGetter)){

                this.walletCountGetter.forEach(function (element){
                    labels.push(element.name)    
                    colors.push(vm.dynamicColors())
                    datasets.push(element.total)
                })
            }

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
    methods: {
        ...mapActions({
            syncWalletAction: 'wallet/syncAction',
            syncCategoryAction: 'category/syncAction',
            syncWalletCountAction: 'wallet/syncCountAction',
            breadcrumbInsertAction: 'global/breadcrumbInsertAction',
        }),
        dynamicColors () {
            var r = Math.floor(Math.random() * 255);
            var g = Math.floor(Math.random() * 255);
            var b = Math.floor(Math.random() * 255);
            return "rgb(" + r + "," + g + "," + b + ")";
        }
    }
}
</script>
