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
                <v-subheader><h2>Importar CEI</h2></v-subheader>
            </v-col>
            <v-col
                cols="6"
            >
                <v-card class="green darken-4 justify-center">
                    <v-card-text class="pt-4 white">
                        <div>
                            <!--h3>Asset: {{ this.assetItem.name }}</h3-->
                            <v-form
                                ref="form"
                                v-model="valid"
                            >
                                <v-flex xs12 >
                                    <v-select
                                        :items="brokerGetter"
                                        filled
                                        item-text="name"
                                        item-value="_id"
                                        label="Corretora"
                                        v-model="broker"
                                    ></v-select>
                                </v-flex>
                                <v-file-input v-model="file" label="Arquivo"></v-file-input>
                                <v-layout justify-space-between>
                                    <v-btn
                                        :class=" { 'green darken-4 white--text' : valid, disabled: !valid }"
                                        color="teal lighten-1"
                                        dark
                                        @click="submit()"
                                    >
                                     {{ this.assetItem._id ? 'Atualizar': 'Cadastrar' }}
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
            <v-col cols="6">
                <v-data-table
                    :headers="headers"
                    :items="assetGetter"
                    class="elevation-1"
                    :must-sort="true"
                >
                <template v-slot:item="{ item }">
                        <tr >
                            <td class="text-xs-left">{{ item.name }}</td>
                            <td class="text-xs-left">{{ item.amount }}</td>
                            <td class="text-xs-left">{{ item.price }}</td>
                            <td class="text-xs-left">{{ item.category !== null ? item.category.name : '-' }}</td>
                            <td class="justify-center layout px-0">
                                <v-icon
                                    small
                                    class="mr-2"
                                    @click="openUpdateModal(item)"
                                >
                                    mdi-pencil
                                </v-icon>
                                <v-icon
                                    small
                                    @click="deleteItem(item)"
                                >
                                    mdi-delete
                                </v-icon>
                                <v-btn
                                    text
                                    :to="{
                                        name: 'asset-details',
                                        params: { code: item.name} 
                                        }">
                                    <v-icon small >
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
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name:'Asset',
    data() {
        return {
            valid: true,
            name: '',
            file: '',
            broker: '',
            category: '',
            assetItem: {},
            headers:[
                  {
                      text: 'Nome',
                      value: 'name',
                      sortable: true,
                      align: 'left'
                  },
                {
                      text: 'Quantidade',
                      value: 'name',
                      sortable: true,
                      align: 'left'
                  },
                  {
                      text: 'Preço',
                      value: 'name',
                      sortable: true,
                      align: 'left'
                  },
                  {
                      text: 'Categoria',
                      value: 'category',
                      sortable: false,
                      align: 'left'
                  },
                  {
                      text: 'Ações',
                      value: null,
                      sortable: false,
                      align: 'center'
                  },
            ],
        };
    },
    async created() {
      await this.syncAssetAction()
      //await this.syncAssetShowAction()
      await this.syncCategoryAction()
    },
    computed: {
        ...mapGetters({
            assetGetter: 'asset/assetGetter',
            getCategory: 'category/categoryGetter',
            brokerGetter: 'broker/brokerGetter',
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
            insertAssetAction: 'asset/insertAction',
            syncAssetAction: 'asset/syncAction',
            removeAction: 'asset/removeAction',
            updateAssetAction: 'asset/updateAction',
            syncCategoryAction: 'category/syncAction',
            syncAssetShowAction: 'asset/showAction',
            insertTradeImportCEIAction: 'dashboard/insertImportCEIAction',
        }),
        submit() {
            let formData = new FormData();

            formData.append('file', this.file);
            formData.append('broker', this.broker);
            this.insertTradeImportCEIAction(formData);
        },
        deleteItem (item) {
            const index = this.assetGetter.indexOf(item)
            // console.log(item)
            item.index = index
            confirm('Tem certeza?') && this.removeAction(item)
        },
        openUpdateModal (item) {
            const index = this.assetGetter.indexOf(item)
            this.assetItem = this.assetGetter[index]
        },
        reset () {
            this.assetItem = {} 
        },
    }
}
</script>
