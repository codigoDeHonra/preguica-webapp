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
            <v-subheader><h2>Ativo: {{ $route.params.code}}</h2></v-subheader>
            </v-col>
            <v-col cols="6">
                <v-card>
                    <v-card-text>
                        nome: {{getAssetItem.name}}
                        preço: {{getAssetItem.price}}
                        categoria: {{getAssetItem.category.name}}
                        <v-btn target="blank" :href="`https://statusinvest.com.br/acoes/${getAssetItem.name}`">
                            StatusInvest
                        </v-btn>
                        <v-btn 
                            target="blank" 
                            :href="`https://www.fundamentus.com.br/detalhes.php?papel=${getAssetItem.name}`">
                            Fundamentus
                        </v-btn>
                        <v-btn 
                            target="blank" 
                            :href="`https://www.fundsexplorer.com.br/funds/${getAssetItem.name}`">
                            Fundsexplorer
                        </v-btn>
                        <v-btn 
                            target="blank" 
                            :href="`https://www.sunoresearch.com.br/acoes/${getAssetItem.name}`">
                           Suno 
                        </v-btn>
                        <v-btn 
                            target="blank" 
                            :href="`https://www.google.com/search?q=${getAssetItem.name}&tbm=fin`">
                           Google 
                        </v-btn>
                        <v-btn 
                            target="blank" 
                            :href="`https://www.tradingview.com/symbols/BMFBOVESPA-${getAssetItem.name}`">
                          Tradingview 
                        </v-btn>
                       
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12">
                            <v-form
                                ref="form"
                                v-model="valid"
                            >
                                <v-text-field
                                    v-model="studyItem.name"
                                    filled
                                    required
                                    label="Nome"
                                />
                                    <v-textarea 
                                        v-model="studyItem.description"
                                        filled
                                        label="Descrição"
                                    >
                                    </v-textarea>
                                <v-layout justify-space-between>
                                    <v-btn
                                        :class=" { 'green darken-4 white--text' : valid, disabled: !valid }"
                                        color="teal lighten-1"
                                        dark
                                        @click="submit()"
                                    >
                                     {{ this.studyItem._id ? 'Atualizar': 'Cadastrar' }}
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
            </v-col>
            <v-col cols="12">
                <v-data-table
                    :headers="headers"
                    :items="getStudy"
                    class="elevation-1"
                    :must-sort="true"
                >
                <template v-slot:item="{ item }">
                        <tr >
                            <td class="text-xs-left">{{ item.name }}</td>
                            <td class="text-xs-left">{{ item.description }}</td>
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
                                        path: '/ativo/:code/detalhes',
                                        params: {code: item.name} 
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
            category: '',
            headers:[
                  {
                      text: 'Nome',
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
            studyItem: {}
        };
    },
    async created() {
      await this.syncAssetAction()
      await this.syncCategoryAction()
      await this.syncAssetShowAction({ code: this.$route.params.code })
      await this.syncStudyAction({ code: this.$route.params.code })
    },
    computed: {
        ...mapGetters({
            assetGetter: 'asset/assetGetter',
            getCategory: 'category/categoryGetter',
            getAssetItem: 'asset/assetItemGetter',
            getStudy: 'study/studyGetter',
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
            syncAssetShowAction: 'asset/showAction',
            removeAction: 'asset/removeAction',
            updateAssetAction: 'asset/updateAction',
            syncCategoryAction: 'category/syncAction',
            syncStudyAction: 'study/syncAction',
            insertStudyAction: 'study/insertAction',
            updateStudyAction: 'study/updateAction',
        }),
        submit() {
            const study = { 
                "name": this.studyItem.name,
                "description": this.studyItem.description,
                "asset_code":this.$route.params.code ,
                //"asset_id": this.getAssetItem[0]._id
            };

            if(this.studyItem._id) {
                this.updateStudyAction(study);
            } else {
                this.insertStudyAction(study);
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
            this.studyItem = this.assetGetter[index]
        },
        reset () {
            this.studyItem = {} 
        },
    }
}
</script>
