<template>
    <div class="wizard-container">

        <!-- Template Selection -->
        <TemplateSelectionComponent 
            @toggle-template="handleToggleTemplate"
        />

        <!-- News letter -->
        <NewsLetterSettingsComponent 
            v-show="template == 'newsletter'"
            @open-image-modal="handleOpenImageModal"
        />

        <!-- Promotional -->
        <PromotionalSettingsComponent 
            v-show="template == 'promotional'"
            @open-image-modal="handleOpenImageModal"
        />

        <!-- Modals -->
        <ImageUploadModalComponent 
            v-show="isVisibleUploadImageModal"
            @close-image-modal="handleCloseImageModal"
        />
        
    </div>
</template>
<script>
    import TemplateSelectionComponent from './TemplateSelectionComponent'
    import NewsLetterSettingsComponent from './NewsLetterSettingsComponent'
    import PromotionalSettingsComponent from './PromotionalSettingsComponent.vue';
    import ImageUploadModalComponent from '../Modals/ImageUploadModalComponent.vue';

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
                this.$emit('change-preview-template', template);
            },
            handleOpenImageModal(){
                this.isVisibleUploadImageModal = true;
            },
            handleCloseImageModal() {
                this.isVisibleUploadImageModal = false;
            }
        }
    }
</script>
<style>

</style>