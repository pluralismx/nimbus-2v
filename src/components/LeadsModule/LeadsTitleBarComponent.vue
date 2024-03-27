<template>
    <div>
        <h1>Prospectos</h1>
        <span @click="saveLead">agregar</span>
    </div>
</template>
<script>
    export default {
        name: 'LeadsTitleBarComponent',
        methods: {
            saveLead(){
                this.$emit('save-lead');
            }
        }
    }
</script>
<style scoped>

    /* Mobile first */

    div {
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