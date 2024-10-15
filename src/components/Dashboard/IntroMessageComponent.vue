<template>
    <div class="modal-screen">

        <div class="modal-container">
            <!-- Body -->
            <div class="modal-body">

                <h2>Bienvenido a Cielo CRM!</h2>
                <br/>
                <div class="message-container">
                    <img src="../../assets/images/like.png" alt="">
                    <p>
                    Tu periodo de prueba expirará en 15 días. Para contratar ve a la sección administrativa de tu cuenta y elige la opción contratar.
                    </p>
                </div>

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
    methods: {
        acceptIntro: async function () {
            let answer = false;
            try {
                const response = await axios.get('api/welcome/' + answer, { withCredentials: true });
                if (response.data.status == "success") {
                    this.$emit('welcome-message-accepted');
                } else {
                    console.error('Error:', response.data.message);
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

.message-container {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .message-container img{
        width: 45px;
        margin-right: 1rem;
    }


@media only screen and (min-width: 1024px) {
    .modal-container {
        width: 450px;
    }

    .message-container {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .message-container img{
        width: 60px;
        margin-right: 1rem;
    }
}
</style>