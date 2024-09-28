<template>
    <div class="title-bar-container">
        <div class="title-container">
            <img src="../../assets/images/money-bag.png">
            <h1 @click="switchWallet()">Cuentas liquidadas</h1>
        </div>
        <div class="range-selection-container">
            <span @click="downloadExcel()" class="span-excel">descargar XCEL</span>
        </div>
    </div>
    <table>
        <thead>
            <tr>
                <th>No. de factura</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Valor</th>
            </tr>
        </thead>
        <tbody>
            <SettledAccountRowComponent
                v-for="invoice in settled.invoices" :key="invoice.id" :invoice="invoice"
            />
        </tbody>
    </table>
</template>
<script>
import axios from '@/lib/axios'
import SettledAccountRowComponent from './SettledAccountsRowComponent.vue'
export default {
name: "SettledAccountsComponent",
components: {
    SettledAccountRowComponent
},
props: {
    settled: {
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
    }
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
    width: 25px;
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
</style>