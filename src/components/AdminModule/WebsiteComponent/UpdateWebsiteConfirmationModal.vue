<template>
    
    <div class="modal-screen">

        <div class="modal-container">

            <!-- Title -->
            <div class="modal-header">
                <span>Actualizar sitio</span>
                <span class="close-cross" @click="cancelUpdateWebsite">&times;</span>
            </div>

            <!-- Form -->
            <div class="modal-body">
                <p>Esta seguro que desea modificar el sitio?</p>
            </div>

            <!-- Buttons -->
            <div class="modal-footer">
                <div class="buttons-block">
                    <button class="btn-warning" @click="updateWebsite">actualizar</button>
                    <button class="btn-primary" @click="cancelUpdateWebsite">cancelar</button>
                </div>
            </div>
            
        </div>

    </div>
</template>

<script>
// import axios from '@/lib/axios'
export default {
    name: 'DeleteWebsiteConfirmationModal',
    methods: {
        cancelUpdateWebsite: function (){
            this.$emit('cancel-update-website');
        },
        updateWebsite: function () {
            this.$emit('proceed-updating-website');
        }
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
        width: 500px;
    }
}

</style>