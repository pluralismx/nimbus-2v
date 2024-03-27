<template>
    <aside class="wizard-aside">
        <TemplateSelectionComponent 
            @toggle-template="handleToggleTemplate"
        />

        <!-- Newsletter -->
        <NewsLetterSettingsComponent 
            v-show="template == 'newsletter'"
        />

        <!-- Promotional -->
        <PromotionalSettingsComponent 
            v-show="template == 'promotional'"
        />

    </aside>
</template>
<script>
    import TemplateSelectionComponent from './TemplateSelectionComponent.vue'
    import NewsLetterSettingsComponent from './NewsLetterSettingsComponent.vue';
    import PromotionalSettingsComponent from './PromotionalSettingsComponent.vue';

    export default {
        name: 'WizardAsideComponent',
        components: {
            TemplateSelectionComponent,
            NewsLetterSettingsComponent,
            PromotionalSettingsComponent
        },
        data() {
            return {
                template: null,
            }
        },
        methods: {
            handleToggleTemplate(template){
                this.template = template;
            }
        }
    }
</script>
<style scoped>
    .wizard-aside {
        grid-column: 1/2;
        grid-row: 2/3;
        background-color: var(--basic);
        border-right: 1px solid var(--primary);
        border-bottom-left-radius: .5rem;
        padding: 1rem;
        overflow-y: auto;
    }
</style>