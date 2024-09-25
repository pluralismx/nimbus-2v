<template>
    <!-- Data -->
    <tr v-show="!isVisibleEditRow">
        <td @click="edit()">{{ clientData.name }}</td>
        <td>{{ clientData.phone }}</td>
        <td>{{ clientData.email }}</td>
        <td>{{ clientData.lpf }} por año</td>
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
    watch: {
        client: {
            handler(newVal){
                console.log(newVal);
                this.clientData = newVal;
            },
            immediate: true,
            deep: true
        }
    },
    data(){
        return{
            clientData: {},
            isVisibleEditRow: false
        }
    },
    methods: {
        openInvoiceDetails: function () {
            this.$emit('open-invoice-modal', this.client);
        },
        edit(){
            this.$emit('edit-client', this.clientData.id);
        }
    }
}
</script>
<style scoped>

    td {
        padding: .5rem;
        text-align: center;
    }



</style>