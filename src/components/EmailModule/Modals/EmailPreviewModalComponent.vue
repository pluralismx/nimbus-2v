<template>
    
    <div class="modal-screen">
        <div class="template-container">

            <div class="template-container-header">
                <span>Vista previa</span>
                <span class="close-cross" @click="closeEmailPreview">&times;</span>
            </div>
            <div class="template-container-body">
                <div class="preview-container" v-html="this.htmlTemplate" charset="UTF-8" sandbox></div>
            </div>
        </div>
    </div>

</template>

<script>


export default {
    name: 'EmailPreviewModalComponent',
    props: {
        previewTemplate: {
            type: String,
            required: true
        }
    },
    computed: {
        htmlTemplate() {
            let b64 = this.previewTemplate;
            let html;
            
            // Check if previewTemplate is base64 encoded
            try {
                // Try to decode base64
                html = atob(b64);
                
                // If successful, check if it's valid HTML
                let parser = new DOMParser();
                let doc = parser.parseFromString(html, 'text/html');
                
                // If parsing succeeds, it's valid HTML
                if (doc.documentElement.nodeName === 'HTML') {
                    return html;
                } else {
                    // If parsing fails, it's not valid HTML
                    throw new Error('Not valid HTML');
                }
            } catch (error) {
                // If decoding or parsing fails, treat it as plain text
                html = b64;
            }
            
            return html;
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