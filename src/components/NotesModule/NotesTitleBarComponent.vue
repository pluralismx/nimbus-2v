<template>
    <div>
        <h1>Memos</h1>
        <span @click="toggleNewNote">crear</span>
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
        background-color: var(--primary);
        box-sizing: border-box
    }

    span:hover {
        cursor: pointer;
        color: var(--accent);
    }

</style>
