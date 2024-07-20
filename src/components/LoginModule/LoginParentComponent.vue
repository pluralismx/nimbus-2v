<template>
    <div class="login-main-container">

        <!-- Login -->
        <div class="login-container" v-show="isVisibleLogIn">
            <!-- Header -->
            <div class="login-container-header">
                <h1>Nimbus CRM 2.0</h1>
            </div>
            <!-- Body -->
            <div class="login-container-body">
                <span v-show="error != false" class="error-message">{{ error }}</span>
                <div class="login-form">
                    <!-- Email -->
                    <div class="input-block">
                        <input v-model="email" type="text" placeholder="email">
                    </div>

                    <!-- Password -->
                    <div class="input-block">
                        <input v-model="password" type="password" placeholder="password">
                    </div>

                    <!-- Login -->
                    <div class="login-block">
                        <button @click="logIn()" class="btn-primary">iniciar sesión</button>
                        <span class="input-message" @click="showForgotPassword">¿Olvidó su contraseña?</span>
                        <br>
                        <span @click="showCreateAccount">crear cuenta</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Create account -->
        <CreateAccountComponent 
            v-show="isVisibleCreateAccount"
            @cancel="showCreateAccount"
            @user-registered="handleUserRegistered"
        />

        <!-- Reset password -->
        <ResetPasswordComponent 
            v-if="isVisibleResetPassword"
            @cancel="showForgotPassword"
        />

        <!-- Success modal -->
        <SuccessModalComponent 
            v-show="status !=false"
            :status="status"
            @close-success-modal="handleUserRegistered"
        />
    </div>
</template>
<script>
    import CreateAccountComponent from './CreateAccountComponent.vue'
    import ResetPasswordComponent from './ResetPasswordComponent.vue'
    import SuccessModalComponent from './SuccessModalComponent.vue'
    import axios from '@/lib/axios'
    export default {
        name: 'LoginParentComponent',
        components: {
            CreateAccountComponent,
            ResetPasswordComponent,
            SuccessModalComponent
        },
        data() {
            return {
                email: '',
                password: '',
                error: false,

                // Layout
                isVisibleLogIn: true,
                isVisibleCreateAccount: false,
                isVisibleResetPassword: false,
                status: false
            }
        },
        methods: {
            logIn: async function() {
                
                const data = {
                    'email': this.email,
                    'password': this.password
                }

                const json = JSON.stringify(data);
                let formData = new FormData();
                formData.append('json', json);
                try {
                    
                    const response = await axios.post('api/login', formData, { withCredentials: true });
                    
                    if(response.data.status=='success') {
                        
                        let login = await this.getIdentity();
                        
                        if(login){
                            this.$emit('user-logged-in');
                            this.error = false;
                        }
                    }else if(response.data.message=="inactive"){
                        this.error = "Por favor activa tu cuenta";
                    }else if(response.data.status=="error"){
                        this.error = "Credenciales inválidas";
                    }
                } catch (error) {
                    console.log(error); 
                }
            },
            getIdentity: async function() {
                const data = {
                    'email': this.email,
                    'password': this.password,
                }
                const json = JSON.stringify(data);
                let formData = new FormData();
                formData.append('json', json);
                
                try {
                    const login = await axios.post('api/login', formData, { withCredentials: true });
                    console.log(login);
                    if(login.data.status == "success"){
                        let identity = JSON.stringify(login.data.identity);
                        localStorage.setItem('identity', identity);
                        return true;
                    }else{
                        return false;
                    }
                } catch (error) {
                    console.error('Error:', error);
                    return false;
                }

                
            },
            showCreateAccount: function () {

                if(this.isVisibleCreateAccount == false) {
                    this.isVisibleLogIn = false;
                    this.isVisibleCreateAccount = true;
                }else {
                    this.isVisibleLogIn = true;
                    this.isVisibleCreateAccount = false;
                }
            },
            showForgotPassword: function () {
                if(this.isVisibleResetPassword == false) {
                    this.isVisibleLogIn = false;
                    this.isVisibleResetPassword = true;
                }else {
                    this.isVisibleLogIn = true;
                    this.isVisibleResetPassword = false;
                }
            },
            handleUserRegistered: function (status) {
                switch (status) {
                    case false :
                        this.status = status;
                        break;
                    default:
                        this.status = status;
                        break;
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
        animation: aurora 8s ease-in-out infinite;
    }

    .login-container {
        background-color: var(--shadows);
        border-radius: .5rem;
        box-shadow: 3px 3px 12px  rgba(0,0,0,.7);
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
        width: 80%;
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