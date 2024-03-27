<template>

    <!-- Login -->
    <LoginParentComponent
        v-if="!isLogged"
    />

    <!-- Dashboard -->
    <DashboardComponent 
        v-if="isLogged"
        :smViewport = smViewport
    />

</template>

<script>

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
                    console.log(newVal);
                    this.smViewport = newVal;
                },
                immediate: true
            }
        },
        data() {
            return {
                isLogged: true,
                smViewport: null
            }
        }
    }

</script>

<style>
</style>
