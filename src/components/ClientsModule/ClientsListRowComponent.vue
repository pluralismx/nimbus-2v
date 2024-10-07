<template>
    <!-- Data -->
    <tr v-show="!isVisibleEditRow">
        <td @click="edit()">{{ client.name }}</td>
        <td>{{ client.phone }}</td>
        <td>{{ client.email }}</td>
        <td>{{ client.lpf }} por año</td>
    </tr>
</template>
<script>
export default {
    name: "WalletRowComponent",
    props: {
        client: {
            type: Object,
            required: true
        }
    },
    methods: {
        edit(){
            this.$emit('edit-client', this.client);
        }
    }
}
</script>
<style scoped>

    td {
        padding: .5rem;
        text-align: center;
    }

    tr:hover{
        cursor: pointer;
    }


</style>