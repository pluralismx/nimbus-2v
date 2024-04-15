<template>
    <div class="preview-wrapper">
        <div class="preview-container" :class="{ 'mobile-preview': mobilePreview }" v-html="this.htmlTemplate">

        </div>
    </div>
</template>
<script>

    export default {
        name: 'WizardPreviewComponent',
        props: {
            desktopPreview: {
                type: Boolean,
                required: true
            },
            mobilePreview: {
                type: Boolean,
                required: true
            },
            previewTemplate: {
                type: String,
                required: true
            }
        },
        computed: {
            htmlTemplate(){
                let b64 = this.previewTemplate;
                let html = atob(b64);
                return html;
            }
        }
    }
</script>
<style>
    .preview-wrapper {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 1rem;
        display: flex;
        justify-content: center;
        background-color: #333;
    }
    .preview-container {
        box-sizing: border-box;
        background-color: var(--basic);
        width: 100%;
        height: 100%;
        border-radius: .5rem;
        transition: all 300ms;
        overflow: auto; /* or overflow-y: auto; or overflow-x: auto; depending on your needs */
        scrollbar-width: none; /* Hide the scrollbar for Firefox */
        -ms-overflow-style: none; /* Hide the scrollbar for IE and Edge */
        container-type: size;
    }

    .preview-container::-webkit-scrollbar {
    display: none; /* Hide the scrollbar for WebKit browsers (Chrome, Safari) */
}

    .mobile-preview {
        width: 300px;
    }
</style>