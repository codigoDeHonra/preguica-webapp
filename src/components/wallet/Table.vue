<template>
    <v-data-table
        :headers="headers"
        :items="items"
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
</template>
<script>
export default {
    name:'WalletTable',
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
    props:['items'],
    async created() {
      await this.syncWalletAction()
      await this.syncWalletCountAction()
    },
    computed: {
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
            this.$emit('delete-wallet', item)
            //const index = this.walletGetter.indexOf(item)
            // console.log(item)
            //item.index = index
            //confirm('Tem certeza?') && this.removeAction(item)
        },
        openUpdateModal (item) {
            this.$emit('update-wallet', item)

            //const index = this.walletGetter.indexOf(item)
            //this.walletItem = this.walletGetter[index]
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
