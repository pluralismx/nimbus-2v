<template>
    <aside class="wizard-aside">
        <TemplateSelectionComponent 
            @toggle-template="handleToggleTemplate"
        />

        <!-- Newsletter -->
        <NewsLetterSettingsComponent 
            v-show="template == 'newsletter'"
            @upload-image="handleUploadImage"
        />

        <!-- Promotional -->
        <PromotionalSettingsComponent 
            v-show="template == 'promotional'"
            @upload-image="handleUploadImage"
        />

        <!-- Modals -->
        <ImageUploadModalComponent 
            v-show="isVisibleUploadImageModal"
        />

    </aside>
</template>
<script>
    import TemplateSelectionComponent from './TemplateSelectionComponent.vue'
    import NewsLetterSettingsComponent from './NewsLetterSettingsComponent.vue';
    import PromotionalSettingsComponent from './PromotionalSettingsComponent.vue';
    import ImageUploadModalComponent from './ImageUploadModalComponent.vue';

    export default {
        name: 'WizardAsideComponent',
        components: {
            TemplateSelectionComponent,
            NewsLetterSettingsComponent,
            PromotionalSettingsComponent,
            ImageUploadModalComponent
        },
        data() {
            return {
                template: null,
                isVisibleUploadImageModal: false
            }
        },
        methods: {
            handleToggleTemplate(template){
                this.template = template;
            },
            handleUploadImage(){
                this.isVisibleUploadImageModal = true;
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