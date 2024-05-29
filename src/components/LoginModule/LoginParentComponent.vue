<template>
    <div class="login-main-container">
        <div class="login-container" v-show="isVisibleLogIn">
            <!-- Header -->
            <div class="login-container-header">
                <h1>Nimbus CRM 2.0</h1>
            </div>
            <!-- Body -->
            <div class="login-container-body">
                <span v-show="error" class="error-message">Credenciales invalidas</span>
                <div class="login-form">
                    <!-- Email -->
                    <div class="input-block">
                        <input v-model="email" type="text" placeholder="email">
                    </div>

                    <!-- Password -->
                    <div class="input-block">
                        <input v-model="password" type="password" placeholder="password">
                        <span class="input-message">¿Olvidó su contraseña?</span>
                    </div>

                    <!-- Login -->
                    <div class="login-block">
                        <button @click="logIn()" class="btn-primary">continuar</button>
                        <br>
                        <span @click="showCreateAccount">crear una cuenta</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Create account -->
        <CreateAccountComponent 
            v-show="isVisibleCreateAccount"
            @cancel="showCreateAccount"
        />
    </div>
</template>
<script>
    import CreateAccountComponent from './CreateAccountComponent.vue'
    import axios from '@/lib/axios'
    export default {
        name: 'LoginParentComponent',
        components: {
            CreateAccountComponent
        },
        data() {
            return {
                email: 'gerardo@pluralis.com.mx',
                password: '1234',
                error: false,

                // Layout
                isVisibleLogIn: true,
                isVisibleCreateAccount: false
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
                    const response = await axios.post('api/login', formData, {"withCredentials": true})
                    if(response.data.status=='success') {
                        let login = this.getIdentity();
                        if(login){
                            this.$emit('user-logged-in');
                            this.error = false;
                        }
                    }else if(response.data.status=="error"){
                        this.error = true;
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
                    const login = await axios.post('api/login', formData, {"withCredentials": true});
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

            }
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