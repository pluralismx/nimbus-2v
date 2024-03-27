<template>
    <div>
        <h1>Notes</h1>
        <span @click="toggleNewNote">add</span>
    </div>
</template>
<script>
    export default {
        name: 'NotesTitleBarComponent',
        methods: {
            toggleNewNote() {
                this.$emit('toggle-NewNote');
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
        border-bottom: 1px solid var(--basic);
        color: var(--basic);
        margin-bottom: 1.5rem;
        width: 100%;
    }

</style>
