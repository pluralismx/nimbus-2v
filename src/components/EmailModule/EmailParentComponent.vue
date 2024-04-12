<template>
    <section>
        <EmailTitleBarComponent 
            :smViewport="smViewport"
            @email-preview="handleEmailPreview"
            @show-recipient-settings="handleShowRecipientSettings"
        />

        <!-- Mobile -->
        <WizardComponent 
            v-if="smViewport"
            @update-html-template="handleUpdateHtmlTemplate"
            :recipients="isVisibleRecipientsSettings"
        />

        <!-- Desktop -->
        <WizardDesktopComponent v-else/>

        <!-- Modals -->
        <EmailPreviewModalComponent 
            v-show="isVisibleEmailPreviewModal"
            :previewTemplate="previewTemplate"
            @close-email-preview="handleCloseEmailPreview"
        />

        <ImageUploadModalComponent 
            v-show="isVisibleImageUploadModal"
        />

    </section>
</template>
<script>
    import EmailTitleBarComponent from './EmailTitleBarComponent.vue';
    import WizardComponent from './Wizard/WizardComponent.vue';
    import WizardDesktopComponent from './Wizard/WizardDesktopComponent.vue';
    import EmailPreviewModalComponent from './Modals/EmailPreviewModalComponent.vue';
    import ImageUploadModalComponent from './Modals/ImageUploadModalComponent.vue';

    export default {
        name: 'EmailParentComponent',
        components: {
            EmailTitleBarComponent,
            WizardComponent,
            WizardDesktopComponent,
            EmailPreviewModalComponent,
            ImageUploadModalComponent
        },
        props: {
            smViewport: {
                type: Boolean,
                required: true
            }
        },
        data() {
            return {
                isVisibleEmailPreviewModal: false,
                isVisibleImageUploadModal: false,
                isVisibleRecipientsSettings: false,
                previewTemplate: null,
                theme: null
            }
        },
        methods: {
            handleEmailPreview(){
                this.isVisibleEmailPreviewModal = true;
            },
            handleUploadImage(){
                this.isVisibleImageUploadModal = true;
            },
            handleCloseEmailPreview() {
                this.isVisibleEmailPreviewModal = false;
            },

            // Email
            handleUpdateHtmlTemplate(template) {
                this.previewTemplate = template;
            },
            handleShowRecipientSettings(){
                if(!this.isVisibleRecipientsSettings){
                    this.isVisibleRecipientsSettings = true;
                }else{
                    this.isVisibleRecipientsSettings = false;
                }
            }

        },
    }
</script>
<style scoped>
    
    /* Mobile first */

    section {
        grid-column: 1/2;
        grid-row: 2/3;
        background-color: var(--basic);
        padding: 1rem;
        overflow-y: auto;
    }

    /* Desktop */

    @media only screen and (min-width: 1024px) {
        section {
            grid-column: 2/3;
            grid-row: 2/3;
            display: flex;
            flex-direction: column;
        }

        .wide {
            grid-column: 1/3;
            grid-row: 2/3;
        }
    }


</style>