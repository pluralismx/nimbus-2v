<template>
    <div class="wizard-container">

        <!-- Template Selection -->
        <TemplateSelectionComponent 
            @toggle-template="handleToggleTemplate"
            @toggle-theme="handleToggleTheme"
        />

        <!-- News letter -->
        <NewsLetterSettingsComponent 
            v-show="template == 'newsletter' && recipients == false"
            :isSelected="template"
            :theme="theme"
            @open-image-modal="handleOpenImageModal"
            @update-html-template="handleUpdateHtmlTemplate"
        />

        <!-- Promotional -->
        <PromotionalSettingsComponent 
            v-show="template == 'promotional' && recipients == false"
            :isSelected="template"
            :theme="theme"
            @open-image-modal="handleOpenImageModal"
            @update-html-template="handleUpdateHtmlTemplate"
        />

        <!-- Custom -->
        <CustomEmailEditorComponent 
            v-show="template == 'custom' && recipients == false"
            @update-html-template="handleUpdateHtmlTemplate"
            :isSelected="template"
        />

        <!-- Recipients -->
        <RecipientsSettingsComponent 
            v-show="recipients"
            @send-emails="handleSendEmails"
        />

        <!-- Modals -->
        <ImageUploadModalComponent 
            v-show="isVisibleUploadImageModal"
            @close-image-modal="handleCloseImageModal"
        />

        <SendingEmailsModal 
            v-show="isVisibleSendEmailsModal"
            @close-modal="handleCloseSendEmailsModal"
        />
        
    </div>
</template>
<script>
    import TemplateSelectionComponent from './TemplateSelectionComponent'
    import NewsLetterSettingsComponent from './NewsLetterSettingsComponent'
    import PromotionalSettingsComponent from './PromotionalSettingsComponent.vue';
    import CustomEmailEditorComponent from './CustomEmailEditorComponent.vue';
    import ImageUploadModalComponent from '../Modals/ImageUploadModalComponent.vue';
    import RecipientsSettingsComponent from '../Wizard/RecipientsSettingsComponent.vue';
    import SendingEmailsModal from '../Modals/SendingEmailsModal.vue';

    export default {
        name: 'WizardComponent',
        components: {
            TemplateSelectionComponent,
            NewsLetterSettingsComponent,
            PromotionalSettingsComponent,
            CustomEmailEditorComponent,
            ImageUploadModalComponent,
            RecipientsSettingsComponent,
            SendingEmailsModal
        },
        props: {
            recipients: {
                type: Boolean,
                required: false
            }
        },
        data() {
            return {
                template: null,
                theme: null,
                isVisibleUploadImageModal: false,
                isVisibleSendEmailsModal: true
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
            },
            handleSendEmails: function () {
                this.isVisibleSendEmailsModal = true;
            },
            handleCloseSendEmailsModal: function () {
                this.isVisibleSendEmailsModal = false;
            }
        }
    }
</script>
<style scoped>

</style>