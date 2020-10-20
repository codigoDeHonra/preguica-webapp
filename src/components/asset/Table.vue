<template>
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
</template>

<script>
export default {
    name: 'AssetTable',
    components:{
    },
    props: [
        'items', 
        'search'
    ],
    data() {
        return {
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
        }
    },
    computed: {
        assets() {
            console.log('teste')
            let d = [] 
            let total = 0

            this.items.forEach(function (element){
              total += element.total
            })

            this.items.forEach( (element) => {
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
    }
}
</script>
