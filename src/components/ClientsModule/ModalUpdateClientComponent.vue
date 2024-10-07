<template>
    
    <div class="modal-screen">

        <div class="modal-container">

            <!-- Title -->
            <div class="modal-header">
                <span>Actualizar detalles</span>
                <span class="close-cross" @click="closeModal()">&times;</span>
            </div>

            <!-- Form -->
            <div class="modal-body">

                <div class="input-block">
                    <label for="">Nombre</label>
                    <input type="text" v-model="clientData.name">
                </div>

                <div class="input-block">
                    <label for="">Teléfono</label>
                    <input type="text" v-model="clientData.phone">
                </div>

                <div class="input-block">
                    <label for="">Email</label>
                    <input type="text" v-model="clientData.email">
                </div>

                <div class="input-block">
                    <label for="">Detalles</label>
                    <textarea v-model="clientData.notes"></textarea>
                </div>

            </div>

            <!-- Buttons -->
            <div class="modal-footer">
                <div class="buttons-block">
                    <button class="btn-primary" @click="updateClient()">actualizar</button>
                    <button class="btn-primary" @click="closeModal()">cancelar</button>
                </div>
            </div>
            
        </div>

    </div>
</template>

<script>
import axios from '@/lib/axios'
export default {
    name: 'ModalUpdateClientComponent',
    components: {
    },
    props: {
        client: {
            type: Object,
            required: true
        }
    },
    watch: {
        client: {
            handler(newVal){
                this.clientData = newVal;
            },
            immediate: true,
            deep: true
        }
    },
    data() {
        return {
            pendingSales: [],
            clientData: {}
        }
    },
    methods: {
        closeModal: function () {
            this.$emit("close-modal");
        },
        updateClient: async function () {
            
            let formData = new FormData();
            
            const json = {
                id: this.clientData.id,
                name: this.clientData.name,
                phone: this.clientData.phone,
                email: this.clientData.email,
                notes: this.clientData.notes
            }

            console.log(JSON.stringify(json));
            
            formData.append('json', JSON.stringify(json));
            formData.append('_method', 'put');
            
            try{
                const response = await axios.post('api/clients/update/' + this.clientData.id, formData, {"withCredentials": true});
                if(response.data.status == "success"){
                    this.$emit("client-data-updated", {
                        "status": "success",
                        "text": "Datos del cliente actualizados"
                    }, json);
                }else{
                    this.$emit("client-data-updated", {
                        "status": "error",
                        "text": "No se puedieron actualizar los datos"
                    }, null);
                }
            }catch(e){
                console.log(e);
            }
        },
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
    box-sizing: border-box;
    margin-top: 1rem;
    border-radius: 4px;
}

.input-block:nth-last-child(1){
    flex-direction: column;
    align-items: flex-start;
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
