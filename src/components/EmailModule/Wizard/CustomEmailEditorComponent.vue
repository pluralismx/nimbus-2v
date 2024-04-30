<template>
    <div class="settings-container">
        <!-- Title -->
        <div class="settings-header">
            <span>Editor de texto plano e hipertexto</span>
        </div>
        <div class="settings-body">
            <textarea v-model="custom_template"></textarea>
        </div>

    </div>
</template>
<script>
    export default {
        name: 'CustomEmailEditorComponent',
        props: {
            isSelected: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                custom_template: null
            }
        },
        watch: {
            custom_template: {
                handler(){
                    if(this.isSelected === 'custom'){
                        this.html();
                    }
                },
                immediate: true,
                deep: true
            }   
        },
        methods: {
            html(){
                this.$emit('update-html-template', this.custom_template);
            }
        }
    }
</script>
<style scoped>

    .settings-container {
        margin-top: 2rem;
        box-shadow: 2px 2px 6px var(--shadows);
        border-radius: .5rem;
    }

    .settings-header {
        background-color: var(--primary);
        color: var(--basic);
        padding: .5rem;
        border-top-left-radius: .5rem;
        border-top-right-radius: .5rem;
    }
    .settings-body {
        display: flex;
        flex-direction: column;
        padding: 0 1rem;
    }

    textarea {
        margin: 1rem 0;
        height: 17.5rem;
        border: 1px solid var(--primary);
        resize: none;
        color: var(--primary);
        border-radius: .5rem;
        padding: .5rem;
        box-sizing: border-box;
    }

    textarea:focus {
        outline:none;
    }

</style>