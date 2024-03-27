<template>
    <div class="wizard-container">

        <!-- Tool bar -->
        <WizardToolbarComponent />

        <!-- Aside -->
        <WizardAsideComponent />

        <!-- Preview -->

    </div>
</template>
<script>
    import WizardToolbarComponent from './WizardToolbarComponent.vue';
    import WizardAsideComponent from './WizardAsideComponent.vue';

    export default {
        name: 'WizardDesktopComponent',
        components: {
            WizardToolbarComponent,
            WizardAsideComponent
        }
    }
</script>
<style scoped>
    .wizard-container {
        display: grid;
        grid-template-columns: 30% 70%;
        grid-template-rows: 8% 92%;
        flex-grow: 1;
        border-radius: .5rem;
        box-shadow: 3px 3px 6px var(--shadows);
        min-height: 0;
    }
</style>