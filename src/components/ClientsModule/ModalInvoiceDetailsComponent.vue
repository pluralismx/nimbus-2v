<template>
    
    <div class="modal-screen">

        <div class="modal-container">

            <!-- Title -->
            <div class="modal-header">
                <span>Detalles</span>
                <span class="close-cross" @click="closeModal()">&times;</span>
            </div>


            <!-- cards -->
            <div class="modal-body">
                <h2 v-show="pendingSales == ''">
                    Cargando...
                </h2>
                <table>
                    <thead>
                        <tr>
                            <th>Concepto</th>
                            <th>Cantidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in products" :key="product.id">
                            <td>{{ product.product }}</td>
                            <td>{{ product.quantity }}</td>
                        </tr>
                    </tbody>
                </table>
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
    name: 'ModalInvoiceDetailsComponent',
    props: {
        invoice: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            products: []
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
                    console.log(this.products);
                } else {
                    console.error('Error al cargar los detalles de la factura:', response.data.message);
                }
            } catch (error) {
                console.error('Error en la solicitud:', error);
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
    overflow-y: auto;
    width: 100%;
    box-sizing: border-box;
    height: 40vh;
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

.input-block select {
    width: 100%;
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

@media only screen and (min-width: 1024px) {
    .modal-container {
        width: 500px;
    }
}

</style>
