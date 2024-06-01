<template>
    <div class="modal-screen">

        <div class="modal-container">
            <!-- Body -->
            <div class="modal-body">

                <h2>Bienvenido a Nimbus!</h2>
                <br/>
                <p>
                    Bienvenido a Nimbus CRM, el CRM que te permite hacer llamadas, mandar correos masivos, organizarte con tu equipo de ventas
                    y darle seguimiento a tus prospectos. Para ver tutoriales por favor haz clic en el siguienta enlace.
                </p>
                <br/>
                <div class="button-block">
                    <button class="btn-primary" @click="acceptIntro()">aceptar</button>
                </div>
            </div>
        </div>
    </div>


</template>
<script>
import axios from '@/lib/axios'
export default {
    name: 'IntroMessageComponent',
    props: {
        status: {
            type: String,
            required: true
        }
    },
    methods: {
        acceptIntro: async function () {
            let answer = false;
            try {
                const response = await axios.get('api/welcome/' + answer, { withCredentials: true });
                if (response.data.status === "success") {
                    this.$emit('welcome-message-accepted');
                } else {
                    console.error('Error:', response.data.message); // Opcional: registrar el mensaje de error
                    this.$emit('welcome-message-accepted');
                }
            } catch (error) {
                console.error('Request failed:', error);
            }
        }

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