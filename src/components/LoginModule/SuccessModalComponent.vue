<template>
    <div class="modal-screen">

        <div class="modal-container">
            <!-- Body -->
            <div class="modal-body">

                <h2>{{ status.title }}</h2>
                <br/>
                <p>{{ status.content }}</p>
                <br/>
                <div class="button-block">
                    <button class="btn-primary" @click="closeModal()">aceptar</button>
                </div>
            </div>
        </div>
    </div>


</template>
<script>
export default {
    name: 'SuccessModalComponent',
    props: {
        status: {
            type: String,
            required: true
        }
    },
    methods: {
        closeModal: function () {
            this.$emit("close-success-modal", false);
        },
    }
}
</script>
<style scoped>
.modal-container {
    width: 75%;
    border-radius: .5rem;
    background-color: var(--basic);
    box-shadow: 4px 4px 16px var(--shadows);
}

.modal-body {
    padding: 1rem;
    background-color: var(--basic);
    border-radius: .5rem;
}

.button-block {
    display: flex;
    justify-content: center;
}


@media only screen and (min-width: 1024px) {
    .modal-container {
        width: 350px;
    }
}
</style>