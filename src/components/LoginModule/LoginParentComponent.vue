<template>
    <div class="login-main-container">
        <div class="login-container">
            <!-- Header -->
            <div class="login-container-header">
                <h1>Nimbus CRM 2.0</h1>
            </div>
            <!-- Body -->
            <div class="login-container-body">

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
                        <button @click="logIn()" class="btn-primary">continuar</button>
                        <br>
                        <span>¿Olvidó su contraseña?</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from '@/lib/axios'
    export default {
        name: 'LoginParentComponent',
        data() {
            return {
                email: 'gerardo@pluralis.com.mx',
                password: '1234'
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
                    const login = await axios.post('api/login', formData, {"withCredentials": true})
                    if(login) {
                        const identity = await this.getIdentity();
                        if(identity){
                            this.$emit('user-logged-in');
                        }
                    }else {
                        console.log("No se pudo ejecutar el metodo getIdentity()");
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
                    }
                } catch (error) {
                    console.error('Error:', error);
                    return false;
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

    span {
        color: var(--warn);
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