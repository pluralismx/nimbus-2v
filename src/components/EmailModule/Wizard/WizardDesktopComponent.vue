<template>
    <div class="wizard-container">

        <!-- Tool bar -->
        <WizardToolbarComponent 
            @show-template-settings="handleShowTemplateSettings"
            @show-recipients-settings="handleRecipientsSettings"
            @activate-desktop-preview="handleDesktopPreview"
            @activate-mobile-preview="handleMobilePreview"
        />

        <!-- Aside -->
        <WizardAsideComponent 
            :recipientsSettings = this.recipientsSettings
            :templateSettings = this.templateSettings
            @update-html-template = "handleUpdateHtmlTemplate"
            @send-emails="handleSendEmails"
        />

        <!-- Preview -->
        <WizardPreviewComponent
            :desktopPreview = this.desktopPreview
            :mobilePreview = this.mobilePreview
            :previewTemplate = this.previewTemplate
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
            WizardPreviewComponent
        },
        data(){
            return {
                templateSettings: true,
                recipientsSettings: false,
                desktopPreview: true,
                mobilePreview: false,
                previewTemplate: ''
            }
        },
        methods: {
            handleShowTemplateSettings() {
                if(this.templateSettings == false){
                    this.templateSettings = true;
                    this.recipientsSettings = false;
                }
            },
            handleRecipientsSettings() {
                if(this.recipientsSettings == false){
                    this.recipientsSettings = true;
                    this.templateSettings = false;
                }
            },
            handleDesktopPreview() {
                if(this.desktopPreview == false){
                    this.desktopPreview = true;
                    this.mobilePreview = false;
                }
            },
            handleMobilePreview() {
                if(this.mobilePreview == false){
                    this.mobilePreview = true;
                    this.desktopPreview = false;
                }
            },
            handleUpdateHtmlTemplate(template) {
                this.previewTemplate = template;
            },
            handleSendEmails: function (list) {
                this.$emit('send-emails', list);
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