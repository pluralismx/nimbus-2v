<template>
    
    <div class="modal-screen">

        <div class="modal-container">

            <!-- Title -->
            <div class="modal-header">
                <span>Organizar prospectos</span>
                <span class="close-cross" @click="closeModal">&times;</span>
            </div>

            <!-- Form -->
            <div class="modal-body">

                <div class="input-block">
                    <label for="name">Ordenar por: </label>
                    <select v-model="selectedOption" @change="sortLeads($event.target.value)">
                        <option value="" :selected="selectedOption === ''">seleccionar...</option>
                        <option value='name'>nombre</option>
                        <option value='email'>correo</option>
                        <option value='phone'>telefono</option>
                        <option value='date'>fecha</option>
                        <option value='status'>status</option>
                    </select>
                </div>

                <div class="input-block">
                    <label for="name">Resultados: </label>
                    <select @change="displayedResults($event.target.value)">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>
                <div class="input-block">
                    <label for="">Buscar: </label>
                    <input type="text" v-model="query">
                </div>
            </div>

            <!-- Buttons -->
            <div class="modal-footer">
                <div class="buttons-block">
                    <button class="btn-warning" @click="inputSearchQuery()">buscar</button>
                    <button class="btn-primary" @click="closeModal()">cancel</button>
                </div>
            </div>
            
        </div>

    </div>

</template>

<script>
export default {
    name: 'ModalLeadOptionsComponent',
    data() {
        return {
            selectedOption: '',
            query: ''
        }
    },
    methods: {
        closeModal: function () {
            this.$emit('close-modal');
            this.selectedOption = '';
        },
        sortLeads: function (criteria) {
            this.$emit('sort-leads-by', criteria);
            this.$emit('close-modal');
            this.selectedOption = '';
        },
        displayedResults: function (results) {
            this.closeModal();
            this.$emit('change-displayed-results', results);
        },
        inputSearchQuery: function () {
            this.$emit('search-query', this.query);
            this.$emit('close-modal');
        }

    }
}
</script>

<style scoped>

    .modal-container {
        width: 75%;
        border-radius: .5rem;
        box-shadow: 2px 2px 8px rgba(0,0,0,0.7);
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
        box-sizing: border-box;
    }

    .input-block select {
        width: 60%;
    }

    .input-block textarea:focus {
        outline: none;
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
        padding-top: 5px;
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