<template>
        <div class="title-bar-container">
            <div class="title-container">
                <img src="../../assets/images/wallet.png">
                <h1 @click="switchWallet()">Cuentas por cobrar</h1>
            </div>
            
            <span>Valor: ${{ value }}</span>
            <span>Balance: ${{ balance }}</span>
            <span>Pagado: ${{ paid }}</span>
            <div class="range-selection-container">
                <span @click="downloadExcel()" class="span-excel">descargar XCEL</span>
            </div>
        </div>

        <table>
            <thead>
                <tr>
                    <th>No. de factura</th>
                    <th>Fecha</th>
                    <th>Último pago</th>
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
                    v-for="client in walletData" :key="client.client_id" :client="client"
                    @open-invoice-modal="handleOpenInvoiceModal"
                />
                <tr v-if="walletData.length === 0">
                    <td colspan="11" style="text-align: center;">No tienes cuentas por cobrar</td>
                </tr>
            </tbody>
        </table>
        <ModalInvoiceDetailsComponent
            v-if="isVisibleInvoiceModal"
            @close-modal="toggleModal()"
            @invoice-payment="handleInvoicePayment"
            :invoice="invoiceEdit"
        />
</template>
<script>
import axios from '@/lib/axios'
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
            required: true,
        },
        totals: {        
            type: Object,
            required: true
        }
    },
    watch: {
        wallet: {
            handler(newVal) {
                this.walletData = newVal;
            },
            immediate: true
        }
    },
    computed: {
        value() {
            let valueValue = parseFloat(this.totals.value) || 0;
            let truncated = this.truncateDecimals(valueValue);
            return truncated.toLocaleString('es-MX', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        },
        paid() {
            let paidValue = parseFloat(this.totals.paid) || 0;
            let truncated = this.truncateDecimals(paidValue);
            return truncated.toLocaleString('es-MX', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        },
        balance() {
            let balanceValue = parseFloat(this.totals.balance) || 0;
            let truncated = this.truncateDecimals(balanceValue);
            return truncated.toLocaleString('es-MX', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        }
    },
    data() {
        return {
            isVisibleInvoiceModal: false,
            invoiceEdit: {},
            walletData: [],
        }
    },
    methods: {
        truncateDecimals: function (number, digits = 2) {
            const factor = Math.pow(10, digits);
            const truncated = Math.floor(number * factor) / factor;
            return truncated;
        },
        handleOpenInvoiceModal: function (invoice){
            this.invoiceEdit = invoice;
            this.toggleModal();
        },
        toggleModal: function () {
            if(this.isVisibleInvoiceModal==false){
                this.isVisibleInvoiceModal = true;
            }else{
                this.isVisibleInvoiceModal=false;
            }
        },
        handleInvoicePayment: function (notification){
            this.$emit('invoice-payment', notification);
        },
        downloadExcel: async function () {
            axios({
                url: 'api/clients/downloadWallet',
                method: 'GET',
                responseType: 'blob',
                withCredentials: true
            })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'cuentas_por_cobrar.xlsx');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                this.$emit("excel-downloaded", {
                    "status": "success",
                    "text": "Excel descargado exitosamente"
                });
            })
            .catch(error => {
                console.error(error);
                this.$emit("excel-downloaded", {
                    "status": "error",
                    "text": "No se pudo descargar el archivo"
                });
            });
        },
        switchWallet: function (){
            this.$emit("switch-wallet");
        },
    }
}
</script>
<style scoped>

    .title-container {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
    }

    .title-container img {
        width: 22px;
        margin-right: .5rem;
    }

    h1 {
        font-size: 1.5em;
    }

    h1:hover {
        cursor: pointer;
        color: var(--primary);
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

    tbody tr:hover {
        color: var(--basic);
        background-color: var(--shadows);
        cursor: pointer;
    }

    td {
        padding: .5rem;
    }
</style>