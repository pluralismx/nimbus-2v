<template>
    
    <div class="modal-screen">

        <div class="modal-container">

            <!-- Title -->
            <div class="modal-header">
                <span>Crear sitio</span>
                <span class="close-cross" @click="closeModal()">&times;</span>
            </div>

            <!-- Form -->
            <div class="modal-body">

                <div class="input-block">
                    <label for="name">Nombre: </label>
                    <input v-model="name"  class="input-primary" type="text">
                </div>
                <div class="input-block">
                    <label for="name">URL: </label>
                    <input v-model="url"  class="input-primary" type="text">
                </div>
                <div class="input-block">
                    <textarea v-model="apiKey" cols="30" rows="10" placeholder="Una vez que hayas creado el sitio, se te mostrará la clave para la API en este recuadro. Esta clave no estará disponible una vez que cierres esta ventana. Te recomendamos copiarla y guardarla en un lugar seguro tanto para ti como para tu equipo de trabajo."></textarea>
                </div>
            </div>

            <!-- Buttons -->
            <div class="modal-footer">
                <div class="buttons-block">
                    <button class="btn-warning" @click="createWebsite()">crear</button>
                    <button class="btn-primary" @click="closeModal()">{{ button }}</button>
                </div>
            </div>
            
        </div>

    </div>
</template>

<script>
import axios from '@/lib/axios'
export default {
    name: 'ModalCreateWebsiteComponent',
    data() {
        return {
            name: 'Pluralis',
            url: 'http://www.pluralis.com.mx',
            apiKey: '',
            button: 'cancelar'
        }
    },
    methods: {
        closeModal: function (){
            this.apiKey = ''
            this.button = 'cancelar'
            this.$emit('close-modal');
        },
        createWebsite: async function () {
            
            let formData = new FormData();
            let identity = localStorage.getItem('identity');
            let credentials = JSON.parse(identity);
            let owner = credentials.sub;

            const data = {
                'owner': owner,
                'name': this.name,
                'url': this.url
            }
            formData.append('json', JSON.stringify(data));
            const response = await axios.post('api/website/create', formData, { "withCredentials":  true});
            if (response.data.status == 'success') {
                this.apiKey = response.data.api_key;
                this.button = 'aceptar';
                this.$emit('website-created', {"text":"Sitio creado con éxito", "status":"success"});
            }else {
                this.$emit('website-created', {"text":"No se pudo crear el sitio", "status":"error"});
            }
        }
    }
}
</script>

<style scoped>

.modal-container {
    width: 75%;
    border-radius: .5rem;
    background-color: var(--basic);
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
        width: 450px;
    }
}

</style>