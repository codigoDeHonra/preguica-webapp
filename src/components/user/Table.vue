<template>
    <div>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Pesquisa"
            single-line
            hide-details
            filled
        />
    <v-data-table
        :headers="headers"
        :items="items"
        class="elevation-1"
        :must-sort="true"
        :search="search"
    >
        <template v-slot:item="{ item }">
            <tr>
                <td class="text-xs-left">{{ item.name }}</td>
                <td class="text-xs-left">{{ item.email }}</td>
                <td class="text-xs-left">
                    <v-icon
                        v-if="item.active"
                        color="green"
                    >
                        mdi-check
                    </v-icon>

                    <v-icon
                        v-if="!item.active"
                        color="gray"
                    >
                        mdi-close
                    </v-icon>

                </td>
                <td class="justify-center layout px-0">
                    <v-icon
                        small
                        class="mr-2"
                        @click="$emit('user-update', item)"
                    >
                        mdi-pencil
                    </v-icon>
                    <v-icon
                        small
                        class="mr-2"
                        @click="$emit('user-remove', item)"
                    >
                        mdi-delete
                    </v-icon>
                    <v-icon
                        v-if="!item.active"
                        small
                        class="mr-2"
                        @click="$emit('user-activate', item)"
                    >
                        mdi-check-outline
                    </v-icon>
                    <v-icon
                        v-if="item.active"
                        small
                        class="mr-2"
                        @click="$emit('user-deactivate', item)"
                    >
                        mdi-close-outline
                    </v-icon>

                </td>
            </tr>
        </template>
    </v-data-table>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'TableUser',
    data() {
        return {
            search: '',
            name: '', 
            headers: [
              {
                  text: 'nome',
                  value: 'name',
                  sortable: false,
                  align: 'left'
              },
              {
                  text: 'email',
                  value: 'email',
                  sortable: false,
                  align: 'left'
              },
              {
                  text: 'ativo',
                  sortable: false,
                  align: 'left'
              },
              {
                  text: 'ações',
                  sortable: false,
                  align: 'center'
              },
            ]
        }
    },
    props: ['items'],
    created(){
    },
    computed: {
        ...mapGetters({
            usuarioGetter: 'usuario/usuarioGetter',
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
            insertUserAction: 'usuario/insertUserAction',
        }),
        submit() {
            const user = { name: this.name, email: this.email, password: this.password };
            this.insertUserAction(user);
        },
    }
}
</script>
