<template>
    <div class="wizard-container">

        <!-- Template Selection -->
        <TemplateSelectionComponent
            v-show = "clientSettings == false"
            @toggle-template="handleToggleTemplate"
            @toggle-theme="handleToggleTheme"
        />

        <!-- News letter -->
        <NewsLetterSettingsComponent 
            v-show="template == 'newsletter' && recipients == false && clientSettings == false"
            :isSelected="template"
            :theme="theme"
            :image="templateImageData"
            @open-image-modal="handleOpenImageModal"
            @update-html-template="handleUpdateHtmlTemplate"
        />

        <!-- Promotional -->
        <PromotionalSettingsComponent 
            v-show="template == 'promotional' && recipients == false && clientSettings == false"
            :isSelected="template"
            :theme="theme"
            :image="templateImageData"
            @open-image-modal="handleOpenImageModal"
            @update-html-template="handleUpdateHtmlTemplate"
        />

        <!-- Custom -->
        <CustomEmailEditorComponent 
            v-show="template == 'custom' && recipients == false && clientSettings == false"
            :isSelected="template"
            @update-html-template="handleUpdateHtmlTemplate"
        />

        <!-- Recipients -->
        <RecipientsSettingsComponent 
            v-show="recipients && clientSettings == false"
            @send-emails="handleSendEmails"
        />

        <!-- Client settings -->
        <MailerSettingsComponent 
            v-show="clientSettings==true"
            :website="website"
            @email-added="handleEmailAdded"
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
            :recipients="emailAddresses"
        />
        
    </div>
</template>
<script>
    import TemplateSelectionComponent from '../TemplateSettings/TemplateSelectionComponent'
    import NewsLetterSettingsComponent from '../TemplateSettings/NewsLetterSettingsComponent'
    import PromotionalSettingsComponent from '../TemplateSettings/PromotionalSettingsComponent.vue'
    import CustomEmailEditorComponent from '../TemplateSettings/CustomEmailEditorComponent.vue'
    import ImageUploadModalComponent from '../Modals/ImageUploadModalComponent.vue'
    import RecipientsSettingsComponent from '../TemplateSettings/RecipientsSettingsComponent.vue'
    import SendingEmailsModal from '../Modals/SendingEmailsModal.vue'
    import MailerSettingsComponent from '../MailerSettings/MailerSettings.vue'

    export default {
        name: 'WizardComponent',
        components: {
            TemplateSelectionComponent,
            NewsLetterSettingsComponent,
            PromotionalSettingsComponent,
            CustomEmailEditorComponent,
            ImageUploadModalComponent,
            RecipientsSettingsComponent,
            SendingEmailsModal,
            MailerSettingsComponent
        },
        props: {
            recipients: {
                type: Boolean,
                required: true
            },
            website: {
                type: Number,
                required: true
            },
            images: {
                type: Array,
                required: true
            },
            clientSettings: {
                type: Boolean,
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
                // isVisibleClientSettings: false,
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
            handleSendEmails: function (list) {
                this.$emit('send-emails', list);
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
            },
            handleEmailAdded: function (notification) {
                this.$emit('email-added', notification);
            }
        }
    }
</script>
<style scoped>

</style>