<template>
    
    <div class="modal-screen">

        <div class="modal-container">

            <div class="modal-header">
                <span>Seleccionar imagen</span>
                <span class="modal-close" @click="closeModal">&times;</span>
            </div>
            <div class="modal-body">
                <div class="img-thumbnail">
                    <img src="../../../assets/images/logo.jpg">
                </div>
            </div>

            <!-- Footer -->
            <div class="modal-image-footer">

                <div class="modal-image-footer-row">
                    <label for="input_image">
                        Buscar en este dispositivo...
                        <input id="input_image" type="file" />
                    </label>
                    <button class="btn-primary"><img src="../../../assets/images/white-upload.png" width="20"/></button>
                </div>

                <div class="modal-image-footer-row">            
                    <input type="text">
                    <button class="btn-warning"><img src="../../../assets/images/white-checkmark.png" width="20"/></button>
                </div>
           </div>

        </div>

    </div>

</template>

<script>
export default {
    name: 'ImageUploadModalComponent',
    methods: {
        closeModal(){
            this.$emit('close-image-modal');
        }
    }
}
</script>

<style scoped>

    /* Elements */
    .img-thumbnail img {
        width: 100%;
    }

    .img-thumbnail:hover {
        background-color: rgba(80, 80, 80, .5);
    }

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

    .img-thumbnail {
        flex: 0 0 calc(33% - 6px);
        margin: 3px;
        box-sizing: border-box;
        align-self: flex-start;
        justify-self: flex-start;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        padding: 4px;
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
            width: 25%;
            padding: .5rem;
            box-shadow: 4px 4px 16px var(--shadows);
        }

        .img-thumbnail {
            padding: 8px;
        }
    }



</style>