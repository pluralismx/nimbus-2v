<template>
        <div class="title-bar-container">
            <h1>Cuentas por cobrar</h1>
            <div class="range-selection-container">
                <span @click="downloadExcel()" class="span-excel">descargar XCEL</span>
            </div>
        </div>

        <table>
            <thead>
                <tr>
                    <th>No. de factura</th>
                    <th>Fecha</th>
                    <th>Ultimo pago</th>
                    <th>Cliente</th>
                    <th>Valor</th>
                    <th>Pagado</th>
                    <th>Balance</th>
                    <th>30 días</th>
                    <th>60 días</th>
                    <th>90 días</th>
                    <th>Antigüedad</th>
                </tr>
            </thead>
            <tbody>
                <WalletRowComponent
                    v-for="client in wallet" :key="client.client_id" :client="client"
                    @open-invoice-modal="handleOpenInvoiceModal"
                />
            </tbody>
        </table>
        <ModalInvoiceDetailsComponent
            v-if="isVisibleInvoiceModal"
            @close-modal="toggleModal()"
            :invoice="invoiceEdit"
        />
</template>
<script>
import WalletRowComponent from './WalletRowComponent.vue'
import ModalInvoiceDetailsComponent from './ModalInvoiceDetailsComponent.vue'
export default {
    name: "WalletComponent",
    components: {
        WalletRowComponent,
        ModalInvoiceDetailsComponent
    },
    props: {
        wallet: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            isVisibleInvoiceModal: false,
            invoiceEdit: {}
        }
    },
    methods: {
        handleOpenInvoiceModal: function (invoice){
            console.log(invoice);
            this.invoiceEdit = invoice;
            this.toggleModal();
        },
        toggleModal: function () {
            if(this.isVisibleInvoiceModal==false){
                this.isVisibleInvoiceModal = true;
            }else{
                this.isVisibleInvoiceModal=false;
            }
        }
    }
}
</script>
<style scoped>
 h1 {
        font-size: 1.5em;
        margin-bottom: 8px;
    }

    .team-statistics-container {
        width: 100%;
        box-sizing: border-box;
    }

    .title-bar-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid black;
        margin-bottom: 1.5rem;
    }

    .range-selection-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .range-selection-container select {
        width: 110px;
    }

    .span-excel:hover {
        cursor: pointer;
        color: var(--primary);
    }

    table {
        width: 100%;
        border-collapse: collapse;
        box-shadow: 1px 1px 2px rgba(0,0,0,0.5);
        margin-bottom: 4rem;
    }

    thead tr {
        background-color: var(--primary);
        color: var(--shadows);
    }
    th {
        color: var(--basic);
        padding: .5rem;
    }

    tbody tr:nth-child(odd){
        background-color: var(--accent);
    }

    tbody tr:nth-child(even){
        background-color: var(--basic);
    }
</style>