<template>
    <div class="sheet">
        <!--  -->
        <div class="create-product-container">
            <label>producto: </label>
            <input type="text" v-model="name">
            <label>precio: </label>
            <input type="number" v-model="price">
            <button class="btn-primary" @click="createProduct()">crear</button>
        </div>
        <div class="existing-products-container">
            <table>
                <thead>
                    <tr>
                        <th>Descripcion</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Importar componente -->
                    <ProductEditorTableRowComponent v-for="product in products" :key="product.id" :product="product"
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
        }
    },  
    data() {
        return {
            name: '',
            price: '',
            products: {}
        }
    },
    created() {
        this.loadProducts();
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
                });
            }else{
                this.$emit("product-added", {
                    "status": "success",
                    "text": "No se pudo agregar el producto"
                });
            }
        },
        loadProducts: async function () {
            const response = await axios.get("api/product/list/"+this.identity.sub, {"withCredentials": true});
            if(response.data.status == "success"){
                this.products = response.data.products;
                console.log(this.products);
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
    }

    .create-product-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: .5rem;
        background-color: var(--silver);
        border-radius: .5rem;
        margin-bottom: 1rem;
    }

    .existing-products-container {
        background-color: blueviolet;
        padding: .5rem;
        border-radius: .5rem;
        height: 100%;
    }

    table {
        width: 100%;
    }


</style>