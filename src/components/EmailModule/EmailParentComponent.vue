<template>
    <section>
        <EmailTitleBarComponent 
            :smViewport="smViewport"
            @email-preview="handleEmailPreview"
            @show-recipient-settings="handleShowRecipientSettings"
            @show-client-settings="handleShowClientSettings"
        />

        <!-- Mobile -->
        <WizardComponent 
            v-if="smViewport"
            @update-html-template="handleUpdateHtmlTemplate"
            :recipients="isVisibleRecipientsSettings"
            :clientSettings="isVisibleClientSettings"
            :website="website"
            :images="images"
            @image-uploaded="handleImageUploaded"
        />

        <!-- Desktop -->
        <WizardDesktopComponent 
            v-else
            @send-emails="handleSendEmails"
            :website="website"
            :images="images"
            @image-uploaded="handleImageUploaded"
        />

        <!-- Modals -->
        <EmailPreviewModalComponent 
            v-show="isVisibleEmailPreviewModal"
            :previewTemplate="previewTemplate"
            @close-email-preview="handleCloseEmailPreview"
        />

        <SendEmailsModalComponent 
            v-show="isVisibleSendEmailsModal"
            @close-modal="handleCloseSendEmailsModal"
        />

    </section>
</template>
<script>
    import EmailTitleBarComponent from './EmailTitleBarComponent.vue';
    import WizardComponent from './WizardMobile/WizardComponent.vue';
    import WizardDesktopComponent from './WizardDesktop/WizardDesktopComponent.vue';
    import EmailPreviewModalComponent from './Modals/EmailPreviewModalComponent.vue';
    import SendEmailsModalComponent from './Modals/SendingEmailsModal.vue'

    export default {
        name: 'EmailParentComponent',
        components: {
            EmailTitleBarComponent,
            WizardComponent,
            WizardDesktopComponent,
            EmailPreviewModalComponent,
            SendEmailsModalComponent
        },
        props: {
            smViewport: {
                type: Boolean,
                required: true
            },
            // here we are receving the addresses
            leads: {
                type: Array,
                required: true
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
                isVisibleEmailPreviewModal: false,
                isVisibleRecipientsSettings: false,
                isVisibleSendEmailsModal: false,
                isVisibleClientSettings: false,
                previewTemplate: null,
                theme: null,
                recipients: []
            }
        },
        methods: {
            handleEmailPreview(){
                this.isVisibleEmailPreviewModal = true;
            },
            handleUploadImage(){
                this.isVisibleImageUploadModal = true;
                // console.log(this.website);
                console.log('test');
            },
            handleCloseEmailPreview() {
                this.isVisibleEmailPreviewModal = false;
            },

            // Email
            handleUpdateHtmlTemplate: function (template) {
                this.previewTemplate = template;
            },
            handleShowRecipientSettings: function (){
                if(!this.isVisibleRecipientsSettings){
                    this.isVisibleRecipientsSettings = true;
                    this.isVisibleClientSettings = false;
                }else{
                    this.isVisibleRecipientsSettings = false;
                    this.isVisibleClientSettings = false;
                }
            },
            handleSendEmails: function (list) {
                this.recipients = [];
                this.leads.forEach((item) => {
                    if (list.includes(item.status)) {
                        this.recipients.push(item.email);
                    }
                });
                this.isVisibleSendEmailsModal = true;
                console.log(this.recipients);
                
            },
            handleCloseSendEmailsModal: function () {
                this.isVisibleSendEmailsModal = false;
            },
            handleImageUploaded: function () {
                this.$emit('image-uploaded');
            },
            handleShowClientSettings: function () {
                if(!this.isVisibleClientSettings){
                    this.isVisibleClientSettings = true;
                }else{
                    this.isVisibleClientSettings = false;
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

::-webkit-scrollbar {
    display: none;
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