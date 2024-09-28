<template>
    <tr>
        <td>{{ product.name }}</td>
        <td>{{ product.quantity }}</td>
        <td>${{ revenue }}</td>
        <td>{{ product.revenue_percentage }}%</td>
        <td>{{ product.sales_percentage }}%</td>
    </tr>
</template>
<script>
export default {
    name: "ProductStatisticsRowComponent",
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    computed: {
        revenue() {
            let truncated = this.truncateDecimals(this.product.revenue);
            return truncated.toLocaleString('es-MX', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        }
    },
    methods: {
        truncateDecimals: function (number, digits = 2) {
            const factor = Math.pow(10, digits);
            const truncated = Math.round(number * factor) / factor;
            return parseFloat(truncated.toFixed(digits));
        },
    }
}
</script>
<style scoped>
    tbody td {
        padding: .5rem;
        text-align: center;
    }
</style>