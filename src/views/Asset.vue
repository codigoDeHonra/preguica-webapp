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
                xs12
                sm4
                elevation-6
            >
                <v-card class="green darken-4 justify-center">
                    <v-layout
                        row
                        align-center
                        justify-center
                    >
                    </v-layout>
                    <v-card-text class="pt-4 white">
                        <div>
                            <h3>Asset: {{ this.assetItem.name }}</h3>
                            <v-form
                                ref="form"
                                v-model="valid"
                            >
                                <v-flex xs12 >
                                    <v-select
                                        :items="getCategory"
                                        filled
                                        item-text="name"
                                        item-value="_id"
                                        label="Categoria"
                                        v-model="assetItem.category"
                                        return-object
                                    ></v-select>
                                </v-flex>
                                <v-text-field
                                    v-model="assetItem.name"
                                    filled
                                    required
                                    label="Nome"
                                />
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
            <v-col>
                <v-data-table
                    :headers="headers"
                    :items="assetGetter"
                    class="elevation-1"
                    :must-sort="true"
                >
                <template v-slot:item="{ item }">
                        <tr >
                            <td class="text-xs-left">{{ item.name }}</td>
                            <td class="text-xs-left">{{ item.category !== null ? item.category.name : '-' }}</td>
                            <td class="justify-center layout px-0">
                                <v-icon
                                    small
                                    class="mr-2"
                                    @click="openUpdateModal(item)"
                                >
                                    edit
                                </v-icon>
                                <v-icon
                                    small
                                    @click="deleteItem(item)"
                                >
                                    delete
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
    name:'Asset',
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
                      text: 'Categoria',
                      value: 'category',
                      sortable: false,
                      align: 'left'
                  },
            ],
            assetItem: {}
        };
    },
    async created() {
      await this.syncAssetAction()
      await this.syncCategoryAction()
    },
    computed: {
        ...mapGetters({
            assetGetter: 'asset/assetGetter',
            getCategory: 'category/categoryGetter',
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
        }),
        submit() {
            const asset = { 
                _id: this.assetItem._id, 
                name: this.assetItem.name, 
                category: this.assetItem.category, 
            };

            if(this.assetItem._id) {
                this.updateAssetAction(asset);
            } else {
                this.insertAssetAction(asset);
            }

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
