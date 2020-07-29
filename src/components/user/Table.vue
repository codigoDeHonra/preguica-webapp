<template>
    <v-data-table
        :headers="headers"
        :items="items"
        class="elevation-1"
        :must-sort="true"
    >
        <template v-slot:item="{ item }">
            <tr>
                <td class="text-xs-left">{{ item.name }}</td>
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
                        @click="$emit('user-remove', item)"
                    >
                        mdi-delete
                    </v-icon>
                </td>
            </tr>
        </template>
    </v-data-table>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'TableUser',
    data() {
        return {
            name: '', 
            headers: [
              {
                  text: 'nome',
                  sortable: false,
                  align: 'left'
              },
              {
                  text: 'ações',
                  sortable: false,
                  align: 'left'
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
