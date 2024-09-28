<template>
    <tr>
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
    }
}
</script>
<style>
    td {
        padding: .5rem;
        text-align: center;
    }
</style>