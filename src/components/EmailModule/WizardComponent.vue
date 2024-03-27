<template>
    <div class="wizard-container">

        <!-- Template Selection -->
        <TemplateSelectionComponent 
            @toggle-template="handleToggleTemplate"
        />

        <!-- News letter -->
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
        
    </div>
</template>
<script>
    import TemplateSelectionComponent from './TemplateSelectionComponent'
    import NewsLetterSettingsComponent from './NewsLetterSettingsComponent'
    import PromotionalSettingsComponent from './PromotionalSettingsComponent.vue';
    import ImageUploadModalComponent from './ImageUploadModalComponent.vue';

    export default {
        name: 'WizardComponent',
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
<style>

</style>