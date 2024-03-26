<template>

    <!-- Login -->
    <LoginParentComponent
        v-if="!isLogged"
    />

    <!-- Dashboard -->
    <DashboardComponent 
        v-if="isLogged"
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
        data() {
            return {
                isLogged: true
            }
        }
    }

</script>

<style>
</style>
