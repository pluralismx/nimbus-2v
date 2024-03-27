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
                    <input class="input-primary" type="text">
                </div>
                <div class="input-block">
                    <label for="name">Telefono: </label>
                    <input class="input-primary" type="text">
                </div>
                <div class="input-block">
                    <label for="name">Email: </label>
                    <input class="input-primary" type="text">
                </div>
                <div class="input-block">
                    <select>
                        <option selected disabled>Status...</option>
                    </select>
                </div>
            </div>

            <!-- Buttons -->
            <div class="modal-footer">
                <div class="buttons-block">
                    <button class="btn-warning">aceptar</button>
                    <button class="btn-primary" @click="cancelEditLead">cancel</button>
                </div>
            </div>
            
        </div>

    </div>

</template>

<script>
export default {
    name: 'EditLeadModalComponent',
    methods: {
        cancelEditLead(){
            this.$emit('cancel-edit-lead');
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

</style>