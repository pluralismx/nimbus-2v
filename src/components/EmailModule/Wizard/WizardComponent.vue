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
            :image="templateImageData"
            @open-image-modal="handleOpenImageModal"
            @update-html-template="handleUpdateHtmlTemplate"
        />

        <!-- Promotional -->
        <PromotionalSettingsComponent 
            v-show="template == 'promotional' && recipients == false"
            :isSelected="template"
            :theme="theme"
            :image="templateImageData"
            @open-image-modal="handleOpenImageModal"
            @update-html-template="handleUpdateHtmlTemplate"
        />

        <!-- Custom -->
        <CustomEmailEditorComponent 
            v-show="template == 'custom' && recipients == false"
            :isSelected="template"
            @update-html-template="handleUpdateHtmlTemplate"
        />

        <!-- Recipients -->
        <RecipientsSettingsComponent 
            v-show="recipients"
            @send-emails="handleSendEmails"

        />

        <!-- Modals -->
        <ImageUploadModalComponent 
            v-show="isVisibleUploadImageModal"
            :website="website"
            :images="images"
            @close-image-modal="handleCloseImageModal"
            @image-selected="handleImageSelected"
            @image-uploaded="handleImageUploaded"
        />

        <SendingEmailsModal 
            v-show="isVisibleSendEmailsModal"
            :emailContent="emailContent"
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
            },
            website: {
                type: Number,
                required: true
            },
            images: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                template: null,
                theme: null,
                templateImageSection: '',
                templateImageData: {},
                isVisibleUploadImageModal: false,
                isVisibleSendEmailsModal: true,
                emailContent: ''
            }
        },
        methods: {

            // Layout
            handleToggleTemplate(template){
                this.template = template;
            },
            handleOpenImageModal(section){
                this.templateImageSection = section;
                this.isVisibleUploadImageModal = true;
            },
            handleCloseImageModal() {
                this.isVisibleUploadImageModal = false;
            },

            // Email
            handleUpdateHtmlTemplate(template) {
                this.emailContent = template
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
            },
            handleImageSelected: function (image_name) {
                const json = {
                    "image_name": image_name,
                    "section": this.templateImageSection
                }
                this.templateImageData = json;
            },
            handleImageUploaded: function () {
                this.$emit('image-uploaded');
            }
        }
    }
</script>
<style scoped>

</style>