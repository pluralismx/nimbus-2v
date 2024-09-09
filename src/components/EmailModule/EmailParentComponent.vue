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
            @send-emails="handleSendEmails"
            @image-uploaded="handleImageUploaded"
            @image-deleted="handleImageDeleted"
            @email-added="handleEmailAdded"
            :recipients="isVisibleRecipientsSettings"
            :clientSettings="isVisibleClientSettings"
            :website="website"
            :images="images"
        />

        <!-- Desktop -->
        <WizardDesktopComponent 
            v-else
            @send-emails="handleSendEmails"
            @image-uploaded="handleImageUploaded"
            @image-deleted="handleImageDeleted"
            @email-added="handleEmailAdded"
            @update-html-template="handleUpdateHtmlTemplate"
            :website="website"
            :images="images"
            
        />

        <!-- Modals -->
        <EmailPreviewModalComponent 
            v-show="isVisibleEmailPreviewModal"
            @close-email-preview="handleCloseEmailPreview"
            :previewTemplate="previewTemplate"
            
        />

        <SendEmailsModalComponent 
            v-show="isVisibleSendEmailsModal"
            @close-modal="handleCloseSendEmailsModal"
            @emails-sent="handleEmailsSent"
            :subject="this.subject"
            :recipients="recipients"
            :emailContent="this.previewTemplate"
            :website="website"
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
                recipients: [],
                subject: ''
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
            handleUpdateHtmlTemplate: function (template) {
                this.previewTemplate = template.body;
                this.subject = template.subject;
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
                // Correo individual
                if (typeof list === "string") {
                    
                    const addedEmails = [];

                    // Iteramos sobre los leads para agregar correos electrónicos con nombre
                    this.leads.forEach((lead) => {
                        if (lead.email === list && !addedEmails.includes(lead.email) && lead.subscribed == true) {
                            if (lead.name) {
                                this.recipients.push({ 
                                    address: list, 
                                    sentStatus: '', 
                                    name: lead.name, 
                                    suscription_token: 
                                    lead.suscription_token 
                                });
                                addedEmails.push(lead.email);  // Actualizamos el array de correos añadidos
                            }
                        }
                    });

                    // Verificamos fuera del bucle si aún no se ha añadido el correo electrónico MOVER AL AL SIGUIENTE IF CUANDO ES UNA COLECCION DE CORREOS
                    if (!addedEmails.includes(list)) {
                        this.recipients.push({ 
                            address: list, 
                            sentStatus: '', 
                            name: 'Hola' 
                        });
                        addedEmails.push(list);  // Actualizamos el array de correos añadidos
                    }
                // VARIOS DESTINATARIOS   
                } else if (Array.isArray(list)) {
                    const includeTodos = list.includes("todos");
                    this.leads.forEach((item) => {
                        if (includeTodos && item.subscribed == true && item.email != '' || list.includes(item.status) && item.subscribed == true && item.email != '') {
                            this.recipients.push({ 
                                address: item.email, 
                                sentStatus: '', 
                                name: item.name, 
                                suscription_token: 
                                item.suscription_token 
                            });
                        }
                    });
                }
                this.isVisibleSendEmailsModal = true;
            },
            handleCloseSendEmailsModal: function () {
                this.isVisibleSendEmailsModal = false;
            },
            handleImageUploaded: function (notification) {
                this.$emit('image-uploaded', notification);
            },
            handleShowClientSettings: function () {
                if(!this.isVisibleClientSettings){
                    this.isVisibleClientSettings = true;
                }else{
                    this.isVisibleClientSettings = false;
                }
            },
            handleEmailAdded: function (notification) {
                this.$emit('email-added', notification);
            },
            handleImageDeleted: function (notification) {
                this.$emit('image-deleted', notification);
            },
            handleEmailsSent: function (qty) {
                this.$emit('emails-sent', qty);
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