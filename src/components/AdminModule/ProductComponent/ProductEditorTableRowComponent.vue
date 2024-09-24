<template>
    <!-- Data row -->
    <tr v-show="!isVisibleEditRow">
        <td>
            <!-- Nombre -->
             {{ productData.name }}
        </td>
        <td>
            <!-- precio -->
            ${{ productData.price }}
        </td>
        <td>
            <!-- acciones -->
            <button class="btn-warning compact" @click="deleteProduct()">eliminar</button>
            <button class="btn-primary compact" @click="toggleEditRow()">editar</button>
        </td>
    </tr>
    <!-- Edit Row -->
    <tr v-show="isVisibleEditRow">
        <td>
            <!-- Nombre -->
             <input type="text" v-model="productData.name" class="compact">
        </td>
        <td>
            <!-- precio -->
            <input type="number" v-model="productData.price" class="compact">
        </td>
        <td>
            <!-- acciones -->
            <button class="btn-warning compact" @click="editProduct()">actualizar</button>
            <button class="btn-primary compact" @click="toggleEditRow()">cancelar</button>
        </td>
    </tr>
</template>
<script>
import axios from "@/lib/axios";
export default {
    name: "ProductEditorTableRowComponent",
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    watch: {
        product: {
            handler(newVal){
                this.productData = newVal
            },
            immediate: true,
            deep: true
        }
    },
    data(){
        return {
            isVisibleEditRow: false,
            productData: {}
        }
    },
    methods: {
        toggleEditRow: function (){
            if(this.isVisibleEditRow == false){
                this.isVisibleEditRow = true;
            }else{
                this.isVisibleEditRow = false;
            }
        },
        deleteProduct: async function () {
            const response = await axios.delete("api/product/delete/"+this.productData.id, {"withCredentials": true});
            
            if(response.data.status == "success"){
                console.log("Producto eliminado");
            }else{
                console.log("error");
            }
        },
        editProduct: async function () {
            let formData = new FormData();
            const json = {
                "name": this.productData.name,
                "price": this.productData.price
            }

            formData.append('json', JSON.stringify(json));
            formData.append('_method', 'put');
            const response = await axios.post("api/product/update/"+this.productData.id, formData, {"withCredentials": true});
            if(response.data.status == "success"){
                this.$emit("product-updated", {
                    "status": "success",
                    "text": "Producto actualizado"
                });
            }else{
                this.$emit("product-updated", {
                    "status": "error",
                    "text": "Error al actualizar el producto"
                });
            }
            this.toggleEditRow();
        }
    }
}
</script>
<style scoped>
    
    td {
        padding: .5rem;
        border-bottom: 1px solid black;
        text-align: center;
    }

    td:nth-child(1){
        text-align: left;
    }

    button {
        width: 40%;
    }

    button:nth-child(1){
        margin-right: 5%;
    }


</style>