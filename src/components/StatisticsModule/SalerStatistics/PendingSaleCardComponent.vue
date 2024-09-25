<template>
    <div class="sale-card-container">
        <div class="sale-card-header" @click="expandDetails()">
            <span>{{ pendingSale.date }}&nbsp;-&nbsp;${{ pendingSale.revenue }}&nbsp;-&nbsp;{{ pendingSale.customer }}</span>
            <span class="span-expand">+</span>
        </div>
        <div class="sale-card-body" :class="{ expanded: isExpanded}">
            <div class="customer-details-container">
                <span>&#128222; {{ pendingSale.phone }}</span>
                <span>&#128231; {{ pendingSale.email }}</span>
            </div>
            <table>
                <thead>
                    <tr>
                        <th width="50%">Producto</th>
                        <th width="25%">Cantidad</th>
                        <th width="25%">Precio</th>
                    </tr>
                </thead>
                <tbody>
                    <PendingSaleCardRowComponent 
                        v-for="product in pendingSale.products" :key="product.product_id" :product="product"
                    />
                </tbody>
            </table>
            
            <div v-show="!isVisibleConfirmAction">
                <span class="span-action" @click="showConfimationOptions('approve')">Aprobar</span>
                <span>&nbsp;|&nbsp;</span>
                <span class="span-action" @click="showConfimationOptions('deny')">Denegar</span>
            </div>
            
            <div class="confirm-sale-container" v-show="isVisibleConfirmAction">
                
                <!-- Generate Invoice -->
                <div class="input-block">
                    <label>Cliente:&nbsp;</label>
                    <input type="text" class="compact" v-model="client">
                    <label for="">Abono:&nbsp;</label>
                    <input type="text" class="compact" v-model="payment">
                </div>

                <!-- Generate Invoice -->
                <div class="input-block">
                    <label for="">No. factura:&nbsp;</label>
                    <input type="text" class="compact" v-model="invoice">
                    <label for="">NIF:&nbsp;</label>
                    <input type="text" class="compact" v-model="nif">
                </div>

                <!-- Accept action -->
                <div>
                    <span class="span-action" @click="takeAction()">aceptar</span>
                    <span>&nbsp;|&nbsp;</span>
                    <span class="span-action" @click="showConfimationOptions()">cancelar</span>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
import axios from "@/lib/axios"
import PendingSaleCardRowComponent from "./PendingSaleCardRowComponent"
export default {
    name: "PendingSaleCardComponent",
    props: {
        pendingSale: {
            type: Object,
            required: true
        }
    },
    components:{
        PendingSaleCardRowComponent
    },
    data() {
        return {
            isExpanded: false,
            isVisibleConfirmAction: false,
            action: '',
            client: '',
            payment: '',
            invoice: '',
            nif: '',
        }
    },
    methods: {
        expandDetails: function () {
            if(this.isExpanded == false){
                this.isExpanded = true
            }else{
                this.isExpanded = false
            }
        },
        approveSale: async function () {
            let formData = new FormData();
            const json = {
                "client" : this.client,
                "total" : this.pendingSale.revenue,
                "payment" : this.payment,
                "invoice" : this.invoice,
                "nif" : this.invoice,
            };

            formData.append('json', JSON.stringify(json));
            try{
                const response = await axios.post("api/sale/aprove/"+this.pendingSale.sale_id, formData, {"withCredentials": true});
                if(response.data.status == "success"){
                    this.$emit('sale-dismissed', {
                        "status": "success",
                        "text": "Venta aprobada"
                    });
                }else{
                    this.$emit('sale-dismissed', {
                        "status": "error",
                        "text": "No se pudo aprobar la venta"
                    });
                }
            }catch (e){
                console.log(e);
            }

        },
        rejectSale: async function () {
            const response = await axios.get("api/sale/rejectSale/"+this.pendingSale.sale_id, {"withCredentials": true});
            if(response.data.status == "success"){
                this.$emit('sale-dismissed', {
                    "status": "success",
                    "text": "Venta cancelada"
                });
            }else{
                this.$emit('sale-dismissed', {
                    "status": "error",
                    "text": "No se pudo cancelar la venta"
                });
            }
        },
        showConfimationOptions: function (action) {
            if(this.isVisibleConfirmAction == false){
                this.action = action;
                this.isVisibleConfirmAction = true
            }else{
                this.isVisibleConfirmAction = false
                this.action = ''
            }
        },
        takeAction: function (){
            if(this.action == "approve"){
                this.approveSale();
            }else if(this.action == "deny"){
                this.rejectSale();
            }
        }
    }
}
</script>
<style scoped>
    .sale-card-container {
        margin-bottom: .5rem;
        box-shadow: 1px 1px 4px rgba(0,0,0,0.4);
        width: 100%;
    }

    .sale-card-header {
        background-color: var(--primary);
        padding: .5rem;
        color: var(--basic);
        display: flex;
        justify-content: space-between;
    }

    .sale-card-body {
        padding: 0rem;
        height: 0;
        overflow-y: hidden;
    }

    .expanded {
        padding: .5rem;
        height: auto;
        overflow-y: auto;
    }

    .sale-card-body span {
        display: inline-block;
        margin-bottom: 5px;
        font-size: 14px;
    }

    table {
        box-sizing: border-box;
        width: 100%;
        border-collapse: collapse;
        border: 1px solid var(--primary);
        font-size: 14px;
        margin-bottom: 10px;
    }

    table thead tr {
        /* background-color: var(--primary); */
        border: 1px solid var(--primary);
    }

    th {
        padding: .5rem;
        border: 1px solid var(--primary);
    }

    th:nth-child(1) {
        text-align: left;
    }

    .span-expand:hover {
        cursor: pointer;
        color: var(--accent);
    }

    .span-action:hover {
        color: var(--primary);
        cursor: pointer;
    }

    .input-block {
        display: flex;
        align-items: center;
        font-size: 14px;
        margin-bottom: 10px;
    }

    .confirm-sale-container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .customer-details-container {
        display: flex;
        flex-direction: column;
    }
</style>