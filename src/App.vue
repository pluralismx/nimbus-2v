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
            }
        },
        methods: {
            handleUserLoggedIn(identity){
                let credentials = JSON.stringify(identity);
                localStorage.setItem('identity', credentials);
                this.isLogged = true;
            },
            handleUserLoggedOut(){
                axios.get('api/logout', {"withCredentials": true})
                    .then(res=>{
                        if(res.data == 'success'){
                            this.isLogged = false;
                        }
                    })
                    .catch(error=>{
                        console.log(error);
                    })
            }
        }
    }

</script>

<style>
</style>
