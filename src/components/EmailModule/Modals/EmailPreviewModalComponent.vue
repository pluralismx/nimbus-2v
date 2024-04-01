<template>
    
    <div class="modal-screen">
        <div class="template-container">

            <div class="template-container-header">
                <span>Vista previa</span>
                <span class="close-cross" @click="closeEmailPreview">&times;</span>
            </div>
            <div class="template-container-body">
                <iframe :src="'data:text/html;base64,'+previewTemplate" charset="UTF-8" sandbox></iframe>
            </div>
        </div>
    </div>

</template>

<script>


export default {
    name: 'EmailPreviewModalComponent',
    components: {

    },
    props: {
        previewTemplate: {
            type: String,
            required: true
        }
    },
    methods: {
        closeEmailPreview() {
            this.$emit('close-email-preview');
        }
    },

}
</script>

<style scoped>
    iframe {
        width: 100%;
        height: 100%;
        border: 1px solid var(--basic);
        border-radius: 4px;

    }

    .template-container {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        background-color: var(--shadows);
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        min-height: 0;
    }

    .template-container-header {
        background-color: var(--primary);
        padding: .5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: var(--basic);
    }

    .template-container-body {
        width: 100%;
        padding: 1rem;
        box-sizing: border-box;
        flex-grow: 1;
    }

</style>