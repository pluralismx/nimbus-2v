<template>
    <aside>
        <NotesTitleBarComponent />
        <NewNoteComponent />
        <NoteComponent />
        <NoteComponent />
        <NoteComponent />
    </aside>
</template>
<script>
    import NotesTitleBarComponent from './NotesTitleBarComponent.vue';
    import NewNoteComponent from './NewNoteComponent.vue';
    import NoteComponent from './NoteComponent.vue';

    export default {
        name: 'NotesParentComponent',
        components: {
            NotesTitleBarComponent,
            NewNoteComponent,
            NoteComponent
        }
    }
</script>
<style scoped>
    
    /* Mobile first */

    aside {
        background-color: var(--primary);
        grid-column: 1/2;
        grid-row: 2/3;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-y: scroll;
    }

    /* Desktop */

    @media only screen and (min-width: 1024px) {
        aside {
            grid-column: 1/2;
            grid-row: 2/3;
        }
    }


</style>