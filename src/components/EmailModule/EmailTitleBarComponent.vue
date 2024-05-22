<template>
    <div class="bar">
        <h1>Email</h1>
        <div class="controls" v-if="smViewport">
            <span @click="emailPreview">previsualizar | </span>
            <span v-show="recipientsSpan" @click="recipientsSettings">destinatarios | </span>
            <span v-show="!recipientsSpan" @click="recipientsSettings">personalizar | </span>
            <span @click="showClientSettings()">configurar</span>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'EmailTitleBarComponent',
        props: {
            smViewport: {
                type: Boolean,
                required: true
            }
        },
        data() {
            return {
                recipientsSpan: true
            }
        },
        methods: {
            emailPreview: function (){
                this.$emit('email-preview');
            },
            recipientsSettings: function () {
                if(this.recipientsSpan){
                    this.recipientsSpan = false;
                    this.$emit('show-recipient-settings');
                }else {
                    this.recipientsSpan = true;
                    this.$emit('show-recipient-settings');
                }
            },
            showClientSettings: function () {
                console.log('client settings...');
            }
        }
    }
</script>
<style scoped>

    /* Mobile first */

    .bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: .5rem;
        border-bottom: 1px solid var(--shadows);
        color: var(--shadows);
        margin-bottom: 1.5rem;
        width: 100%;
    }

</style>