<template>
    <div class="wizard-container">

        <!-- Tool bar -->
        <WizardToolbarComponent 
            @show-template-settings="handleShowTemplateSettings"
            @show-recipients-settings="handleRecipientsSettings"
        />

        <!-- Aside -->
        <WizardAsideComponent 
            :recipientsSettings = this.recipientsSettings
            :templateSettings = this.templateSettings
        />

        <!-- Preview -->
        <WizardPreviewComponent />
    </div>
</template>
<script>
    import WizardToolbarComponent from './WizardToolbarComponent.vue'
    import WizardAsideComponent from './WizardAsideComponent.vue'
    import WizardPreviewComponent from './WizardPreviewComponent.vue'

    export default {
        name: 'WizardDesktopComponent',
        components: {
            WizardToolbarComponent,
            WizardAsideComponent,
            WizardPreviewComponent
        },
        data(){
            return {
                templateSettings: false,
                recipientsSettings: false,
            }
        },
        methods: {
            handleShowTemplateSettings() {
                if(!this.templateSettings){
                    this.templateSettings = true;
                }
            },
            handleRecipientsSettings() {
                if(!this.recipientsSettings){
                    this.recipientsSettings = false;
                    
                }
            }
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