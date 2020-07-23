<template>
    <div>
        <v-container  flud grid-list-md text-xs-center>
            <v-row>
                <v-col>
                    <h3>Minhas Categorias</h3>
                </v-col>
            </v-row>
            <v-row
                flex
                align-center
                justify-center
            >
                <v-col cols="3">
                    <v-card
                        class="mx-auto"
                        >
                        <bar v-if="Object.keys(g).length > 0" :chart-data="g"></bar>
                    </v-card>
                </v-col>
                <v-col>
                    <v-data-table
                        :headers="headers"
                        :items="categories"
                        class="elevation-1"
                        :must-sort="true"
                    >
                    <template v-slot:item="{ item, index }">
                            <tr>
                                <td class="text-xs-left">{{ index + 1  }}</td>
                                <td class="text-xs-left">{{ item.name }}</td>
                                <td class="text-xs-left">{{ item.investiment }}</td>
                                <td class="text-xs-left">{{ item.percentageInWallet }}</td>
                                <td class="text-xs-left">{{ item.perc }}</td>
                                <td class="justify-center layout px-0">
                                    <v-btn
                                        :to="`/meus-ativos`"
                                        text
                                    >
                                        <v-icon
                                            class="mr-2"
                                        >
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
    </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import moment from 'moment';
  import vue from 'vue';
  import Bar from '../components/Pie'

  export default {
    name: 'MyCategory',
      components:{
          Bar
      },
    data(){
      return {
          datacollection: null,
          pagination: { rowsPerPage: 10 },
          fixedPayout: 0.0,
          fixedInvestiment: 2,
          initialInvestiment: 100.0,
          dialog: false,
          modalUpdate: false,
          tabActive: null,
          headers:[
              {
                  text: '#',
                  sortable: false,
                  align: 'left'
              },
              {
                  text: 'Categoria',
                  value: 'asset',
                  align: 'left',
                  sortable: false
              },
              {
                  text: 'Investimento',
                  value: 'invesment',
                  align: 'right',
                  sortable: false
              },
              {
                  text: '% na Carteira',
                  value: 'percentageInWallet',
                  align: 'right',
                  sortable: false
              },
              {
                  text: '% Atual na Carteira',
                  value: 'perc',
                  align: 'right',
                  sortable: false
              },
              {
                  text: 'Ações',
                  value: null,
                  align: 'right',
                  sortable: false
              },
          ],
          editedIndex: -1,
          trade: {
              date: new Date().toISOString().substr(0, 10),
              dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
              payout: 0,
              asset: '',
              investiment: 0,
              broker: '',
              amount: 0
          },
          defaultTrade: {
              date: new Date().toISOString().substr(0, 10),
              payout: this.fixedPayout,
              asset: '',
              investiment: this.entry,
              dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
              broker: '',
              amount: 0
          },
          pairs:['EUR/USD', 'USD/CHF', 'AUD/CAD', 'USD/JPY', 'GBP/USD'],
          date: new Date().toISOString().substr(0, 10),
          menu: false,
          modal: false,
          menu2: false
      }
    },
    filters: {
      dateFormat: function (value) {
          moment.locale('pt-br')
          return moment(value).format('DD-MM-YYYY')
      }
    },
    async created() {
      await this.syncTradesAction()
      await this.syncCategoryAction()
      await this.syncBrokerAction()
      await this.syncAssetAction()
      await this.countAction()
      await this.syncCategoryByWalletAction(this.$route.params.id)

      await this.breadcrumbInsertAction({
                disabled: false, 
                exact: false,
                href: '/minhas-categorias',
                link: true,
                text: 'Minhas Cartegorias',
                to: '/minhas-categorias' ,
                level: 2 
            })

    },
    computed: {
        ...mapGetters({
            getDashboard: 'dashboard/getDashboard',
            getCount: 'dashboard/getCount',
            getUsuario: 'usuario/usuarioGetter',
            getCategory: 'category/categoryGetter',
            getCategoryByWallet: 'category/byWalletGetter',
            brokerGetter: 'broker/brokerGetter',
            getAsset: 'asset/assetGetter',
        }),
        currentInvestiment(){
            return this.pnl() + parseFloat(this.initialInvestiment)
        },
        entry(){
            return this.initialInvestiment * (this.fixedInvestiment/100)
        },
        computedDateFormatted () {
            return this.formatDate(this.date)
        },
        categories() {
            let d = [] 
            let total = 0

            if(Object.keys(this.getCategoryByWallet).length) {
                this.getCategoryByWallet.forEach(function (element){
                  total += element.total
                })

                this.getCategoryByWallet.forEach( (element) => {
                    console.log(element)
                    /*if(
                        (this.categoryFilter==element.category || this.categoryFilter == '' || this.categoryFilter == undefined) && 
                        (this.walletFilter==element.wallet || this.walletFilter == '' || this.walletFilter == undefined)
                    ) {*/

                        d.push({
                            asset:{ name: element.name } ,
                            _id: element._id,
                            name: element.name,
                            perc: parseFloat(parseFloat((element.total/total)*100).toFixed(2)),
                            investiment: element.total,
                            category: element.category,
                            wallet: element.wallet,
                            percentageInWallet: element.percentageInWallet
                        }) 
                    //}
                })
            }
            console.log(d)

            if(d.length > 0 ){
                return d 
            } else {
                return [] 
            }
        },
        g() {
            let vm = this
            let labels = []
            let datasets = []
            let colors = []
            let d = {} 

            if(this.getCategoryByWallet.length) {
                this.getCategoryByWallet.forEach(function (element){
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
      mounted() {
                this.fillData()
      },
    methods:{
        ...mapActions({
            syncTradesAction: 'dashboard/syncTradesAction',
            removeAction: 'dashboard/removeAction',
            countAction: 'dashboard/countAction',
            updateAction: 'dashboard/updateAction',
            insertAction: 'dashboard/insertAction',
            removeAllAction: 'dashboard/removeAllAction',
            insertSessionAction: 'dashboard/insertSessionAction',
            removeAllSessionAction: 'dashboard/removeAllSessionAction',
            syncCategoryAction: 'category/syncAction',
            syncCategoryByWalletAction: 'category/syncByWalletAction',
            syncBrokerAction: 'broker/syncAction',
            syncAssetAction: 'asset/syncAction',
            breadcrumbInsertAction: 'global/breadcrumbInsertAction',
        }),
        openInsertModal () {
            this.trade = Object.assign({}, this.defaultValues())
            this.modalUpdate = false
            this.dialog = true
        },
        openUpdateModal (item) {

            this.modalUpdate = true
            const index = this.getDashboard.trades.indexOf(item)
            this.trade = this.getDashboard.trades[index]
            this.trade.index = index

            this.dialog = true
        },
        deleteItem (item) {
            const index = this.getDashboard.trades.indexOf(item)
            // console.log(item)
            item.index = index
            confirm('Tem certeza?') && this.removeAction(item)
        },
        close () {
            this.trade = Object.assign({}, this.defaultValues())
            this.dialog = false
        },
        save () {

            this.trade.usuarioId = this.getUsuario._id,
            this.trade.date = this.date,
                this.trade.asset = {
                    _id: this.trade.asset._id,
                    name: this.trade.asset.name,
                }
            this.insertAction(this.trade)

            this.dialog = false
            this.close()
            this.modalUpdate = false
        },
        update () {
            this.updateAction(this.trade)
            this.close()
            this.modalUpdate = false
        },
        total (trade) {
            const total = parseFloat(trade.investiment) *( parseFloat(trade.payout) / 100)

            return total
        },
        pnl () {

            const pnl = this.getDashboard.trades.reduce(function(acc, value) {
                return acc + (parseFloat(value.investiment) * ( parseFloat(value.payout) / 100))
            }, 0)

            return pnl
        },
        removeTrades() {
            this.removeAllAction()
        },
        defaultValues(){
          return  {
              date: new Date().toISOString().substr(0, 10),
              payout: this.fixedPayout,
              asset: '',
              investiment: parseFloat(this.entry).toFixed(2),
              dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
          }
        },
        loss() {
            this.trade.payout = -100
        },
        insertSession() {
            let session = {
                trades: this.getDashboard.trades,
                initialInvestiment: this.initialInvestiment,
                currentInvestiment: this.currentInvestiment
            }

            this.insertSessionAction(session);
        },
        removeAllSession(){
            this.removeAllSessionAction()
        },
        formatDate (date) {
            if (!date) return null

            const [year, month, day] = date.split('-')
            return `${day}/${month}/${year}`
        },
        parseDate (date) {
            if (!date) return null

            const [month, day, year] = date.split('/')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },
        categoryItem (item) {
            if (item){
                const index = this.getCategory.find(function(value){
                    return value._id == item._id  ? true : 'error'
                })
                return index.name
            }
        },
        fillData () {
            let labels = []
            let datasets = []

            this.getCount.forEach(function (element){
console.log(element.name)
              labels.push(element.name)    
              datasets.push(element.total)    
            })

            /*this.datacollection = {
              labels: [this.getRandomInt(), this.getRandomInt()],
              datasets: [
                {
                  label: 'Data One',
                  backgroundColor: '#f87979',
                  data: [this.getRandomInt(), this.getRandomInt()]
                }, 
              ]
            }*/
        },
        getRandomInt () {
            return Math.floor(Math.random() * (50 - 5 + 1)) + 5
        },
        dynamicColors () {
            var r = Math.floor(Math.random() * 255);
            var g = Math.floor(Math.random() * 255);
            var b = Math.floor(Math.random() * 255);
            return "rgb(" + r + "," + g + "," + b + ")";
        }
    },
    watch: {
      date(val) {
         const t = Object.assign({}, this.trade);
         t.date = val

         vue.set(this, 'trade', t)
      },
    }
  }
</script>
