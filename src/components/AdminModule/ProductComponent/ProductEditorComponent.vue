<template>
    <div class="sheet">
        <div class="create-product-container" v-if="identity.account !='basic'">
            <div class="input-container">
                <div>
                    <label>Producto: </label>
                    <input type="text" v-model="name" class="compact">
                </div>
                <div>
                    <label>Precio: </label>
                    <input type="number" v-model="price" class="compact">
                </div>
            </div>

            <button class="btn-primary compact" @click="createProduct()">crear</button>
        </div>
        <div class="existing-products-container">
            <table>
                <thead>
                    <tr>
                        <th width="40%">Descripcion</th>
                        <th width="30%">Precio</th>
                        <th width="30%">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Importar componente -->
                    <ProductEditorTableRowComponent v-for="product in productsData" :key="product.id" :product="product"
                        @product-updated="handleProductUpdated"
                    />
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import axios from '@/lib/axios';
import ProductEditorTableRowComponent from "./ProductEditorTableRowComponent.vue"
export default {
    name: "ProductEditorComponent",
    components: {
        ProductEditorTableRowComponent
    },
    props: {
        identity: {
            type: Object,
            required: true
        },
        products: {
            type: Array,
            required: true
        }
    },
    watch: {
        products: {
            handler(newVal){
                this.productsData = newVal;
            },
            immediate: true,
        }
    },
    data() {
        return {
            name: '',
            price: '',
            productsData: []
        }
    },
    methods: {
        createProduct: async function () {
            
            let formData = new FormData();
            const json = {
                "name": this.name,
                "price": this.price
            }
            
            formData.append('json', JSON.stringify(json));
            const response = await axios.post('api/product/add', formData, {"withCredentials": true});
            if(response.data.status == "success"){
                this.$emit("product-added", {
                    "status": "success",
                    "text": "Producto añadido"
                }, json);
            }else{
                this.$emit("product-added", {
                    "status": "success",
                    "text": "No se pudo agregar el producto"
                });
            }
        },
        handleProductUpdated: function (notification) {
            this.$emit("product-updated", notification)
        }
    }
}
</script>
<style scoped>
    
    .sheet {
        padding: 1rem;
        height: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        font-size: 14px;
    }

    .create-product-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: .5rem;
        background-color: var(--silver);
        border-radius: .5rem;
        margin-bottom: 1rem;
        box-sizing: border-box;
        box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    }

    .existing-products-container {
        background-color: var(--silver);
        padding: .5rem;
        border-radius: .5rem;
        height: 100%;
        overflow-y: auto;
        box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    }

    table {
        width: 100%;
        border-collapse: collapse;
        border: none;
    }


    th:nth-child(1){
        text-align: left;
    }

    th {
        padding: .5rem;
        text-align: center;
        border-bottom: 1px solid var(--shadows);
        color: white;
    }

    .input-container {
        width: 70%;
        display: flex;
    }

    .input-container div:nth-child(1) {
        margin-right: 1rem;
    }

    .create-product-container button {
        width: 80px;
    }

</style>