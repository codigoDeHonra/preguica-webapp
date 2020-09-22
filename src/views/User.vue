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
                cols="4"
            >
                <v-card class="green darken-4 justify-center">
                    <v-card-text class="pt-4 white">
                        <div>
                            <UserForm 
                                @user-insert="submit"
                                v-model="userItem"
                            />
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="6">
                <user-table 
                    @user-remove="deleteItem"
                    @user-update="openUpdateModal"
                    @user-deactivate="deactivate"
                    @user-activate="activate"

                    :items="usersGetter"
                />
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
            userItem: {},
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
            insertUserAction: 'usuario/insertUserAction',
            removeUserAction: 'usuario/removeUserListAction',
            updateUserAction: 'usuario/updateAction',
            deactivateUserAction: 'usuario/deactivateAction',
            activateUserAction: 'usuario/activateAction',

        }),
        activate(val) {
            val.active = true
            this.activateUserAction(val)
        },
        deactivate(val) {
            val.active = false 
            this.deactivateUserAction(val)
        },
        submit () {
            const user = { 
                _id: this.userItem._id, 
                name: this.userItem.name, 
                email: this.userItem.email, 
                password: this.userItem.password,
                redirect: false,
                userSync: true
            };

            console.log(user)

            if(user._id) {
                this.updateUserAction(user);
            } else {
                this.insertUserAction(user);
            }
        },
        deleteItem (item) {
            const index = this.usersGetter.indexOf(item)
            item.index = index
            confirm('Tem certeza?') && this.removeUserAction(item)
        },
        openUpdateModal (item) {
            const index = this.usersGetter.indexOf(item)
            this.userItem = this.usersGetter[index]
        },
        reset () {
            this.userItem = {} 
        },
    }
}
</script>
