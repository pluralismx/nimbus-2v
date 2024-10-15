<template>
    <tr @click="openInvoiceDetails()">
        <td>{{ client.invoice_number }}</td>
        <td>{{ client.date }}</td>
        <td>{{ client.last_payment_date }}</td>
        <td>{{ client.client_name }}</td>
        <td>${{ client.total }}</td>
        <td>${{ client.paid }}</td>
        <td>${{ client.balance }}</td>
        <td>${{ client.thirty }}</td>
        <td>${{ client.sixty }}</td>
        <td>${{ client.ninety }}</td>
        <td>{{ client.tenure }} días</td>
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
        openInvoiceDetails: function () {
            this.$emit('open-invoice-modal', this.client);
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