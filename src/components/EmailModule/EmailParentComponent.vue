<template>
    <section>
        <EmailTitleBarComponent 
            @email-preview="handleEmailPreview"
        />

        <!-- Mobile -->
        <WizardComponent v-if="smViewport"/>

        <!-- Desktop -->
        <WizardDesktopComponent v-else/>

        <!-- Modals -->
        <EmailPreviewModalComponent 
            v-show="isVisibleEmailPreviewModal"
        />

        <ImageUploadModalComponent 
            v-show="isVisibleImageUploadModal"
        />

    </section>
</template>
<script>
    import EmailTitleBarComponent from './EmailTitleBarComponent.vue';
    import WizardComponent from './WizardComponent.vue';
    import WizardDesktopComponent from './WizardDesktopComponent.vue';
    import EmailPreviewModalComponent from './EmailPreviewModalComponent.vue';
    import ImageUploadModalComponent from './ImageUploadModalComponent.vue';

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
                isVisibleImageUploadModal: false
            }
        },
        methods: {
            handleEmailPreview(){
                this.isVisibleEmailPreviewModal = true;
            },
            handleUploadImage(){
                this.isVisibleImageUploadModal = true;
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