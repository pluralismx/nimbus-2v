<template>
    <tr>
        <td>{{ seller.seller_name }} {{ seller.seller_surname }}</td>
        <td>{{ seller.completed_sales }}</td>
        <td @click="showAprovalModal()">{{ seller.pending_sales }}</td>
        <td>{{ seller.incomplete_sales }}</td>
        <td>{{ seller.conversion_rate }}%</td>
        <td>${{ revenue }}</td>
    </tr>
</template>
<script>
export default {
    name: "SellerStatisticsRowComponent",
    props: {
        seller: {
            type: Object,
            required: true
        }
    },
    computed: {
        revenue() {
            let revenueValue = parseFloat(this.seller.revenue);
            let truncated = this.truncateDecimals(revenueValue);
            return truncated.toLocaleString('es-MX', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        }
    },
    methods: {
        showAprovalModal: function () {
            this.$emit('show-aproval-modal', this.seller.seller_id);
        },
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

    tr td:nth-child(3):hover {
        cursor: pointer;
        color: white;
        background-color: var(--warn);
    }
</style>