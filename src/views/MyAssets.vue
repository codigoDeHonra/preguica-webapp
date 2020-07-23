<template>
    <div>
        <v-container  flud grid-list-md text-xs-center>
        <v-row>
        <v-col>
            <h3>Meus Ativos</h3>
        </v-col>
        </v-row>
            <v-row
                flex
                align-center
                justify-center
            >
                <v-col cols="6">
                    <bar v-if="Object.keys(g).length > 0" :chart-data="g"></bar>
                </v-col>
            </v-row>
            <v-row
                flex
                align="center"
                justify="center"
            >
                <v-col xl="4" cols="6">
                    <v-select
                        :items="walletGetter"
                        filled
                        clearable
                        item-text="name"
                        item-value="name"
                        label="Carteira"
                        v-model="walletFilter"
                        prepend-icon="mdi-wallet"
                        />
                </v-col>
                <v-col xl="4" cols="6">
                    <v-select
                        :items="getCategory"
                        clearable
                        filled
                        item-text="name"
                        prepend-icon="mdi-folder"
                        item-value="name"
                        label="Categoria"
                        v-model="categoryFilter"
                    />
                </v-col>
            </v-row>
            <v-row
                flex
                align-center
                justify-center
            >
                <v-col class="mx-auto" xl="8" cols="12">
                    <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Pesquisa"
                        single-line
                        hide-details
                        filled
                    />
                    <v-data-table
                        :headers="headers"
                        :items="assets"
                        class="elevation-1"
                        :must-sort="true"
                        :search="search"
                    >
                        <template v-slot:item="{ item, index }">
                            <tr>
                                <td class="text-xs-left">{{ index + 1  }}</td>
                                <td class="text-center">
                                    <v-btn 
                                        text
                                        :to="{ name: 'asset-details', params: { code: item.asset.name}}">
                                        {{ item.asset.name }}
                                    </v-btn>
                                </td>
                                <td class="text-xs-left">{{ item.wallet }}</td>
                                <td class="text-xs-left">{{ item.category }}</td>
                                <td class="text-right">{{ item.amount }}</td>
                                <td class="text-right">{{ item.investiment.toFixed(2) }}</td>
                                <td class="text-right">{{ item.investimentNow.toFixed(2) }}</td>
                                <td class="text-right">{{ item.pnl.toFixed(2) }}</td>
                                <td class="text-right">{{ item.mediumPrice.toFixed(2) }}</td>
                                <td class="text-right">{{ item.price }}</td>
                                <td class="text-right">{{ item.perc }}</td>
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
    name: 'MyAssets',
      components:{
          Bar
      },
    data(){
      return {
        search: '',
        walletFilter: '',
          categoryFilter: '',
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
                  align: 'left',
                  filterable: false,
              },
              {
                  text: 'Ativo',
                  value: 'asset.name',
                  align: 'center',
                  sortable: true,
                  filterable: true,
              },
              {
                  text: 'Carteira',
                  value: 'wallet',
                  align: 'left',
                  sortable: true,
                  filterable: true,
              },
              {
                  text: 'Categoria',
                  value: 'category',
                  align: 'left',
                  sortable: true,
                  filterable: false,
              },
              {
                  text: 'Quantidade',
                  value: 'category',
                  align: 'right',
                  sortable: true,
                  filterable: false,
              },
              {
                  text: 'Investimento',
                  value: 'asset.invesment',
                  align: 'right',
                  sortable: true,
                  filterable: false,
              },
              {
                  text: 'Investimento Atual',
                  value: 'asset.invesmentNow',
                  align: 'right',
                  sortable: true,
                  filterable: false,
              },
              {
                  text: 'L/P',
                  value: 'asset.invesmentNow',
                  align: 'right',
                  sortable: true,
                  filterable: false,
              },
              {
                  text: 'Preço medio',
                  value: 'category',
                  align: 'right',
                  sortable: true,
                  filterable: false,
              },
              {
                  text: 'Preço Atual',
                  value: 'asset.price',
                  align: 'right',
                  sortable: true,
                  filterable: false,
              },
              {
                  text: '%',
                  value: 'perc',
                  align: 'right',
                  filterable: false,
                  sortable: true,
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
      //await this.syncWalletAction()
      await this.breadcrumbInsertAction({
                disabled: false, 
                exact: false,
                href: '/meus-ativos',
                link: true,
                text: 'Meus Ativos',
                to: '/meus-ativos',
                level: 3
            })
    },
    computed: {
        ...mapGetters({
            getDashboard: 'dashboard/getDashboard',
            getCount: 'dashboard/getCount',
            getUsuario: 'usuario/usuarioGetter',
            getCategory: 'category/categoryGetter',
            brokerGetter: 'broker/brokerGetter',
            getAsset: 'asset/assetGetter',
            walletGetter: 'wallet/walletGetter',
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
        g() {
            let vm = this
            let labels = []
            let datasets = []
            let colors = []
            let d = {} 
            let total = 0

            this.getCount.forEach(function (element){
              total += element.total
            })
            if(total){
                this.getCount.forEach( (element) => {
                    //if(this.categoryFilter==element.category || this.categoryFilter == '' || this.categoryFilter == undefined) {
                    if(
                        (this.categoryFilter==element.category || this.categoryFilter == '' || this.categoryFilter == undefined) && 
                        (this.walletFilter==element.wallet || this.walletFilter == '' || this.walletFilter == undefined)
                    ) {
                        labels.push(element.name + ' ' + parseFloat((element.total/total)*100).toFixed(2) + '%')    
                        colors.push(vm.dynamicColors())
                        datasets.push(element.total)
                    }
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
        },
        assets() {
            let d = [] 
            let total = 0

            this.getCount.forEach(function (element){
              total += element.total
            })

            this.getCount.forEach( (element) => {
                console.log(this.walletFilter)
                if(
                    (this.categoryFilter==element.category || this.categoryFilter == '' || this.categoryFilter == undefined) && 
                    (this.walletFilter==element.wallet || this.walletFilter == '' || this.walletFilter == undefined)
                ) {

                    d.push({
                        asset:{name: element.name} ,
                        perc: parseFloat(parseFloat((element.total/total)*100).toFixed(2)),
                        investiment: element.total,
                        category: element.category,
                        wallet: element.wallet,
                        price: element.price,
                        amount: element.amount,
                        mediumPrice: element.total/element.amount,
                        investimentNow: element.price*element.amount,
                        pnl: (element.price*element.amount) - element.total
                    }) 
                }
            })
            console.log(d)

            if(d.length > 0 ){
                return d 
            } else {
                return [] 
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
            syncBrokerAction: 'broker/syncAction',
            syncAssetAction: 'asset/syncAction',
            syncWalletAction: 'wallet/syncAction',
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
