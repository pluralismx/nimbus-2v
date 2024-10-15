<template>
    <tr @click="openDetails()">
        <td>{{ invoice.invoice_number }}</td>
        <td>{{ invoice.date }}</td>
        <td>{{ invoice.client }}</td>
        <td>${{ invoice.total }}</td>
    </tr>
</template>
<script>
export default {
    name: "SettledAccountRowComponent",
    props: {
        invoice: {
            type: Object,
            required: true
        }
    },
    methods: {
        openDetails: function (){
            this.$emit("show-details", this.invoice);
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