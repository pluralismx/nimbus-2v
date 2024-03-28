<template>
    
    <div class="modal-screen">
        <div class="template-container">

            <div class="template-container-header">
                <span>Vista previa</span>
                <span class="close-cross" @click="closeEmailPreview">&times;</span>
            </div>
            <div class="template-container-body">
                <iframe>

                </iframe>
            </div>
            <div class="template-container-footer">

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
    computed: {
        setPreviewTemplate(){
            return this.previewTemplate;
        }
    },
    watch: {
        setPreviewTemplate: {
            handler(newVal){
                console.log(newVal);
                this.template = newVal;
            }
        }
    },
    data() {
        return {
            template: null
        }
    },
    methods: {
        closeEmailPreview() {
            this.$emit('close-email-preview');
        }
    }

}
</script>

<style scoped>

    .template-container {
        width: 100%;
        height: 100%;
        background-color: var(--shadows);
        box-sizing: border-box;
    }

    .template-container-header {
        background-color: var(--primary);
        padding: .5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

</style>