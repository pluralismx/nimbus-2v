<template>
    
    <div class="modal-screen">

        <div class="modal-container">

            <!-- Title -->
            <div class="modal-header">
                <span>Cerrar venta</span>
                <span class="close-cross" @click="answer(false)">&times;</span>
            </div>

            <!-- Form -->
            <div class="modal-body">
                <div class="add-product-container">
                    <p>Concepto: </p>
                    <select name="" id="">
                            <option value="">Cosa 1</option>
                            <option value="">Cosa 1</option>
                            <option value="">Cosa 1</option>
                    </select>
                    <button class="btn-primary">agregar</button>
                </div>
                <div class="added-product-container">
                    <span>Product name</span>
                    <span class="close-cross">&times;</span>
                </div>
            </div>

            <!-- Buttons -->
            <div class="modal-footer">
                <div class="buttons-block">
                    <button class="btn-warning" @click="answer(true)">aceptar</button>
                    <button class="btn-primary" @click="answer(false)">cancelar</button>
                </div>
            </div>
            
        </div>

    </div>
</template>

<script>
// import axios from '@/lib/axios'
export default {
    name: 'ModalCloseSaleComponent',
    methods: {
        answer: function(answer) {
            this.$emit('answer', answer);
        }
    }
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

.add-product-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
}

.added-product-container {
    padding: .5rem;
    border-radius: 1rem;
    background-color: var(--primary);
    box-shadow: 1px 1px 2px rgba(0,0,0,0.6);
    color: var(--basic);
    margin-bottom: .5rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

@media only screen and (min-width: 1024px) {
    .modal-container {
        width: 500px;
    }
}

</style>