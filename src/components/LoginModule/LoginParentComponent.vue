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
                        <button @click="signIn()" class="btn-primary">continuar</button>
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
                email: 'megan@pluralis.com.mx',
                password: 'dick',
                identity: {}
            }
        },
        methods: {
            signIn() {
                let email = this.email;
                let password = this.password;
                let formData = new FormData();

                const json = {
                    'email': email,
                    'password': password,
                    'getToken': null
                }

                formData.append('json', JSON.stringify(json));

                axios.post('api/login', formData)
                    .then(res => {
                        if(res.data == 'success'){
                            // se genero la cookie
                            axios.post('api/login', formData, { 'withCredentials': true })
                                .then(res => {
                                    if(res.data.status == 'success'){
                                        this.identity = res.data.identity;
                                    }else {
                                        this.identity = {};
                                    }
                                    this.$emit('user-logged-in', this.identity);
                                })
                                .catch(error => {
                                    console.log(error);
                                });
                        }else {
                            this.identity = {};
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
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