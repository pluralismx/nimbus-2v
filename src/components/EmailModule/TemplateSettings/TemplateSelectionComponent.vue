<template>
    <div class="settings-container">
        <div class="settings-header">
            <span>Seleccione una plantilla</span>
        </div>
        <div class="settings-body">
            <div class="select-block">
                <label>Plantilla</label>
                <select class="drop-down" @change="toggleTemplate($event.target.value)">
                    <option selected disabled>seleccionar...</option>
                    <option value="promotional">Promocional</option>
                    <option value="newsletter">Newsletter</option>
                    <option value="institutional">Institucional</option>
                    <option value="callToAction">Llamada a la acción</option>
                    <option value="invoice">Presupuesto</option>
                    <option value="custom">Personalizado</option>
                </select>
            </div>
            <div class="select-block">
                <label>Tema</label>
                <select @change="toggleTheme($event.target.value)">
                    <option selected disabled>seleccionar...</option>
                    <option v-for="(theme, index) in themes" :key="index" :value="theme.hex">{{ theme.name }}</option>
                </select>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'TemplateSelectionComponent',
        methods: {
            toggleTemplate(template){
                this.$emit('toggle-template', template);
            },
            toggleTheme(theme){
                this.$emit('toggle-theme', theme);
            }
        },
        data() {
            return {
                themes: [
                    {"name": "Goldstone", "hex":"#630006"},
                    {"name": "Jasper", "hex":"#a00f16"},
                    {"name": "Carnelian", "hex":"#ba4a00"},
                    {"name": "Aventurine", "hex":"#e48600"},
                    {"name": "Amethyst", "hex":"#4d1564"},
                    {"name": "Garnet", "hex":"#780132"},
                    {"name": "Dumortierte", "hex":"#12376a"},
                    {"name": "Jadeite", "hex":"#037e99"},
                    {"name": "Jade", "hex":"#25654e"},
                    {"name": "Apatite", "hex":"#003e48"}
                ]
            }
        }
    }
</script>
<style scoped>

.settings-container {
    margin-top: 0;
    grid-row: 1/2;
    grid-column: 1/2;
    box-shadow: 2px 2px 4px rgba(0,0,0,0.6);
    border-radius: .5rem;
}

.settings-header{
    background-color: var(--primary);
    color: var(--basic);
    padding: .5rem;
    border-top-left-radius: .5rem;
    border-top-right-radius: .5rem;
}

.settings-body {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 .5rem;
}

.select-block {
    margin: 1rem 0;
    display: flex;
    flex-direction: column;
    width: 50%;
}

.select-block select {
    margin-top: .5rem;
    width: 90%;
    height: 100%;
}

.menu {
    position: relative;
    display: inline-block;
    margin-top: .5rem;
    width: 90%;
    height: 100%;
}

.menu-button {
    background-color: white;
    color: var(--shadows);
    padding-left: .5rem;
    font-size: 14px;
    border: none;
    cursor: pointer;
    height: 100%;
    display: flex;
    align-items: center;
    border-radius:  .5rem;
}

.dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    width: 95%;
}

.dropdown-item {
    color: black;
    padding: .5rem;
    font-size: 14px;
    text-decoration: none;
    display: block;
    background-color: white;
    width: 95%;
}

.dropdown-item:hover {
    background-color: var(--primary);
    cursor: pointer;
    color: var(--basic);
}

.menu:hover .dropdown-content {
    display: block;
}
</style>