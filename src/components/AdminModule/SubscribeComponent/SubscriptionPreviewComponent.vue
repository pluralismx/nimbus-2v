<template>
<div class="settings-body">
        <div class="header">
            <h1>Resumen</h1>
            <p v-show="this.period_begins">Periodo del {{ this.period_begins }} al {{ this.period_end }}</p>
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
                        <td>${{ this.monthly_payment }}</td>
                    </tr>
                    <tr>
                        <td>Costo diario</td>
                        <td>${{ this.price_per_day }}</td>
                    </tr>
                    <tr>
                        <td>Periodo prorrateado</td>
                        <td>{{ this.prorated_period }} días</td>
                    </tr>
                    <tr>
                        <td>Subtotal</td>
                        <td>${{ this.prorated_charge }}</td>
                    </tr>
                    <tr>
                        <td>Impuestos</td>
                        <td>${{ this.taxes }}</td>
                    </tr>
                    <tr class="tr-total">
                        <td>Total a pagar</td>
                        <td>${{ this.total }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-show="showNotesMessage" class="footer">
            <h4>Notas:</h4>
            <br>
            <p>&#128073;&#127996; El servicio CRM se ha prorrateado para el período del <span class="span-attention">{{ selection.period_begins }}</span> al <span class="span-attention">{{ selection.period_end }}</span></p>
            <br>
            <p>&#128073;&#127996; El costo diario se ha calculado dividiendo el costo mensual entre el número de días del mes.</p>
            <br>
            <button class="btn-primary" @click="openProcessPaymentModal()">Proceder al pago</button>
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
        computed: {
            selectionComputed(){
                return this.selection;
            }
        },
        watch: {
            selectionComputed: {
                handler(newVal){
                    this.period_begins = newVal.period_begins;
                    this.period_end = newVal.period_end;
                    this.monthly_payment = newVal.monthly_payment;
                    this.price_per_day = newVal.price_per_day;
                    this.prorated_period = newVal.prorated_period;
                    this.prorated_charge = newVal.prorated_charge;
                    this.taxes = newVal.taxes;
                    this.total = newVal.total;
                    this.displayNotesMessage();
                }
            }
        },
        data() {
            return {
                period_begins: false,
                period_end: false,
                monthly_payment: 0,
                price_per_day: 0,
                prorated_period: 0,
                prorated_charge: 0,
                taxes: 0,
                total: 0,

                // Layout
                showNotesMessage: false
            }
        },
        methods: {
            openProcessPaymentModal: function () {
                this.$emit("open-card-information-modal");
            },
            displayNotesMessage: function () {
                let day = new Date(this.period_begins);
                if(day.getDate() != 15){
                    this.showNotesMessage = true;
                }
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
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    .header h1{
        font-size: 16px;
    }

    .header p{
        font-size: 10px;
    }
    
    table {
        width: 100%;
        border-collapse: collapse;
        font-size: 10px;
        margin-bottom: 2rem;
    }

    thead tr th{
        padding: .5rem .5rem;
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

    .span-attention {
        color: var(--warn);
    }

    .footer p{
        font-size: 10px;
    }

    button {
        font-size: 10px;
    }

    @media only screen and (min-width: 1024px) {
        .header {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            margin-top: 1rem;
            margin-bottom: 2rem;
            font-size: 14px;
        }

        .header h1{
            font-size: 1.5em;
        }

        table {
            font-size: 14px;
        }

        .footer p{
            font-size: 14px;
        }

        button {
            font-size: 14px;
        }
    }
</style>