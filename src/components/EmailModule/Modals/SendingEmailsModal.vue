<template>
    <div class="modal-screen">
        <div class="container">
            <div class="container-head">
                <span>Enviar correos</span>
                <span class="close-cross" @click="closeModal()">&times;</span>
            </div>
            <div class="container-body">
                <!-- recipients list -->
                <div class="table-container">
                    <table>
                        <tbody>
                            <!-- recipient row component -->
                            <tr>
                                <td>dillion@gmail.com</td>
                            </tr>
                            <tr>
                                <td>syren@gmail.com</td>
                            </tr>
                            <tr>
                                <td>megan@gmail.com</td>
                            </tr>
                            <tr>
                                <td>leilani@gmail.com</td>
                            </tr>
                            <tr>
                                <td>alexis@gmail.com</td>
                            </tr>
                            <tr>
                                <td>eva@gmail.com</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="container-footer">
                <button class="btn-warning">enviar</button>
                <button class="btn-primary" @click="closeModal()">cancelar</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'SendingEmailsModalComponent',
    props: {
        recipients: {
            type: Array,
            required: true
        }
    },
    methods: {
        closeModal: function () {
            this.$emit('close-modal');
        }
    }
}

</script>
<style scoped>
    .container {
        background-color: var(--basic);
        box-shadow: 2px 2px 8px var(--shadows);
        border-radius: .5rem;
        width: 75%;
    }

    .container-head {
        background-color: var(--primary);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: .5rem;
        color: var(--basic);
        border-top-left-radius: .5rem;
        border-top-right-radius: .5rem; 
    }

    .container-body {
        padding: 1rem 1rem;
        background-color: transparent;
    }

    .container-footer {        
        display: flex;
        justify-content: center;
        padding-bottom: 1rem;
    }

    button {
        width: 25%;
        margin-right: 1rem;
    }

    .table-container {
        background-color: var(--shadows);
        padding: .5rem;
        border-radius: 4px;
        color: var(--accent);
        overflow-y: scroll;
        height: 40vh;
    }

    table {
        width: 100%;
    }

    tbody tr td{
        padding: .5rem;
        border-bottom: 1px solid var(--accent);
    }

    @media only screen and (min-width: 1024px){
        .container {
            background-color: var(--basic);
            width: 500px;
        }
        .container-head {
            background-color: var(--primary);
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: .5rem;
            color: var(--basic);
        }

        .container-body {
            padding: 1rem 1rem;
            background-color: transparent;
        }

        .container-footer {        
            display: flex;
        }
    }



</style>