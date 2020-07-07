<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="items"
            class="elevation-1"
            :must-sort="true"
            :search="search"
        >
            <template  v-slot:item="{ item, index }">
                <tr>
                    <td class="text-xs-left">{{ index +1}}</td>
                    <td class="text-xs-left">{{ item.date | dateFormat}}</td>
                    <td class="text-xs-left">{{ item.asset.name }}</td>
                    <td class="text-xs-left">{{ item.wallet.name }}</td>
                    <td class="text-xs-left">{{ item.broker.name }}</td>
                    <td class="text-xs-left">{{ item.asset.category.name }}</td>
                    <td class="text-right">{{ item.investiment | money }}</td>
                    <!--td class="text-xs-right">{{ item.payout }}</td>
                    <td :class="[item.payout > 0 ? 'green': 'red', 'lighten-5 justify-center']">
                        {{ total(item).toFixed(2) }}
                    </td-->
                    <td class="text-center">
                        <v-icon
                            class="mr-2"
                            @click="openUpdateModal(item)"
                            color="blue"
                        >
                            mdi-pencil
                        </v-icon>
                        <v-icon
                            @click="deleteItem(item)"
                            color="red"
                        >
                            mdi-delete
                        </v-icon>
                    </td>
                </tr>
            </template>
        </v-data-table>
    </div>
</template>

<script>
  import moment from 'moment';
  import vue from 'vue';
  import money from '../../filters/money';

  export default {
    name: 'ExtractTable',
    data(){
      return {
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
                  text: 'Data',
                  value: 'date',
                  sortable: true
              },
              {
                  text: 'Ativo',
                  value: 'assetObj.name',
                  align: 'left',
                  sortable: true 
              },
              {
                  text: 'Carteira',
                  value: 'wallet.name',
                  align: 'left',
                  sortable: false
              },
              {
                  text: 'Corretora',
                  value: 'asset.name',
                  align: 'left',
                  sortable: false
              },
              {
                  text: 'Categoria',
                  value: 'asset.name',
                  align: 'left',
                  sortable: false
              },
              {
                  text: 'Investimento',
                  value: 'invesment',
                  align: 'right',
                  sortable: true 
              },
              {
                  text: 'Ações',
                  value: null,
                  align: 'center',
                  sortable: false
              },
              /*{
                  text: 'payout',
                  value: 'payout',
                  align: 'right',
                  sortable: false
              },
              {
                  text: 'Ganho/Perda',
                  value: 'total',
                  align: 'center',
                  sortable: false
              },*/
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
    props:[
        'items',
        'search',
    ],
    filters: {
      dateFormat: function (value) {
          moment.locale('pt-br')
          return moment(value).format('DD-MM-YYYY')
      },
      money
    },
    computed:{
        currentInvestiment(){
            return this.pnl() + parseFloat(this.initialInvestiment)
        },
        entry(){
            return this.initialInvestiment * (this.fixedInvestiment/100)
        },
        computedDateFormatted () {
            return this.formatDate(this.date)
        }
    },
    methods:{
        openInsertModal () {
            this.trade = Object.assign({}, this.defaultValues())
            this.modalUpdate = false
            this.dialog = true
        },
        openUpdateModal (item) {
            this.$emit('update-trade', item)

            /*this.modalUpdate = true
            const index = this.getDashboard.trades.indexOf(item)
            this.trade = this.getDashboard.trades[index]
            this.trade.index = index

            this.dialog = true*/
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
