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
            :website="website"
            @open-image-modal="handleOpenImageModal"
            @update-html-template="handleUpdateHtmlTemplate"
        />

        <!-- Promotional -->
        <PromotionalSettingsComponent 
            v-show="template == 'promotional' && recipients == false && clientSettings == false"
            :isSelected="template"
            :theme="theme"
            :image="templateImageData"
            :website="website"
            @open-image-modal="handleOpenImageModal"
            @update-html-template="handleUpdateHtmlTemplate"
        />

        <!-- Institutional -->
        <InstitutionalSettingsComponent
            v-show="template == 'institutional' && recipients == false && clientSettings == false"
            @open-image-modal="handleOpenImageModal"
            @update-html-template="handleUpdateHtmlTemplate" 
            :isSelected="template"
            :theme="theme"
            :image="templateImageData"
            :website="website"
        />

        <!-- Call to action -->
        <CallToActionSettingsComponent
            v-show="template == 'callToAction' && recipients == false && clientSettings == false"
            @open-image-modal="handleOpenImageModal"
            @update-html-template="handleUpdateHtmlTemplate" 
            :isSelected="template"
            :theme="theme"
            :image="templateImageData"
            :website="website"
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
            @image-deleted="handleImageDeleted"
        />

        <SendingEmailsModal 
            v-show="isVisibleSendEmailsModal"
            :emailContent="emailContent"
            :recipients="emailAddresses"
            :website="website"
            @close-modal="handleCloseSendEmailsModal"
        />
        
    </div>
</template>
<script>
    import TemplateSelectionComponent from '../TemplateSettings/TemplateSelectionComponent'
    import NewsLetterSettingsComponent from '../TemplateSettings/NewsLetterSettingsComponent'
    import PromotionalSettingsComponent from '../TemplateSettings/PromotionalSettingsComponent.vue'
    import CustomEmailEditorComponent from '../TemplateSettings/CustomEmailEditorComponent.vue'
    import InstitutionalSettingsComponent from '../TemplateSettings/InstitutionalSettingsComponent.vue'
    import CallToActionSettingsComponent from '../TemplateSettings/CallToActionSettingsComponent.vue'
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
            CallToActionSettingsComponent,
            InstitutionalSettingsComponent,
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
                template: '',
                theme: "#037e99",
                templateImageSection: '',
                templateImageData: {},
                isVisibleUploadImageModal: false,
                isVisibleSendEmailsModal: false,
                
                // isVisibleClientSettings: false,
                emailContent: '',

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
            handleImageUploaded: function (notification) {
                this.$emit('image-uploaded', notification);
            },
            handleEmailAdded: function (notification) {
                this.$emit('email-added', notification);
            },
            handleImageDeleted: function (notification) {
                this.$emit('image-deleted', notification);
            }
        }
    }
</script>
<style scoped>

</style>