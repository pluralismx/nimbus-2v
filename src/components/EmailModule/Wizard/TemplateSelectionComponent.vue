<template>
    <div class="settings-container">
        <div class="settings-header">
            <span>Seleccione un templete</span>
        </div>
        <div class="settings-body">
            <div class="select-block">
                <label>Plantilla</label>
                <select @change="toggleTemplate($event.target.value)">
                    <option value="promotional">promotional</option>
                    <option value="newsletter">news letter</option>
                </select>
            </div>
            <div class="select-block">
                <label>Tema</label>
                <select>
                    <option>Jadeite</option>
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
            }
        }
    }
</script>
<style scoped>

    .settings-container {
        margin-top: 0;
        grid-row: 1/2;
        grid-column: 1/2;
        box-shadow: 2px 2px 6px var(--shadows);
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
    }
</style>