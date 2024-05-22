<template>
    <div class="wizard-toolbar">
        <ul>
            <li @click="showSettings">Plantilla</li>
            <li @click="showRecipients">Destinatarios</li>
            <li @click="activateDesktopPreview">PC</li>
            <li @click="activateMobilePreview">Móvil</li>
            <li>Configuración</li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: 'WizardToolbarComponent',
        methods: {
            showSettings() {
                this.$emit('show-template-settings');
            },
            showRecipients() {
                this.$emit('show-recipients-settings');
            },
            activateDesktopPreview() {
                this.$emit('activate-desktop-preview');
            },
            activateMobilePreview() {
                this.$emit('activate-mobile-preview');
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