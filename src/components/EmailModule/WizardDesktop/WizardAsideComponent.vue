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
        />

        <!-- Promotional -->
        <PromotionalSettingsComponent 
            v-show="template == 'promotional' && templateSettings == true"
            @open-image-modal="handleOpenImageModal"
            @update-html-template="handleUpdateHtmlTemplate"
            :isSelected="template"
            :theme="theme"
            :image="templateImageData"
        />

        <!-- Custom -->
        <CustomEmailEditorComponent 
            v-show="template == 'custom' && templateSettings == true"
            @update-html-template="handleUpdateHtmlTemplate"
            :isSelected="template"
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
            @close-image-modal="handleCloseImageModal"
            @image-selected="handleImageSelected"
            @image-uploaded="handleImageUploaded"
            :images="images"
            :website="website"
        />

    </aside>
</template>
<script>
    import TemplateSelectionComponent from '../TemplateSettings/TemplateSelectionComponent.vue'
    import NewsLetterSettingsComponent from '../TemplateSettings/NewsLetterSettingsComponent.vue'
    import PromotionalSettingsComponent from '../TemplateSettings/PromotionalSettingsComponent.vue'
    import CustomEmailEditorComponent from '../TemplateSettings/CustomEmailEditorComponent.vue'
    import ImageUploadModalComponent from '../Modals/ImageUploadModalComponent.vue'
    import RecipientsSettingsComponent from '../TemplateSettings/RecipientsSettingsComponent.vue'
    import MailerSettingsComponent from '../MailerSettings/MailerSettings.vue'

    export default {
        name: 'WizardAsideComponent',
        components: {
            TemplateSelectionComponent,
            NewsLetterSettingsComponent,
            PromotionalSettingsComponent,
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
            }
        },
        data() {
            return {
                template: null,
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
                console.log(this.templateImageData);
                this.templateImageData = json;
            },
            handleImageUploaded: function () {
                this.$('image-uploaded');
            },
            handleEmailAdded: function (notification) {
                this.$emit('email-added', notification);
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