<template>
    
    <div class="modal-screen">

        <div class="modal-container">

            <!-- Title -->
            <div class="modal-header">
                <div>
                    <span>Cerrar venta - {{ lead.name }}</span>
                    <span v-show="revenue != 0">${{ revenue }}</span>
                </div>
                <span class="close-cross" @click="closeModal()">&times;</span>
            </div>

            <!-- Form -->
            <div class="modal-body">
                <div class="add-product-container">
                    <p>Concepto:&nbsp;</p>
                    <select name="" id="" v-model="selectedProduct">
                        <option disabled value="">Elija un producto</option>
                        <option v-for="product in products" :key="product.id" :value="product">{{ product.name }}</option>
                    </select>
                    <button class="btn-primary" @click="addToSale()">agregar</button>
                </div>
                <ProductStripComponent
                    v-for="product in sale"
                    :key="product.id"
                    :product="product"
                    @remove-item="handleRemoveItem"
                    @add-other="handleAddMore"
                />
            </div>

            <!-- Buttons -->
            <div class="modal-footer">
                <div class="buttons-block" v-show="isVisiblePrompt">
                    <button class="btn-warning" @click="pendingSale()">aceptar</button>
                    <button class="btn-primary" @click="closeModal()">cancelar</button>
                </div>
                <div class="buttons-block" v-show="!isVisiblePrompt">
                    <button class="btn-primary" @click="closeModal()">aceptar</button>
                </div>
            </div>
            
        </div>

    </div>
</template>

<script>
import axios from '@/lib/axios'
import ProductStripComponent from "./ProductStripComponent"
export default {
    name: 'ModalCloseSaleComponent',
    components: {
        ProductStripComponent
    },
    props: {
        products: {
            type: Array,
            required: true
        },
        identity: {
            type: Object,
            required: true
        },
        lead: {
            type: Object,
            required: true
        }
    },
    watch: {
        products: {
            handler(newVal){
                this.productsData = newVal;
            },
            immediate: true
        }
    },
    data() {
        return {
            productsData: [],
            sale: [],
            selectedProduct: '',
            revenue: 0,
            isVisiblePrompt: true
        }
    },
    methods: {
        truncateDecimals: function (number, digits = 2) {
            const factor = Math.pow(10, digits);
            return Math.round(number * factor) / factor;
        },
        closeModal: function() {
            this.sale = [];
            this.selectedProduct = null,
            this.revenue = 0;
            this.isVisiblePrompt = true;
            this.$emit('close-modal');
        },
        addToSale() {
            if (this.selectedProduct) {
                const existingProduct = this.sale.find(item => item.id === this.selectedProduct.id);
                if (existingProduct) {
                    existingProduct.qty += 1;
                    this.revenue += parseFloat(existingProduct.price);
                } else {
                    const productToAdd = { ...this.selectedProduct, qty: 1 };
                    this.sale.push(productToAdd);
                    this.revenue += parseFloat(productToAdd.price);
                }
                this.selectedProduct = null;
            }
        },
        pendingSale: async function () {
            let formData = new FormData();
            const json = {
                "user": this.identity.sub,
                "lead": this.lead.id,
                "website": this.lead.id_website,
                "revenue": this.revenue,
                "products": this.sale
            }

            formData.append("json", JSON.stringify(json));
            
            const response = await axios.post("api/sale/add", formData, {"withCredentials": true});
            
            if(response.data.status == "success"){
                
                let statusUpdated = await this.updateLeadStatus();
                
                if(statusUpdated == true){
                    this.isVisiblePrompt = false;
                    this.$emit("pending-sale", {"id": this.lead.id, "status": "pendiente"}, {
                        "status": "success",
                        "text": "Venta pasada a revision"
                    });
                }
            }else{
                this.$emit("pending-sale", {
                    "status": "error",
                    "text": "No se pudo pasar a revision"
                });
            }

        },
        handleRemoveItem: function (item) {
            const index = this.sale.findIndex(product => product.id === item);

            if (index !== -1) {
                if (this.sale[index].qty > 1) {
                    this.sale[index].qty--;
                    this.revenue -= parseFloat(this.sale[index].price);
                } else {
                    this.revenue -= parseFloat(this.sale[index].price);
                    this.sale.splice(index, 1);
                }
            }
        },
        handleAddMore: function (item) {
            const index = this.sale.findIndex(product => product.id === item);

            if (index !== -1) {
                this.sale[index].qty++;
                this.revenue += parseFloat(this.sale[index].price);
            }
        },
        updateLeadStatus: async function () {
            const json = {
                'id': this.lead.id,
                'status': "pendiente"
            }
            
            let formData = new FormData();
            formData.append('json', JSON.stringify(json));
            formData.append('_method', 'put');

            const response = await axios.post('api/lead/update/'+this.lead.id, formData, {"withCredentials":true});
            if(response.data.status=="success"){
                return true;
            }else {
                return false;
            }
        }

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
}

.input-block {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1rem 0;
}

.input-block input {
    width: 60%;
}

select {
    width: 100%;
    margin-right: 1rem;
    box-sizing: border-box;
}

.input-block button {
    width: 65%;
}

.input-block textarea {
    width: 100%;
    resize: none;
    border: none;
    padding: .5rem;
}

.modal-footer {
    padding-top: 0;
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
    justify-content: center;
}

.buttons-block button {
    width: 100px;
    
}

.buttons-block button:nth-child(1){
    margin-right: 1rem;
}

.add-product-container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 1rem;
}



@media only screen and (min-width: 1024px) {
    .modal-container {
        width: 500px;
    }
}

</style>
