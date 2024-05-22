<template>
    
    <div class="modal-screen">

        <div class="modal-container">

            <!-- Title -->
            <div class="modal-header">
                <span>Agregar prospecto</span>
                <span class="close-cross" @click="cancelSaveLead">&times;</span>
            </div>

            <!-- Form -->
            <div class="modal-body">

                <div class="input-block">
                    <label for="name">Nombre: </label>
                    <input v-model="name" class="input-primary" type="text">
                </div>
                <div class="input-block">
                    <label for="name">Telefono: </label>
                    <input v-model="phone" class="input-primary" type="text">
                </div>
                <div class="input-block">
                    <label for="name">Email: </label>
                    <input v-model="email" class="input-primary" type="text">
                </div>
                <div class="input-block">
                    <select v-model="status">
                        <option value="nuevo">Nuevo</option>
                        <option value="identificacion">Identificación</option>
                        <option value="presentacion">Presentación</option>
                        <option value="cotizacion">Cotización</option>
                        <option value="negociacion">Negociación</option>
                        <option value="cierre">Cierre</option>
                    </select>
                </div>
                <div class="input-block">
                    <textarea v-model="message" cols="30" rows="10"></textarea>
                </div>
            </div>

            <!-- Buttons -->
            <div class="modal-footer">
                <div class="buttons-block">
                    <button class="btn-warning" @click="createLead()">guardar</button>
                    <button class="btn-primary" @click="cancelSaveLead()">cancel</button>
                </div>
            </div>
            
        </div>

    </div>

</template>

<script>
import axios from '@/lib/axios';

export default {
    name: 'SaveLeadModalComponent',
    props: {
        website_id: {
            type: Number,
            required: true
        }
    },
    data(){
        return {
            name: 'Dillion',
            phone: '3056232236',
            email: 'dillion@pluralis.com.mx',
            status: '',
            message: 'Hi'
        }
    },
    methods: {
        createLead: async function () {
            const json = {
                "name": this.name,
                "phone": this.phone,
                "email": this.email,
                "status": this.status,
                "message": this.message
            }
            let formData = new FormData();
            formData.append('json', JSON.stringify(json));

            const response = await axios.post('api/lead/create/'+this.website_id, formData, {"withCredentials": true});
            if(response.data.status=="success"){
                this.$emit('lead-created', {"text":"Prospecto creado", "status":"success"});
            }else {
                this.$emit('lead-created', {"text":"No se pudo crear prospecto", "status":"error"});
            }
        },
        cancelSaveLead(){
            this.$emit('cancel-save-lead');
        }
    }
}
</script>

<style scoped>

    .modal-container {
        width: 75%;
        border-radius: .5rem;
        background-color: var(--basic);
        box-shadow: 2px 2px 8px var(--shadows);
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

    .input-block textarea {
        width: 100%;
        resize: none;
        border: none;
    }

    .modal-footer {
        padding-top: 0;
        padding-left: .5rem;
        padding-bottom: .5rem;
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

    @media only screen and (min-width: 1024px){
        .modal-container {
            width: 400px;
            border-radius: .5rem;
            background-color: var(--basic);
        }
    }

</style>