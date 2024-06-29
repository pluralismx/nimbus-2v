<template>
    
    <div class="modal-screen">

        <div class="modal-container">

            <!-- Title -->
            <div class="modal-header">
                <span>Cargar archivo CVS</span>
                <span class="close-cross" @click="answer()">&times;</span>
            </div>

            <!-- Form -->
            <div class="modal-body">
                <div class="input-block">
                    <input v-model="fileName" type="text"/>
                    <label for="cvs" class="label-button">
                        buscar...
                    </label>
                    <input type="file" id="cvs" @change="selectionMade">
                </div>
            </div>

            <!-- Buttons -->
            <div class="modal-footer">
                <div class="buttons-block">
                    <button class="btn-warning" @click="uploadCsv()">aceptar</button>
                    <button class="btn-primary" @click="answer()">cancelar</button>
                </div>
            </div>
            
        </div>

    </div>
</template>

<script>
import axios from '@/lib/axios'
export default {
    name: 'ModalUploadCvsComponent',
    props: {
        website: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            fileName: 'elige un archivo',
            imageToUpload: {}
        }
    },
    methods: {
        answer: function() {
            this.$emit('answer');
        },
        selectionMade: function (event) {
            this.imageToUpload = event.target.files[0];
            this.fileName = this.imageToUpload.name;
        },
        
        uploadCsv: async function () {
            if(this.website){
                let formData = new FormData();
                formData.append("csv_file", this.imageToUpload);
                
                const response = await axios.post('api/lead/uploadCsv/'+this.website, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    "withCredentials":true
                });

                if(response.data.status == "success") {
                    this.answer();
                    this.$emit('csv-uploaded', {
                        "text":"CSV subida con éxito",
                        "status":"success",
                        "records_added":response.data.records_added
                    });
                }else if(response.data.message == "Forbidden"){
                    this.answer();
                    this.$emit('csv-uploaded',{
                        "text":"Permisos insuficientes",
                        "status":"error"
                    });
                }else {
                    this.answer();
                    this.$emit('csv-uploaded',{
                        "text":"Error al cargar el archivo",
                        "status":"error"
                    });
                }
            }else {
                this.answer();
                    this.$emit('csv-uploaded',{
                        "text":"No tienes sitios web o negocios",
                        "status":"error"
                    });
            }

        },        
    }
}
</script>

<style scoped>

.modal-container {
    width: 75%;
    border-radius: .5rem;
    background-color: var(--basic);
    box-shadow: 2px 2px 16px var(--shadows);
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
    margin: 2rem 0;
    text-align: center;
}

.input-block {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1rem 0;
}

input[type="text"] {
    width: 60%;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}

.label-button {
    background-color: var(--primary);
    padding: 7px;
    font-size: 14px;
    color: var(--basic);
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
}

.label-button:hover {
    cursor: pointer;
}

input[type="file"] {
        display: none;
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
        width: 500px;
    }
}

</style>