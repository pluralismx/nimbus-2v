<template>
    <div class="wizard-container">

        <!-- Tool bar -->
        <WizardToolbarComponent 
            @show-template-settings="handleShowTemplateSettings"
            @show-recipients-settings="handleRecipientsSettings"
            @show-client-settings="handleShowClientSettings"
            @activate-desktop-preview="handleDesktopPreview"
            @activate-mobile-preview="handleMobilePreview"
        />

        <!-- Aside -->
        <WizardAsideComponent
            :recipientsSettings = "recipientsSettings"
            :templateSettings = "templateSettings"
            :clientSettings="isVisibleClientSettings"
            :images="images"
            :website="website"
            @update-html-template = "handleUpdateHtmlTemplate"
            @send-emails="handleSendEmails"
            @email-added="handleEmailAdded"
            @image-uploaded="handleImageUploaded"

        />

        <!-- Preview -->
        <WizardPreviewComponent
            :desktopPreview = desktopPreview
            :mobilePreview = mobilePreview
            :previewTemplate = previewTemplate
        />

    </div>
</template>
<script>
    import WizardToolbarComponent from './WizardToolbarComponent.vue'
    import WizardAsideComponent from './WizardAsideComponent.vue'
    import WizardPreviewComponent from './WizardPreviewComponent.vue'

    export default {
        name: 'WizardDesktopComponent',
        components: {
            WizardToolbarComponent,
            WizardAsideComponent,
            WizardPreviewComponent,
        },
        props: {
            images: {
                type: Array,
                required: true
            },
            website: {
                type: Number,
                required: true
            }
        },
        data(){
            return {
                templateSettings: true,
                recipientsSettings: false,
                isVisibleClientSettings: false,
                desktopPreview: true,
                mobilePreview: false,
                previewTemplate: '',
                isVisibleSendEmailsModal: true
            }
        },
        methods: {
            // Layout
            handleShowTemplateSettings: function () {
                if(this.templateSettings == false){
                    this.templateSettings = true;
                    this.recipientsSettings = false;
                    this.isVisibleClientSettings = false;
                }
            },
            handleRecipientsSettings: function () {
                if(this.recipientsSettings == false){
                    this.recipientsSettings = true;
                    this.isVisibleClientSettings = false;
                    this.templateSettings = false;
                }
            },
            handleShowClientSettings: function () {
                if(this.isVisibleClientSettings == false){
                    this.isVisibleClientSettings = true;
                    this.recipientsSettings = false;
                    this.templateSettings = false;
                }
            },
            handleDesktopPreview: function () {
                if(this.desktopPreview == false){
                    this.desktopPreview = true;
                    this.mobilePreview = false;
                }
            },
            handleMobilePreview: function () {
                if(this.mobilePreview == false){
                    this.mobilePreview = true;
                    this.desktopPreview = false;
                }
            },
            handleUpdateHtmlTemplate: function (template) {
                this.previewTemplate = template;
                this.$emit('update-html-template', template);
            },
            handleSendEmails: function (list) {
                this.$emit('send-emails', list);
            },
            handleEmailAdded: function (notification) {
                this.$emit('email-added', notification);
            },
            handleCloseSendEmailsModal: function () {
                this.isVisibleSendEmailsModal = false;
            },
            handleImageUploaded: function (notification) {
                this.$emit('image-uploaded', notification);
            }
        }
    }
</script>
<style scoped>
    .wizard-container {
        display: grid;
        grid-template-columns: 30% 70%;
        grid-template-rows: 8% 92%;
        flex-grow: 1;
        border-radius: .5rem;
        box-shadow: 3px 3px 6px var(--shadows);
        min-height: 0;
        margin-top: 0;
        margin-left: 1rem;
        margin-bottom: 1rem;
        margin-right: 1rem;
    }
</style>