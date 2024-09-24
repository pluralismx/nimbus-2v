<template>
    
    <div class="modal-screen">

        <div class="modal-container">

            <!-- Title -->
            <div class="modal-header">
                <span>Aprobar ventas</span>
                <span class="close-cross" @click="closeModal()">&times;</span>
            </div>


            <!-- cards -->
            <div class="modal-body">
                <h2 v-show="pendingSales == ''">
                    Cargando...
                </h2>
                <PendingSaleCardComponent 
                    v-for="pendingSale in pendingSales" :key="pendingSale.sale_id" :pendingSale="pendingSale"
                    @sale-dismissed="handleSaleDismissed"
                />
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
import axios from '@/lib/axios'
import PendingSaleCardComponent from './PendingSaleCardComponent.vue'
export default {
    name: 'ModalSaleAprovalComponent',
    components: {
        PendingSaleCardComponent
    },
    props: {
        saler: {
            type: Number,
            required: true
        }
    },
    created(){
        this.loadPendingSales();
    },
    data() {
        return {
            pendingSales: []
        }
    },
    methods: {
        closeModal: function () {
            this.$emit("close-modal");
        },
        loadPendingSales: async function () {
            const response = await axios.get("api/sale/pendingSales/"+this.saler, {"withCredentials": true});
            if(response.data.status === "success"){
                console.log(response.data);
                this.pendingSales = response.data.pending_sales;
            }else{
                console.log(response.data);
            }
        },
        handleSaleDismissed: function (notification) {
            this.closeModal();
            this.$emit('sale-dismissed', notification);
        }
    },

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
