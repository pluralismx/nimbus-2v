<template>
    
    <div class="modal-screen">

        <div class="modal-container">

            <!-- Title -->
            <div class="modal-header">
                <span>Detalles de {{  invoice.invoice_number }}</span>
                <span class="close-cross" @click="closeModal()">&times;</span>
            </div>


            <!-- cards -->
            <div class="modal-body">
                <h2 v-show="products.length==0 && isVisibleInvoiceDetails==true">
                    Cargando...
                </h2>
                <div v-show="products.length > 0 && isVisibleInvoiceDetails==true">
                    <table>
                        <thead>
                            <tr>
                                <th width="50%">Concepto</th>
                                <th width="50%">Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="product in products" :key="product.id">
                                <td width="50%" style="text-align: center;">{{ product.product }}</td>
                                <td width="50%" style="text-align: center;">{{ product.quantity }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <br>
                    <p>Total: ${{ invoice.total }}</p>
                    <span class="legend" @click="loadPaymentsHistory()">Ver historial de pagos</span>
                </div>
                <!-- Payments screen -->
                 <div>
                    <h1 v-show="invoiceHistory.length == 0 && isVisibleInvoiceDetails==false">
                        Cargando...
                    </h1>
                    <div v-show="invoiceHistory.length > 0 && isVisibleInvoiceDetails==false">
                        <div class="invoice-history-actions">
                            <p @click="toggleScreen()" class="legend">&larr;Regresar</p>
                            <p @click="downloadExcel()" class="legend">Descargar XCEL</p>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th width="33%">Fecha</th>
                                    <th width="33%">Abono</th>
                                    <th width="33%">Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="invoice in invoiceHistory" :key="invoice.id">
                                    <td style="text-align: center;">{{ invoice.date }}</td>
                                    <td style="text-align: center;">${{ invoice.payment }}</td>
                                    <td style="text-align: center;">${{ invoice.balance }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                 </div>
            </div>

            <!-- Buttons -->
            <div class="modal-footer">
                <div class="buttons-block">
                    <button class="btn-primary" @click="closeModal()">cancelar</button>
                </div>
            </div>
            
        </div>

    </div>
</template>

<script>
import axios from "@/lib/axios"

export default {
    name: 'ModalSettledInvoiceDetailsComponent',
    props: {
        invoice: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            isVisibleInvoiceDetails: true,
            products: [],
            invoiceHistory: [],
            payment: '',
            paying: false,
            error: false
        }
    },
    mounted(){
        this.loadInvoiceData();
    },
    methods: {
        closeModal() {
            this.$emit("close-modal");
        },
        loadInvoiceData: async function () {
            try {
                const response = await axios.get("api/invoice/details/"+this.invoice.invoice_number, { withCredentials: true });
                if (response.data.status === "success") {
                    this.products = response.data.products;
                } else {
                    console.error('Error al cargar los detalles de la factura:', response.data.message);
                }
            } catch (error) {
                console.error('Error en la solicitud:', error);
            }
        },
        loadPaymentsHistory: async function () {
            this.isVisibleInvoiceDetails=false;
            try{
                const response = await axios.get("api/invoice/records/"+this.invoice.invoice_number, { withCredentials: true });
                if (response.data.status === "success") {
                    this.invoiceHistory = response.data.invoices;
                } else {
                    console.error('Error al cargar los detalles de la factura:', response.data.message);
                }
            }catch(e){
                console.log(e);
            }
        },
        toggleScreen: function () {
            this.isVisibleInvoiceDetails=true;
        },
        downloadExcel: async function () {
            axios({
                url: 'api/invoice/download/' + this.invoice.invoice_number,
                method: 'GET',
                responseType: 'blob',
                withCredentials: true
            })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'historial_de_pagos_'+this.invoice.invoice_number+'.xlsx');
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
    }
}
</script>


<style scoped>

.modal-container {
    width: 75%;
    border-radius: .5rem;
    box-shadow: 2px 2px 4px rgba(0,0,0,0.6);
}

.modal-header {
    padding: .5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--primary);
    border-top-left-radius: .5rem;
    border-top-right-radius: .5rem;
    color: var(--basic);
}

.modal-body {
    padding: .5rem;
    background-color: var(--basic);
    padding: 2rem 1rem;
    overflow-y: auto;
    width: 100%;
    box-sizing: border-box;
    height: 40vh;
}

.input-block {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: left;
    margin: 1rem 0;
}

.input-block input {
    width: 20%;
    margin-right: .5rem;
}

.input-block select {
    width: 100%;
}

.input-block button {
    width: 80px;
}

.input-block textarea {
    width: 100%;
    resize: none;
    border: none;
    padding: .5rem;
}

.input-block label {
    margin-bottom: .5rem;
}

.modal-footer {
    padding-top: 1rem;
    padding-left: .5rem;
    padding-bottom: 1rem;
    padding-right: .5rem;
    border-bottom-left-radius: .5rem;
    border-bottom-right-radius: .5rem;
    background-color: var(--basic);
}

.buttons-block {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
}

.buttons-block button {
    width: 100px;
}

h2 {
    color: var(--primary);
}

table{
    border-collapse: collapse;
    border: 1px solid var(--primary);
    width: 100%;
}

tr {
    border: 1px solid var(--primary);
}

th {
    background-color: var(--primary);
    color: var(--basic);
}

th, td {
    border: 1px solid var(--primary);
    padding: 5px;
}

.legend {
    font-size: 14px;
}

.legend:hover {
    color: var(--primary);
    cursor: pointer;
}

p {
    font-size: 14px;
}

.invoice-history-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: .5rem;
}

@media only screen and (min-width: 1024px) {
    .modal-container {
        width: 500px;
    }
}

</style>
