<template>
    <div>
        <v-container  fluid grid-list-md text-xs-center>
            <v-row>
                <v-col cols="12" sm="6" md="4">
                    <h3>Extrato de negociações</h3>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="2" sm="6" md="2">
                  <v-menu
                    ref="menu1"
                    v-model="pickerOpen"
                    :close-on-content-click="false"
                    :return-value.sync="beginDate"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="beginDate"
                        label="Data Inicial"
                        filled
                        prepend-icon="mdi-calendar"
                        readonly
                        v-on="on"
                        clearable
                      />
                    </template>
                    <v-date-picker v-model="beginDate" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="pickerOpen = false">Cancel</v-btn>
                      <v-btn text color="primary" @click="$refs.menu1.save(beginDate)">OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>

                <v-col cols="2" sm="6" md="2">
                  <v-menu
                    ref="menuEndDate"
                    v-model="menuOpenEndDate"
                    :close-on-content-click="false"
                    :return-value.sync="date"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        filled
                        label="Data Final"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-on="on"
                        v-model="endDate"
                      />
                    </template>
                    <v-date-picker v-model="endDate" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menuOpenEndDate = false">Cancel</v-btn>
                      <v-btn text color="primary" @click="$refs.menuEndDate.save(date)">OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
            </v-row>

            <v-row
                flex
                align-center
                justify-center
            >
                <v-col cols="4">
                    <v-select
                        :items="brokerGetter"
                        filled
                        clearable
                        item-text="name"
                        item-value="name"
                        label="Corretora"
                        v-model="brokerFilter"
                        prepend-icon="mdi-bank"
                        />
                </v-col>
                <v-col cols="4">
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
                <v-col cols="4">
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

        <v-dialog v-model="dialog" max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">Operação</span>
                </v-card-title>

                <v-card-text>
                    <v-row xs12 sm6 md4>
                        <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            :return-value.sync="trade.date"
                            transition="scale-transition"
                            offset-y
                        >
                            <template v-slot:activator="{ on }">
                                <v-flex xs12 sm6 md3>
                                    <v-text-field
                                        v-model="computedDateFormatted"
                                        label="Data"
                                        readonly
                                        v-on="on"
                                       filled 
                                    ></v-text-field>
                                </v-flex>
                            </template>
                            <v-date-picker v-model="date" no-title scrollable @input="menu = false"></v-date-picker>
                        </v-menu>
                    </v-row>
                    <v-row xs12 sm6 md3>
                        <v-select
                            :items="brokerGetter"
                            item-text="name"
                            item-value="_id"
                           filled 
                            label="Corretora"
                            v-model="trade.broker"
                            return-object
                        ></v-select>
                    </v-row>
                    <v-row xs12 sm6 md3>
                        <v-text-field
                            label="Payout"
                            placeholder="82"
                           filled 
                            v-model="trade.payout"
                        ></v-text-field>
                    </v-row>

                    <v-row xs12 sm6 md3>
                        <v-text-field
                            label="Quantidade"
                            placeholder="82"
                           filled 
                            v-model="trade.amount"
                        ></v-text-field>
                    </v-row>


                    <v-row xs12 sm6 md3>

                        <v-autocomplete
                            v-model="trade.asset"
                            item-text="name"
                            item-value="_id"
                            :items="getAsset"
                            filled 
                            dense
                            return-object
                            label="Outlined"
                            ></v-autocomplete>

                    </v-row>

                    <v-row xs12 sm6 md3>
                        <v-text-field
                            label="Investimento"
                            placeholder="1000"
                           filled 
                            v-model="trade.investiment"
                        ></v-text-field>
                    </v-row>
                    <v-btn dark color="red darken-1"  @click="loss()">Loss</v-btn>

                    {{total(trade).toFixed(2) }}
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn dark color="blue darken-1"  @click="close()">Cancelar</v-btn>
                    <v-btn dark v-if="!modalUpdate" color="blue darken-1"  @click="save()">Salvar</v-btn>
                    <v-btn dark v-if="modalUpdate" color="blue darken-1"  @click="update()">Atualizar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            filled
        />

        <extract-table 
            :items="tradesFiltered"
            :search="search"
            @update-trade="openUpdateModal"
        />
        <v-btn
            dark
            fab
            bottom 
            fixed
            right
            color="green"
            @click="dialog = true"
        >
            <v-icon>mdi-plus</v-icon>
        </v-btn>
        </v-container>
    </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import moment from 'moment';
  import vue from 'vue';
  import ExtractTable from '../components/extract/Table';

  export default {
    name: 'Extract',
      components:{
          ExtractTable
      },
    data(){
      return {
          endDate: '',
          beginDate: null,
          menuOpenEndDate: false,
          categoryFilter: '',
          brokerFilter: '',
          walletFilter: '',
          pickerOpen: false,
          search: '',
          fixedPayout: 0.0,
          fixedInvestiment: 2,
          initialInvestiment: 100.0,
          dialog: false,
          modalUpdate: false,
          tabActive: null,
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
      await this.syncWalletAction()
    },
    computed:{
        ...mapGetters({
            getDashboard: 'dashboard/getDashboard',
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
        tradesFiltered() {
            let d = [] 
            let total = 0

            this.getDashboard.trades.forEach(function (element){
              total += element.total
            })

            this.getDashboard.trades.forEach( (element) => {
                if(
                    (this.categoryFilter==element.asset.category.name || this.categoryFilter == '' || this.categoryFilter == undefined) &&
                    (this.walletFilter==element.wallet.name || this.walletFilter == '' || this.walletFilter == undefined) &&
                    (this.brokerFilter==element.broker.name || this.brokerFilter == '' || this.brokerFilter == undefined) &&
                    (moment(element.date).isSameOrAfter(this.beginDate) || this.beginDate == '' || this.beginDate == undefined) &&
                    (moment(element.date).isSameOrBefore(this.endDate) || this.endDate == '' || this.endDate == undefined)
                ) {
                    d.push({
                        assetObj:element.assetObj ,
                        asset:element.asset ,
                        broker: element.broker,
                        perc: parseFloat(parseFloat((element.total/total)*100).toFixed(2)),
                        /*investiment: element.total,*/
                        category: element.category,
                        wallet: element.wallet,
                        price: element.price,

                        _id: element._id,
                        date: element.date,
                        investiment:element.investiment,
                        pair:element.pair,
                        payout:element.payout,
                        usuarioId:element.usuarioId
                    }) 




                }
            })

            if(d.length > 0 ){
                return d 
            } else {
                return [] 
            }
        }
    },
    methods:{
        ...mapActions({
            syncTradesAction: 'dashboard/syncTradesAction',
            removeAction: 'dashboard/removeAction',
            updateAction: 'dashboard/updateAction',
            insertAction: 'dashboard/insertAction',
            removeAllAction: 'dashboard/removeAllAction',
            insertSessionAction: 'dashboard/insertSessionAction',
            removeAllSessionAction: 'dashboard/removeAllSessionAction',
            syncCategoryAction: 'category/syncAction',
            syncBrokerAction: 'broker/syncAction',
            syncAssetAction: 'asset/syncAction',
            syncWalletAction: 'wallet/syncAction',
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
