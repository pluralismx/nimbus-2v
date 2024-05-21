<template>
    
    <div class="modal-screen">

        <div class="modal-container">

            <div class="modal-header">
                <span>Seleccionar imagen</span>
                <span class="modal-close" @click="closeModal">&times;</span>
            </div>
            <div class="modal-body">
                <!-- Image thumbnailComponent -->
                <ImageThumbnailComponent 
                    v-for="image in images" :key="image.id" :image="image"
                    @image-selected="handleImageSelected"
                />
            </div>

            <!-- Footer -->
            <div class="modal-image-footer">

                <div class="modal-image-footer-row">
                    <label for="input_image">
                        Buscar en este dispositivo...
                        <input id="input_image" type="file" @change="selectImageToUpload"/>
                    </label>
                    <button class="btn-primary" @click="uploadImage"><img src="../../../assets/images/white-upload.png" width="20"/></button>
                </div>

                <div class="modal-image-footer-row">            
                    <input type="text" v-model="imageSelected">
                    <button class="btn-warning" @click="confirmSelection()"><img src="../../../assets/images/white-checkmark.png" width="20"/></button>
                </div>
           </div>

        </div>

    </div>

</template>

<script>

import axios from '@/lib/axios.js';
import ImageThumbnailComponent from './ImageThumbnailComponent.vue'
export default {
    name: 'ImageUploadModalComponent',
    components: {
        ImageThumbnailComponent
    },
    props: {
        website: {
            type: Number,
            required: true            
        },
        images: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            imageToUpload: null,
            imageSelected: 'select an image'
        }
    },
    methods: {
        closeModal(){
            this.$emit('close-image-modal');        
        },
        selectImageToUpload(event) {
            this.imageToUpload = event.target.files[0];
        },
        uploadImage() {
            let formData = new FormData();
            formData.append("file0", this.imageToUpload);
            
            axios.post('api/image/uploadImage/'+this.website, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                "withCredentials":true
            })
            .then(response => {
                if(response.data.status) {
                    this.$emit('image-uploaded');
                }
            })
            .catch(error => {
                console.error('Error uploading image:', error);
            });
        },
        handleImageSelected: function (image_name) {
            this.imageSelected = image_name;
        },
        confirmSelection: function () {
            this.$emit('image-selected', this.imageSelected);
            this.$emit('close-image-modal');
        }
    }
}
</script>

<style scoped>

    /* Elements */
    input[type="file"] {
        display: none;
    }

    button img {
        width: 1rem;
    }

    .modal-image-footer input[type="file"] {
        display: none;
    }

    .modal-image-footer label {
        color: var(--basic);
        transition: all 300ms;
        align-self: center;
    }

    .modal-image-footer input {
        border-radius: 4px;
        border: none;
    }

    .modal-image-footer input:focus {
        outline: none;
    }

    .modal-image-footer label:hover {
        color: var(--accent);
        text-shadow: 0px 0px 8px var(--warn);
        transition: text-shadow 300ms;
        cursor: pointer;

    }

    /* Mobile first */
    .modal-container {
        background-color: var(--accent);
        width: 80%;
        padding: .5rem;
        height: 45%;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        box-shadow: 4px 4px 16px var(--shadows);
    }

    .modal-header {
        padding: .5rem;
        background-color: var(--shadows);
        color: var(--basic);
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: .5rem;
        border-radius: 4px;
    }

    .modal-body {
        padding: .5rem;
        box-sizing: border-box;
        background-color: var(--shadows);
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        height: 300px;
        overflow-y: auto;
        align-content: flex-start;
        margin-bottom: .5rem;
        border-radius: 4px;
    }

    .modal-image-footer {
        display: grid;
        background-color: var(--shadows);
        border-radius: 4px;
        row-gap: .5rem;
        padding: .5rem;
        align-content: center;
        box-sizing: border-box;
        flex-grow: 1;
    }

    .modal-image-footer-row {
        display: grid;
        grid-template-columns: 85% auto;
        grid-template-rows: 1fr;
        column-gap: .5rem;
        height: 100%;
    }



    @media only screen and (min-width: 1024px) {
        .modal-container {
            background-color: var(--accent);
            width: 500px;
            padding: .5rem;
            box-shadow: 4px 4px 16px var(--shadows);
        }

        .img-thumbnail {
            padding: 8px;
        }
    }



</style>