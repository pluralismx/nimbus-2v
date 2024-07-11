<template>
    <div class="login-container">
        <!-- Header -->
        <div class="login-container-header">
            <h1>Registrarse</h1>
        </div>
        <!-- Body -->
        <div class="login-container-body">
            <span v-show="error" class="error-message">Credenciales invalidas</span>
            <form @submit.prevent="submitForm" class="login-form">
                <!-- nombre -->
                <div class="input-block">
                    <input v-model="name" type="text" placeholder="Nombre" required>
                </div>

                <!-- apellidos -->
                <div class="input-block">
                    <input v-model="surname" type="text" placeholder="apellidos" required>
                </div>

                <!-- email -->
                <div class="input-block">
                    <input v-model="email" type="text" placeholder="email" required>
                </div>

                <!-- password -->
                <div class="input-block">
                    <input v-model="password" type="password" placeholder="password" required>
                </div>

                <!-- password -->
                <div class="input-block">
                    <input v-model="verified" type="password" placeholder="confirm password" required>
                </div>

                <!-- confirm password -->
                <div class="login-block">
                    <button @click="cancel" class="btn-warning">cancelar</button>
                    <button @click="register" class="btn-primary">continuar</button>                    
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import axios from '@/lib/axios';
export default {
    name: "CreateAccountComponent",
    data() {
        return {
            name: '',
            surname: '',
            email: '',
            password: '',
            verified: '',
        }
    },
    methods: {
        cancel: function () {
            this.$emit('cancel');
        },
        register: async function () {
            if (this.password !== this.verified) {
                this.$emit('user-registered', {
                    title: "Error al crear cuenta",
                    content: "Las contraseñas no coinciden."
                });
                return;
            }

            if (this.password.length < 8) {
                this.$emit('user-registered', {
                    title: "Error al crear cuenta",
                    content: "La contraseña debe tener al menos 8 caracteres."
                });
                return;
            }

            const json = {
                name: this.name,
                surname: this.surname,
                email: this.email,
                password: this.verified
            };
            
            let formData = new FormData();
            formData.append('json', JSON.stringify(json));
            
            // Request to the backend
            this.$emit('user-registered', {
                title: "Creando cuenta",
                content: "Un momento por favor..."
            });

            const response = await axios.post('api/register', formData);

            // Request status success
            if (response.data.status == "success") {
                this.name = '';
                this.surname = '';
                this.email = '';
                this.password = '';
                this.verified = '';

                this.$emit('cancel');
                this.$emit('user-registered', {
                    title: "Cuenta creada exitosamente",
                    content: "Revise su bandeja de entrada para activar su cuenta"
                });
            } else {
                this.name = '';
                this.surname = '';
                this.email = '';
                this.password = '';
                this.verified = '';

                this.$emit('user-registered', {
                    title: "Error al crear cuenta",
                    content: "El correo ya ha sido utilizado o hubo un error al intentar crear su cuenta"
                });
            }
        }
    }
}
</script>
<style scoped>
.login-container {
    background-color: var(--shadows);
    border-radius: .5rem;
    box-shadow: 3px 3px 14px #000;
    width: 80%;
}

.login-container-header {
    padding: 1rem;
    color: var(--accent);
}

.login-container-body {
    padding: 1rem;
    position: relative;
}

.input-block {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
}

.login-block {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
}

button {
    width: 30%;
}

@media only screen and (min-width: 1024px){
    .login-container {
        background-color: var(--shadows);
        border-radius: .5rem;
        box-shadow: 3px 3px 14px #000;
        width: 350px;
    }
}
</style>