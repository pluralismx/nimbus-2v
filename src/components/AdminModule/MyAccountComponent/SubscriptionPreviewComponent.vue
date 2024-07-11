<template>
<div class="settings-body">
        <div class="header">
            <h1>Resumen</h1>
            <p>Periodo del {{ selection.period_begins }} al {{ selection.period_end }}</p>
        </div>
        <div class="details">
            <table>
                <thead>
                    <tr>
                        <th>Concepto</th>
                        <th>Detalle</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Costo mensual</td>
                        <td>${{ selection.monthly_payment }}</td>
                    </tr>
                    <tr>
                        <td>Costo diario</td>
                        <td>${{ selection.price_per_day }}</td>
                    </tr>
                    <tr>
                        <td>Periodo prorrateado</td>
                        <td>{{ selection.prorated_period }} días</td>
                    </tr>
                    <tr>
                        <td>Subtotal</td>
                        <td>${{ selection.prorated_charge }}</td>
                    </tr>
                    <tr>
                        <td>Impuestos</td>
                        <td>${{ selection.taxes }}</td>
                    </tr>
                    <tr class="tr-total">
                        <td>Total a pagar</td>
                        <td>${{ selection.total }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="footer">
            
            <p>Notas:</p>
            <br>
            <p> - El servicio CRM se ha prorrateado para el período del {{ selection.period_begins }} al {{ selection.period_end }}</p>
            <br>
            <p> - El costo diario se ha calculado dividiendo el costo mensual entre el número de días del mes.</p>
            <br>
            <button class="btn-primary" @click="openProcessPaymentModal()">Pay</button>
        </div>
    </div>
</template>
<script>
    export default {
        name: "SubscriptionPreviewComponent",
        props: {
            selection: {
                type: Object,
                required: true
            }
        },
        methods: {
            openProcessPaymentModal: function () {
                this.$emit("open-card-information-modal");
            }
        }
    }
</script>
<style scoped>
    .settings-body {
        padding: 1rem;
        padding-top: 0;
        background-color: #d2d8db;
        border-radius: .5rem
    }
    .header {
        margin: 1rem 0;
    }
    .header h1 {
        margin-bottom: 1rem;
    }
    table {
        width: 100%;
        border-collapse: collapse;
        font-size: 14px;
        margin-bottom: 2rem;
    }
    thead tr th{
        padding: 4px .5rem;
        background-color: var(--primary);
        color: var(--basic);
    }

    thead tr th:nth-child(1){
        text-align: left;
    }

    .tr-total {
        border-top: 1px solid black;
    }

    tbody tr td {
        padding: .5rem .5rem;
    }

    tbody tr td:nth-child(2) {
        text-align: center;
    }


</style>