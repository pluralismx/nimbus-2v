<template>
    <aside class="wizard-aside">
        <TemplateSelectionComponent 
            @toggle-template="handleToggleTemplate"
        />

        <!-- Newsletter -->
        <NewsLetterSettingsComponent 
            v-show="template == 'newsletter' && !recipientsSettings && templateSettings"
            @open-image-modal="handleOpenImageModal"
        />

        <!-- Promotional -->
        <PromotionalSettingsComponent 
            v-show="template == 'promotional' && !recipientsSettings && templateSettings"
            @open-image-modal="handleOpenImageModal"
        />

        <!-- Recipients -->
        <RecipientsSettingsComponent 
            v-show="recipientsSettings && !templateSettings"
        />

        <!-- Modals -->
        <ImageUploadModalComponent 
            v-show="isVisibleUploadImageModal"
            @close-image-modal="handleCloseImageModal"
        />



    </aside>
</template>
<script>
    import TemplateSelectionComponent from './TemplateSelectionComponent.vue';
    import NewsLetterSettingsComponent from './NewsLetterSettingsComponent.vue';
    import PromotionalSettingsComponent from './PromotionalSettingsComponent.vue';
    import ImageUploadModalComponent from '../Modals/ImageUploadModalComponent.vue';
    import RecipientsSettingsComponent from './RecipientsSettingsComponent.vue';

    export default {
        name: 'WizardAsideComponent',
        components: {
            TemplateSelectionComponent,
            NewsLetterSettingsComponent,
            PromotionalSettingsComponent,
            ImageUploadModalComponent,
            RecipientsSettingsComponent
        },
        props: {
            recipientsSettings: {
                type: Boolean,
                required: true
            },
            templateSettings: {
                type: Boolean,
                required: true
            }
        },
        data() {
            return {
                template: null,
                recipients: false,
                isVisibleUploadImageModal: false
            }
        },
        methods: {
            handleToggleTemplate(template){
                this.template = template;
            },
            handleOpenImageModal(){
                this.isVisibleUploadImageModal = true;
            },
            handleCloseImageModal() {
                this.isVisibleUploadImageModal = false;
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