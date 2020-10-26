<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="items"
            class="elevation-1"
            :must-sort="true"
            :search="search"
        >
            <template  v-slot:item="{ item }">
                <tr >
                    <td class="text-xs-left">{{ item.name }}</td>
                    <td class="text-xs-left">{{ item.default }}</td>
                    <td class="text-right px-0">
                        <v-icon
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
    </div>
</template>
<script>
export default {
    name:'Profile',
    props:['items'],
    data() {
        return {
            valid: true,
            name: '',
            headers:[
                  {
                      text: 'Nome',
                      value: 'name',
                      sortable: false,
                      align: 'left'
                  },
                  {
                      text: 'Padrão',
                      value: 'default',
                      sortable: false,
                      align: 'left'
                  },
                  {
                      text: 'Ações',
                      value: null,
                      sortable: false,
                      align: 'right'
                  },
            ],
            profileItem: {
                name: '',
                default: false
            }
        };
    },
}
</script>
