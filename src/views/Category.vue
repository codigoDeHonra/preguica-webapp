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
            <v-col
                cols="12"
            >
            <v-subheader><h3>Categoria</h3></v-subheader>
            </v-col>
            <v-col
                xs12
                sm4
                elevation-6
            >
                <v-card class="green darken-4 justify-center">
                    <v-card-text class="pt-4 white">
                        <div>
                            <h3>Categoria: {{ this.categoryItem.name }}</h3>
                            <v-form
                                ref="form"
                                v-model="valid"
                            >
                                <v-select
                                    :items="walletGetter"
                                    filled
                                    item-text="name"
                                    item-value="_id"
                                    label="Carteira"
                                    v-model="categoryItem.get_wallet"
                                    return-object
                                />
                                <v-text-field
                                    v-model="categoryItem.name"
                                    required
                                    filled 
                                    label="Nome"
                                />
                                <v-text-field
                                    v-model="categoryItem.percentageInWallet"
                                    required
                                    filled 
                                    label="% na Carteira"
                                />
                                <v-layout justify-space-between>
                                    <v-btn
                                        :class=" { 'green darken-4 white--text' : valid, disabled: !valid }"
                                        color="teal lighten-1"
                                        dark
                                        @click="submit()"
                                    >
                                     {{ this.categoryItem._id ? 'Atualizar': 'Cadastrar' }}
                                    </v-btn>
                                    <v-btn
                                        color="red"
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
                xs12
                sm4
                elevation-6
            >
        <v-data-table
            :headers="headers"
            :items="categoryGetter"
            class="elevation-1"
            :must-sort="true"
        >
        <template  v-slot:item="{item}">
                <tr >
                    <td class="text-xs-left">{{ item.name }}</td>
                    <td class="text-xs-left">{{ item.get_wallet.name }}</td>
                    <td class="text-xs-left">{{ item.percentageInWallet }}</td>
                    <td class="justify-center layout px-0">
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

export default {
    name:'Category',
    data() {
        return {
            valid: true,
            e1: 'visibility',
            password: '',
            senhaRules: [
                v => !!v || 'Preencher Senha!',
            ],
            name: '',
            headers:[
                  {
                      text: 'Nome',
                      value: 'name',
                      sortable: false,
                      align: 'left'
                  },
                  {
                      text: 'Carteira',
                      value: 'wallet',
                      sortable: false,
                      align: 'left'
                  },
                  {
                      text: '% na Carteira',
                      value: 'percentageInWallet',
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
            categoryItem: {}
        };
    },
    async created() {
      await this.syncCategoryAction()
      await this.syncWalletAction()
    },
    computed: {
        ...mapGetters({
            categoryGetter: 'category/categoryGetter',
            walletGetter: 'wallet/walletGetter',
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
            insertCategoryAction: 'category/insertAction',
            syncCategoryAction: 'category/syncAction',
            removeAction: 'category/removeAction',
            updateCategoryAction: 'category/updateAction',
            syncWalletAction: 'wallet/syncAction',
        }),
        submit() {
            const category = { 
                _id: this.categoryItem._id, 
                name: this.categoryItem.name, 
                wallet: this.categoryItem.get_wallet ? this.categoryItem.get_wallet: this.categoryItem.wallet , 
                percentageInWallet: this.categoryItem.percentageInWallet,
            };

            if(this.categoryItem._id) {
                this.updateCategoryAction(category);
            } else {
                this.insertCategoryAction(category);
            }

        },
        deleteItem (item) {
            const index = this.categoryGetter.indexOf(item)
            // console.log(item)
            item.index = index
            confirm('Tem certeza?') && this.removeAction(item)
        },
        openUpdateModal (item) {
            const index = this.categoryGetter.indexOf(item)
            this.categoryItem = this.categoryGetter[index]
        },
        reset () {
            this.categoryItem = {} 
        },
    }
}
</script>
