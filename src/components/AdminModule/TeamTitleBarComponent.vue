<template>
    <div>
        <h1>Mi equipo</h1>
        <span @click="addTeammateModal">invitar</span>
    </div>
</template>
<script>
    export default {
        name: 'TeamTitleBarComponent',
        methods: {
            addTeammateModal() {
                this.$emit("toggle-add-teammate-modal");
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