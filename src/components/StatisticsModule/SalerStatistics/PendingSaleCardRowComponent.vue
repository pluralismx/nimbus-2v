<template>
    <tr>
        <td>{{ product.product_name }}</td>
        <td>{{ product.quantity }}</td>
        <td>{{ product.price }}</td>
    </tr>
</template>
<script>
export default {
    name: "PendingSaleCardRowComponent",
    props: {
        product: {
            type: Object,
            required: true
        }
    }
}
</script>
<style scoped>
    tr {
        border: 1px solid var(--primary);
    }

    td {
        padding: .5rem;
        border: 1px solid var(--primary);
        text-align: center;
    }

    td:nth-child(1) {
        text-align: left;
    }
</style>