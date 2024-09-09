<template>
    
    <div class="modal-screen">

        <div class="modal-container">

            <!-- Title -->
            <div class="modal-header">
                <span>Crear sitio o lista</span>
                <span class="close-cross" @click="closeModal()">&times;</span>
            </div>

            <!-- Form -->
            <div class="modal-body">
                <div class="checkbox-block">
                    <label class="custom-checkbox">
                        <input type="checkbox"
                            v-model="checkboxOptions.website"
                            @change="toggleCheckbox('website')"
                        >
                        <span class="checkmark"></span>
                        Sitio
                    </label>
                    <label class="custom-checkbox">
                        <input type="checkbox"
                            v-model="checkboxOptions.business"
                            @change="toggleCheckbox('business')"
                        >
                        <span class="checkmark"></span>
                        Lista
                    </label>
                </div>
                <div class="input-block">
                    <label for="name">Nombre: </label>
                    <input v-model="name"  class="input-primary" type="text" placeholder="ej. prospectos agosto">
                </div>
                <div class="input-block" v-show="this.checkboxOptions.website">
                    <label for="name">URL: </label>
                    <input v-model="url"  class="input-primary" type="text">
                </div>
                <div class="input-block">
                    <textarea v-model="apiKey" cols="30" rows="10" placeholder="Esta es la clave que identificara a tu pagina web, recuerda incluirla en todos los formularios que quieras conectar a tu cuenta de nimbus. Una vez que cierres esta venta no la podras volver a ver" v-show="this.checkboxOptions.website"></textarea>
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
            name: '',
            url: 'https://',
            apiKey: '',
            button: 'cancelar',
            checkboxOptions: {
                website: false,
                business: false
            }
        }
    },
    methods: {
        toggleCheckbox(selected) {
            if (selected === 'website') {
                this.checkboxOptions.business = false;
            } else if (selected === 'business') {
                this.checkboxOptions.website = false;
            }
        },
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
            let data = {};
            let url = '';
            if(this.checkboxOptions.website == true){
                data = {
                    'owner': owner,
                    'name': this.name,
                    'url': this.url,
                    'type': "website"
                }
                url = 'api/website/create';
            }else{
                data = {
                    'owner': owner,
                    'name': this.name,
                    'type': "business"
                }
                url = 'api/business/create';
            }
            formData.append('json', JSON.stringify(data));
            const response = await axios.post(url, formData, { "withCredentials":  true});
            if (response.data.status == 'success') {
                this.apiKey = response.data.api_key;
                this.button = 'aceptar';
                this.$emit('website-created', {"text":"Sitio/Negocio creado con éxito", "status":"success"});
            }else {
                this.$emit('website-created', {"text":"No se pudo crear el sitio", "status":"error"});
            }
        }
    }
}
</script>

<style scoped>

.custom-checkbox {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 15px;
    margin-right: 15px;
    cursor: pointer;
    font-size: 14px;
    user-select: none;
    color: black;
}

.custom-checkbox input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

.checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 15px;
    width: 15px;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 3px;
}

.custom-checkbox:hover input ~ .checkmark {
    background-color: #ccc;
}

.custom-checkbox input:checked ~ .checkmark {
    background-color: var(--primary);
    border-color: var(--primary);
}

.checkmark:after {
    content: "";
    position: absolute;
    display: none;
}

.custom-checkbox input:checked ~ .checkmark:after {
    display: block;
}

.custom-checkbox .checkmark:after {
    left: 4px;
    top: 0px;
    width: 4px;
    height: 8px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
}

.modal-container {
    width: 75%;
    border-radius: .5rem;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
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

.checkbox-block {
    margin: 1rem 0;
    display: flex;
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

    .checkbox-block {
        margin: 1rem 0;
        display: flex;

    }

    .checkbox-block input[type="checkbox"] {
        margin-right: 1rem;
    }

    .checkbox-block div {
        margin-right: 2rem;
    }
}

</style>