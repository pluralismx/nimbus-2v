<template>
    <div>
        <!-- Confirm email -->
        <div class="login-container" v-show="isVisibleConfirmEmail">
            <!-- Header -->
            <div class="login-container-header">
                <h1>Recuperar contraseña</h1>
            </div>
            <!-- Body -->
            <div class="login-container-body">
                <span v-show="error" class="error-message">{{ error }}</span>
                <div class="login-form">
                    <!-- Email -->
                    <div class="input-block">
                        <input v-model="email" type="text" placeholder="email">
                    </div>

                    <!-- Verify Email -->
                    <div class="input-block">
                        <input v-model="e_verified" type="text" placeholder="confirm email">
                    </div>

                    <!-- button -->
                    <div class="login-block">
                        <button @click="verifyEmail()" class="btn-primary">continuar</button>
                        <br>
                        <span class="input-message" @click="cancel()">&larr; Cancelar</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Enter Pin -->
        <div class="login-container" v-show="isVisibleEnterPin">
            <!-- Header -->
            <div class="login-container-header">
                <h1>Ingrese el pin de 6 digitos</h1>
            </div>
            <!-- Body -->
            <div class="login-container-body">
                <span v-show="error" class="error-message">PIN incorrecto o expirado</span>
                <div class="login-form">
                    <!-- Email -->
                    <div class="input-block">
                        <input v-model="pin" type="text" placeholder="PIN">
                    </div>

                    <!-- Login -->
                    <div class="login-block">
                        <button @click="verifyPin" class="btn-primary">continuar</button>
                        <br>
                        <span class="input-message" @click="cancel()">&larr; Cancelar</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Update password -->
        <div class="login-container" v-show="isVisibleUpdatePassword">
            <!-- Header -->
            <div class="login-container-header">
                <h1>Reestablecer contraseña</h1>
            </div>
            <!-- Body -->
            <div class="login-container-body">
                <span v-show="error" class="error-message">Credenciales invalidas</span>
                <div class="login-form">
                    <!-- Email -->
                    <div class="input-block">
                        <input v-model="password" type="text" placeholder="nueva contraseña">
                    </div>

                    <!-- Verify Email -->
                    <div class="input-block">
                        <input v-model="p_verified" type="text" placeholder="confirmar contraseña">
                    </div>

                    <!-- Login -->
                    <div class="login-block">
                        <button @click="updatePassword" class="btn-primary">continuar</button>
                        <br>
                        <span class="input-message" @click="cancel()">&larr; Cancelar</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from '@/lib/axios'
    export default {
        name: 'ResetPasswordComponent',
        data() {
            return {
                // Confirm Email
                email: '',
                e_verified: '',

                // Verify pin
                pin: '',

                // New password
                password: '',
                p_verified: '',

                // Layout
                isVisibleConfirmEmail: true,
                isVisibleEnterPin: false,
                isVisibleUpdatePassword: false,
                error: ''

            }
        },
        methods: {
            cancel: function () {
                this.isVisibleConfirmEmail = false;
                this.$emit('cancel');
            },

            // Verify Email
            verifyEmail: async function () {
                if(this.email == this.e_verified){
                    const json = {
                        "email":this.e_verified
                    }
                    let formData = new FormData();
                    formData.append('json', JSON.stringify(json));
                    const response = await axios.post('api/users/resetPin', formData);
                    if(response.data.status == 'success'){
                        this.isVisibleConfirmEmail = false;
                        this.isVisibleEnterPin = true;
                    }else {
                        this.error = 'email incorrecto'
                    }
                }else {
                    this.error = 'los correos deben coincidir'
                }
            },
            verifyPin: async function () {
                const json = {
                    "email":this.e_verified,
                    "pin":this.pin
                }
                let formData = new FormData();
                formData.append('json', JSON.stringify(json));
                const response = await axios.post('api/users/verifyPin', formData);
                if(response.data.status == 'success'){
                    this.isVisibleEnterPin = false;
                    this.isVisibleUpdatePassword = true;
                }else {
                    this.error = 'Pin incorrecto'
                }
            },
            updatePassword: async function () {
                const json = {
                    "email":this.e_verified,
                    "password":this.p_verified,
                    "pin":this.pin
                }
                let formData = new FormData();
                formData.append('json', JSON.stringify(json));
                const response = await axios.post('api/users/resetPassword', formData);
                if(response.data.status == 'success'){
                    alert("contraseña reestablecida correctamente");
                    this.$emit('password-updated');
                }else {
                    this.error = 'Error desconocido'
                }
            },

        }
    }
</script>
<style scoped>
    .login-main-container {
        height: 100vh;
        width: 100vw;
        background: linear-gradient(45deg, var(--primary), var(--accent));
        background-size: 150%;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: aurora 12s ease-in-out infinite;
    }

    .login-container {
        background-color: var(--shadows);
        border-radius: .5rem;
        box-shadow: 3px 3px 14px #000;
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
        flex-direction: column;
        align-items: center;
    }

    button {
        width: 50%;
    }

    span {
        color: var(--warn);
    }

    span:hover {
        color: var(--accent);
        cursor: pointer;
    }

    .input-message {
        margin-top: 1rem;
        text-align: center;
    }

    .error-message {
        font-size: 12px;
        position: absolute;
        transform: translateY(-1rem);
    }

    @keyframes aurora {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position:100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
</style>