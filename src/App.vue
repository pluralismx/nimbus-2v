<template>

    <!-- Login -->
    <LoginParentComponent
        @user-logged-in="handleUserLoggedIn"
        v-if="isLogged==false"
    />

    <!-- Dashboard -->
    <DashboardComponent 
        v-if="isLogged==true"
        :smViewport = smViewport
        :identity = identity
        @user-logged-out="handleUserLoggedOut"
    />

</template>

<script>
    import axios from '@/lib/axios'
    import LoginParentComponent from './components/LoginModule/LoginParentComponent.vue';
    import DashboardComponent from './components/Dashboard/DashboardComponent.vue';

    export default {
        name: 'App',
        components: {
            LoginParentComponent,
            DashboardComponent
        },
        mounted() {
            this.verifySession();
        },
        computed: {
            isSmallViewport(){
                return window.innerWidth < 768;
            }
        },
        watch: {
            isSmallViewport: {
                handler(newVal){
                    this.smViewport = newVal;
                },
                immediate: true
            }
        },
        data() {
            return {
                smViewport: null,
                isLogged: false,
                identity: {},
            }
        },
        methods: {
            verifySession: async function () {
                const response = await axios.get('api/session', {"withCredentials":true});
                if(response.data.status === "success"){
                    this.identity = await JSON.parse(localStorage.getItem('identity'));
                    this.isLogged = true;
                }
            },
            handleUserLoggedIn: async function () {
                const storedIdentity = localStorage.getItem('identity');
                if (storedIdentity) {
                    try {
                        this.identity = JSON.parse(storedIdentity);
                        this.isLogged = true;
                    } catch (error) {
                        console.error('Error parsing identity from localStorage:', error);
                        // Manejar el error según sea necesario
                    }
                } else {
                    console.warn('No identity found in localStorage');
                    // Manejar el caso donde no hay datos en localStorage
                }
            },

            handleUserLoggedOut(){
                axios.get('api/logout', {"withCredentials": true})
                    .then(res=>{
                        if(res.data == 'success'){
                            this.isLogged = false;
                            localStorage.removeItem('identity');
                        }
                    })
                    .catch(error=>{
                        console.log(error);
                    });
            }
        }
    }

</script>

<style>
</style>
