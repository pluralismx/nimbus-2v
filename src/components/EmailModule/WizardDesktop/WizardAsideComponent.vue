<template>
    <aside class="wizard-aside">
        <TemplateSelectionComponent
            v-show="clientSettings==false"
            @toggle-template="handleToggleTemplate"
            @toggle-theme="handleToggleTheme"
        />

        <!-- Newsletter -->
        <NewsLetterSettingsComponent 
            v-show="template == 'newsletter' && templateSettings == true"
            @open-image-modal="handleOpenImageModal"
            @update-html-template="handleUpdateHtmlTemplate"
            :isSelected="template"
            :theme="theme"
            :image="templateImageData"
            :website="website"
        />

        <!-- Promotional -->
        <PromotionalSettingsComponent 
            v-show="template == 'promotional' && templateSettings == true"
            @open-image-modal="handleOpenImageModal"
            @update-html-template="handleUpdateHtmlTemplate"
            :isSelected="template"
            :theme="theme"
            :image="templateImageData"
            :suscription="suscription"
            :website="website"
        />

        <!-- Institutional -->
        <InstitutionalSettingsComponent
            v-show="template == 'institutional' && templateSettings == true"
            @open-image-modal="handleOpenImageModal"
            @update-html-template="handleUpdateHtmlTemplate" 
            :isSelected="template"
            :theme="theme"
            :image="templateImageData"
            :website="website"
        />

        <!-- Call to action -->
        <CallToActionSettingsComponent
            v-show="template == 'callToAction' && templateSettings == true"
            @open-image-modal="handleOpenImageModal"
            @update-html-template="handleUpdateHtmlTemplate" 
            :isSelected="template"
            :theme="theme"
            :image="templateImageData"
            :website="website"
        />

        <!-- Invoice  -->
         <InvoiceSettingsComponent
            v-show="template == 'invoice' && templateSettings == true"
            @open-image-modal="handleOpenImageModal"
            @update-html-template="handleUpdateHtmlTemplate" 
            :isSelected="template"
            :theme="theme"
            :image="templateImageData"
            :website="website" 
         />

        <!-- Custom -->
        <CustomEmailEditorComponent 
            v-show="template == 'custom' && templateSettings == true"
            @update-html-template="handleUpdateHtmlTemplate"
            :isSelected="template"
            :website="website"
        />

        <!-- Recipients -->
        <RecipientsSettingsComponent 
            v-show="recipientsSettings == true"
            @send-emails="handleSendEmails"
        />

        <!-- Client config -->
        <MailerSettingsComponent 
            v-show="clientSettings"
            :website="website"
            @email-added="handleEmailAdded"
        />

        <!-- Modals -->
        <ImageUploadModalComponent 
            v-show="isVisibleUploadImageModal"
            :images="images"
            :website="website"
            @close-image-modal="handleCloseImageModal"
            @image-selected="handleImageSelected"
            @image-uploaded="handleImageUploaded"
            @image-deleted="handleImageDeleted"
        />

    </aside>
</template>
<script>
    import TemplateSelectionComponent from '../TemplateSettings/TemplateSelectionComponent.vue'
    import NewsLetterSettingsComponent from '../TemplateSettings/NewsLetterSettingsComponent.vue'
    import PromotionalSettingsComponent from '../TemplateSettings/PromotionalSettingsComponent.vue'
    import InstitutionalSettingsComponent from '../TemplateSettings/InstitutionalSettingsComponent.vue'
    import CallToActionSettingsComponent from '../TemplateSettings/CallToActionSettingsComponent.vue'
    import CustomEmailEditorComponent from '../TemplateSettings/CustomEmailEditorComponent.vue'
    import ImageUploadModalComponent from '../Modals/ImageUploadModalComponent.vue'
    import RecipientsSettingsComponent from '../TemplateSettings/RecipientsSettingsComponent.vue'
    import MailerSettingsComponent from '../MailerSettings/MailerSettings.vue'
    import InvoiceSettingsComponent from '../TemplateSettings/InvoiceSettingsComponent.vue'

    export default {
        name: 'WizardAsideComponent',
        components: {
            TemplateSelectionComponent,
            NewsLetterSettingsComponent,
            PromotionalSettingsComponent,
            InstitutionalSettingsComponent,
            CallToActionSettingsComponent,
            InvoiceSettingsComponent,
            CustomEmailEditorComponent,
            ImageUploadModalComponent,
            RecipientsSettingsComponent,
            MailerSettingsComponent
        },
        props: {
            recipientsSettings: {
                type: Boolean,
                required: true
            },
            templateSettings: {
                type: Boolean,
                required: true
            },
            clientSettings: {
                type: Boolean,
                required: true
            },
            images: {
                type: Array,
                required: true
            },
            website: {
                type: Number,
                required: true
            },
            suscription: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                template: "",
                theme: "#037e99",
                isVisibleUploadImageModal: false,
                templateImageData: {},
                templateImageSection: '',
            }
        },
        methods: {
            handleToggleTemplate: function (template){
                this.template = template;
            },
            handleToggleTheme: function (theme) {
                this.theme = theme;
            },
            handleOpenImageModal: function (section){
                this.isVisibleUploadImageModal = true;
                this.templateImageSection = section;
            },
            handleCloseImageModal: function () {
                this.isVisibleUploadImageModal = false;
            },
            handleUpdateHtmlTemplate: function (template) {
                this.$emit('update-html-template', template);
            },
            handleSendEmails: function (list) {
                this.$emit('send-emails', list);
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

    .wizard-aside {
        grid-column: 1/2;
        grid-row: 2/3;
        background-color: var(--basic);
        border-right: 1px solid var(--primary);
        border-bottom-left-radius: .5rem;
        padding: 2rem;
        overflow-y: auto;
    }
    
</style>