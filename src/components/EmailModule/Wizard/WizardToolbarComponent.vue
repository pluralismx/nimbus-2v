<template>
    <div class="wizard-toolbar">
        <ul>
            <li @click="showSettings">Plantilla</li>
            <li @click="showRecipients">Destinatarios</li>
            <li>PC</li>
            <li>Móvil</li>
            <li>Configuración</li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: 'WizardToolbarComponent',
        methods: {
            showSettings(){
                console.log('settings');
                this.$emit('show-template-settings');
            },
            showRecipients(){
                console.log('recipients');
                this.$emit('show-recipients-settings');
            }
        }
    }
</script>
<style scoped>

    .wizard-toolbar {
        grid-column: 1/3;
        grid-row: 1/2;
        background-color: var(--primary);
        border-top-left-radius: .5rem;
        border-top-right-radius: .5rem;
        display: flex;
        align-items: center;
        padding: 0 1rem;
    }

    ul {
        display: flex;
        align-content: center;
        justify-content: space-between;
        width: 100%;
        color: var(--basic);
    }

    ul li:hover {
        color: var(--accent);
        cursor: pointer;
    }
</style>