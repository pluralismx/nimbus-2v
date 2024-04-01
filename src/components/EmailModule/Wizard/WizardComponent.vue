<template>
    <div class="wizard-container">

        <!-- Template Selection -->
        <TemplateSelectionComponent 
            @toggle-template="handleToggleTemplate"
            @toggle-theme="handleToggleTheme"
        />

        <!-- News letter -->
        <NewsLetterSettingsComponent 
            v-show="template == 'newsletter'"
            :isSelected="template"
            :theme="theme"
            @open-image-modal="handleOpenImageModal"
            @update-html-template="handleUpdateHtmlTemplate"
        />

        <!-- Promotional -->
        <PromotionalSettingsComponent 
            v-show="template == 'promotional'"
            :isSelected="template"
            :theme="theme"
            @open-image-modal="handleOpenImageModal"
            @update-html-template="handleUpdateHtmlTemplate"
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
                theme: null,
                isVisibleUploadImageModal: false
            }
        },
        methods: {

            // Layout
            handleToggleTemplate(template){
                this.template = template;
            },
            handleOpenImageModal(){
                this.isVisibleUploadImageModal = true;
            },
            handleCloseImageModal() {
                this.isVisibleUploadImageModal = false;
            },

            // Email
            handleUpdateHtmlTemplate(template) {
                this.$emit('update-html-template', template);
            },
            handleToggleTheme(theme) {
                this.theme = theme;
            }
        }
    }
</script>
<style>

</style>