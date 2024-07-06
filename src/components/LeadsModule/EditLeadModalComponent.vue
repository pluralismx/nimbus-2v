<template>

    <div class="modal-screen">

        <div class="modal-container">

            <!-- Title -->
            <div class="modal-header">
                <span>Editar prospecto</span>
                <span class="close-cross" @click="cancelEditLead">&times;</span>
            </div>

            <!-- Form -->
            <div class="modal-body">

                <div class="input-block">
                    <label for="name">Nombre: </label>
                    <input class="input-primary" type="text" v-model="leadData.name">
                </div>
                <div class="input-block">
                    <label for="name">Telefono: </label>
                    <input class="input-primary" type="text" v-model="leadData.phone">
                </div>
                <div class="input-block">
                    <label for="name">Email: </label>
                    <input class="input-primary" type="text" v-model="leadData.email">
                </div>
                <div class="input-block">
                    <select v-model="leadData.status">
                        <option value="nuevo" :selected="leadData.status === 'nuevo'">nuevo</option>
                        <option value="presentacion" :selected="leadData.status === 'presentacion'">presentacion</option>
                        <option value="cotizacion" :selected="leadData.status === 'cotizacion'">cotizacion</option>
                        <option value="negociacion" :selected="leadData.status === 'negociacion'">negociacion</option>
                        <option value="cierre" :selected="leadData.status === 'cierre'">cierre</option>
                    </select>
                </div>
            </div>

            <!-- Buttons -->
            <div class="modal-footer">
                <div class="buttons-block">
                    <button class="btn-warning" @click="editLead()">aceptar</button>
                    <button class="btn-primary" @click="cancelEditLead()">cancel</button>
                </div>
            </div>

        </div>

    </div>

</template>

<script>
import axios from '@/lib/axios'
export default {
    name: 'EditLeadModalComponent',
    props: {
        lead: {
            type: Object,
            required: true
        }
    },
    computed: {
        leadComputed() {
            return this.lead;
        }
    },
    watch: {
        leadComputed: {
            handler(newVal){
                this.leadData = newVal;
            }
        },
        immediate: true,
        deep: true
    },
    data() {
        return {
            leadData: {}
        }
    },
    methods: {
        cancelEditLead: function () {
            this.$emit('cancel-edit-lead');
        },
        editLead: async function () {
            let formData = new FormData();
            formData.append('json', JSON.stringify(this.leadData));
            
            formData.append('_method', 'put');
            const response = await axios.post('api/lead/update/'+this.leadData.id, formData, {"withCredentials":true});
            if(response.data.staus=="success"){
                console.log("lead edited");
            }
        }
    }
}
</script>

<style scoped>
.modal-container {
    width: 75%;
    border-radius: .5rem;
    box-shadow: 4px 4px 16px var(--shadows);
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

@media only screen and (min-width: 1024px) {
    .modal-container {
        width: 15%;
    }
}
</style>