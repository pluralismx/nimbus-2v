<template>
    <div class="title-bar-container">
        <div class="title-container">
            <img src="../../assets/images/money-bag.png">
            <h1 @click="switchWallet()">Cuentas liquidadas ${{ revenue }}</h1>
        </div>
        <div class="range-selection-container">
            <span @click="downloadExcel()" class="span-excel">descargar XCEL</span>
        </div>
    </div>
    <table>
        <thead>
            <tr class="table-tools">
                <td class="table-search" colspan="3">
                    <label for="">Buscar:&nbsp;</label>
                    <input v-model="search_query" type="text">&nbsp;
                    <button class="btn-warning compact" @click="search()">{{ search_btn_text }}</button>
                </td>
                <td class="table-pagination" colspan="4">
                    <label for="rows_per_page">resultados: </label>
                    <select v-model="this.rp" class="select-rows">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                    </select>
                    <button class="btn-warning compact" @click="previousPage">&lt;</button>
                    <span>&nbsp;{{ this.cp }}</span><span>&nbsp;/&nbsp;</span><span>{{ this.pages }}&nbsp;</span>
                    <button class="btn-warning compact" @click="nextPage">&gt;</button>
                </td>
            </tr>
            <tr>
                <th width="25%">No. de factura</th>
                <th width="25%">Fecha</th>
                <th width="25%">Cliente</th>
                <th width="25%">Valor</th>
            </tr>
        </thead>
        <!-- All data -->
        <tbody v-if="!results">
            <SettledAccountRowComponent
                v-for="invoice in displayedData" :key="invoice.id" :invoice="invoice"
                @show-details="handleOpenInvoiceModal"
            />
            <tr v-show="displayedData.length == 0">
                <td colspan="11">No hay datos que mostrar</td>
            </tr>
        </tbody>
        <!-- Search results -->
        <tbody v-if="results">
            <SettledAccountRowComponent
                v-for="invoice in results_data" :key="invoice.id" :invoice="invoice"
                @show-details="handleOpenInvoiceModal"
            />
            <tr v-show="results_data.length == 0">
                <td colspan="11">No hay resultados</td>
            </tr>
        </tbody>
    </table>
    <ModalSettledInvoiceDetailsComponent
        v-if="isVisibleInvoiceModal"
        @close-modal="toggleModal()"
        @invoice-payment="handleInvoicePayment"
        :invoice="invoiceEdit"
    />
</template>
<script>
import axios from '@/lib/axios'
import ModalSettledInvoiceDetailsComponent from './ModalSettledInvoiceDetailsComponent.vue'
import SettledAccountRowComponent from './SettledAccountsRowComponent.vue'
export default {
name: "SettledAccountsComponent",
components: {
    SettledAccountRowComponent,
    ModalSettledInvoiceDetailsComponent
},
props: {
    settled: {
        type: Array,
        required: true
    }
},
computed: {
    revenue(){
        let revenueValue = parseFloat(this.settled.revenue) || 0;
        let truncated = this.truncateDecimals(revenueValue);
        return truncated.toLocaleString('es-MX', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    },
    pages() {
        if (this.settledData && this.settledData.invoices) {
            return Math.ceil(this.settledData.invoices.length / this.rp);
        } else {
            return 0;
        }
    },
    limitStart() {
        return (this.cp - 1) * this.rp;
    },
    limitEnd() {
        return this.rp * this.cp;
    },
    displayedData() {
        if (this.settledData && this.settledData.invoices) {
            return this.settledData.invoices.slice(this.limitStart, this.limitEnd);
        } else {
            return [];
        }
    }
},
watch: {
    settled: {
        handler(newVal){
            this.settledData = newVal;
        },
        immediate: true,
        deep: true
    }
},
data() {
    return {
        isVisibleInvoiceModal: false,
        invoiceEdit: {},
        settledData: [],
        leads_per_page: null,
        rp: 10,
        cp: 1,
        search_btn_text: 'buscar',
        search_query: null,
        results: false,
        results_data: [],
    }
},
methods: {
    truncateDecimals: function (number, digits=2){
            const factor = Math.pow(10, digits);
            const truncated = Math.round(number * factor) / factor;
            return parseFloat(truncated.toFixed(digits));
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
    nextPage (){
        if(this.cp < this.pages){
            this.cp++;
        }
    },
    previousPage (){
        if(this.cp > 1){
            this.cp--;
        }
    },
    sortTable(index) {
        if (this.orderByColumn === index) {
            this.orderAsc = !this.orderAsc;
        } else {
            this.orderByColumn = index;
            this.orderAsc = true;
        }
        if (this.orderAsc) {
            this.leadsData.sort((a, b) => {
                let columnA = a[index].toLowerCase(); 
                let columnB = b[index].toLowerCase(); 
                return columnA.localeCompare(columnB, 'es', { sensitivity: 'base' });
            });
        } else {
            this.leadsData.sort((a, b) => {
                let columnA = a[index].toLowerCase(); 
                let columnB = b[index].toLowerCase();
                return columnB.localeCompare(columnA, 'es', { sensitivity: 'base' });
            });
        }
    },
    search() {
        if (this.results === false && this.settledData.invoices) {
            this.search_btn_text = 'limpiar';
            let query = this.search_query ? this.search_query.toLowerCase() : '';
            this.results_data = [];

            this.settledData.invoices.forEach(invoice => {
                if (
                    (invoice.invoice_number && invoice.invoice_number.toLowerCase().startsWith(query)) || 
                    (invoice.client && invoice.client.toLowerCase().startsWith(query)) || 
                    (invoice.email && invoice.email.toLowerCase().startsWith(query))
                ) {
                    this.results_data.push(invoice);
                }
            });

            this.results = true;
        } else {
            this.results_data = [];
            this.search_query = '';  // Usa una cadena vacía en lugar de null
            this.results = false;
            this.search_btn_text = 'buscar';
        }
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

tbody tr:hover{
    background-color: var(--shadows);
    cursor:pointer;
    color: var(--basic);
}

.table-tools {
    background-color: var(--primary);
    color: var(--basic);
    border-bottom: 1px solid var(--shadows);
}

.table-tools td {
    padding: .5rem;
}

.table-search {
    text-align: left;
}

.table-search input{
    width: 15rem;
}
.column-name:hover {
    cursor: pointer;
    color: var(--accent);
}

.table-pagination {
    text-align: right;
}

.select-rows {
    width: 4rem;
    margin-right: 1rem;
    padding: 5px;
}

input {
    padding: 5px;
    width: 75%;
    border-radius: 4px;
    border:none;
}

input:focus{
    outline: none;
}
</style>