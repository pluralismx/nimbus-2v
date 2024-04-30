<template>
    
    <div class="modal-screen">

        <div class="modal-container">

            <!-- Header -->
            <div class="modal-header">
                <span>Añadir colaborador</span>
                <span class="close-cross" @click="cancelAddTeammate">&times;</span>
            </div>

            <!-- Body -->
            <div class="modal-body">
                <div class="input-block">
                    <input class="input-primary" type="text" placeholder="juan@ejemplo.com">
                    <button class="btn-primary"><img src="../../assets/images/white-magnifier.png"/></button>
                </div>
                <!-- Contact card -->
                <div class="contact-card">
                    <div class="contact-card-body">
                        <!-- Picture -->
                        <div class="contact-card-avatar">
                            <img src="../../assets/images/white-manager.png"/>
                        </div>
                        <!-- Info -->
                        <div class="contact-card-info">
                            <p>Gerardo Topete Pérez</p>
                        </div>
                    </div>
                </div>
                <!-- Default -->
                <div class="contact-card">
                    <div class="contact-card-body">
                        <!-- Picture -->
                        <div class="contact-card-avatar">
                            <img src="../../assets/images/white-manager.png"/>
                        </div>
                        <!-- Info -->
                        <div class="contact-card-info">
                            <p>No hay resultados</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Buttons -->
            <div class="modal-footer">
                <div class="buttons-block">
                    <button class="btn-warning">invitar</button>
                    <button class="btn-primary" @click="cancelAddTeammate">cancel</button>
                </div>
            </div>
            
        </div>

    </div>

</template>

<script>
export default {
    name: 'AddTeammateModalComponent',
    methods: {
        cancelAddTeammate(){
            this.$emit('cancel-add-teammate');
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
        width: 80%;
    }

    .input-block button {
        width: 20%;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }

    .input-block button img{
        width: 40%;
    }

    /* Contact card */
    .contact-card {
        background-color: var(--primary);
        border-radius: .5rem;
        box-shadow: 2px 2px 5px var(--shadows);
        margin-bottom: 1rem;
    }

    .contact-card-body {
        padding: .5rem;
        display: flex;

    }

    .contact-card-avatar {
        width: 20%;
    }
    .contact-card-avatar img {
        width: 100%
    }

    .contact-card-info {
        padding-left: .5rem;
        color: var(--basic);
        display: flex;
        align-items: center;
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
            width: 18%;
            border-radius: .5rem;
            background-color: var(--basic);
        }

        .input-block button img{
        width: 14px;
    }

        .contact-card-avatar img {
            width: 50px;
        }
    }

</style>