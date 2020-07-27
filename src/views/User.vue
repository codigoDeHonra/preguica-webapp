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
            <v-subheader><h2>{{$route.meta.title}}</h2></v-subheader>
            </v-col>
            <v-col
                cols="6"
            >
                <v-card class="green darken-4 justify-center">
                    <v-card-text class="pt-4 white">
                        <div>
                            <UserForm />
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="6">
                <user-table :items="usersGetter"/>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import UserTable from '../components/user/Table'
import UserForm from '../components/user/Form'

export default {
    name:'UserView',
    components: {
        UserTable,
        UserForm
    },
    data() {
        return {
            valid: true,
            name: '',
            category: '',
            assetItem: {},
        };
    },
    async created() {
      await this.syncAssetAction()
      await this.syncCategoryAction()
      await this.syncCompanyAssetsAction()
      await this.syncUsersAction()
    },
    computed: {
        ...mapGetters({
            assetGetter: 'asset/assetGetter',
            getCategory: 'category/categoryGetter',
            getCompanyAssets: 'company/companyAssetsGetter',
            usersGetter: 'usuario/usersGetter',
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
            syncCompanyAssetsAction: 'company/syncCompanyAssetsAction',
            syncUsersAction: 'usuario/syncUsersAction',
        }),
        submit() {
            const asset = { 
                _id: this.assetItem._id, 
                name: this.assetItem.name, 
                category: this.assetItem.category, 
                price: this.assetItem.price 
            };

            if(this.assetItem._id) {
                this.updateAssetAction(asset);
            } else {
                this.insertAssetAction(asset);
            }
        },
        deleteItem (item) {
            const index = this.assetGetter.indexOf(item)
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
