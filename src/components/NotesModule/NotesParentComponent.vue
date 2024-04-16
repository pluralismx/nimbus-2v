<template>
    <aside>
        <div class="title-bar-container">
            <NotesTitleBarComponent 
                @toggle-NewNote="handleNewNote"
            />
        </div>

        <div class="notes-container" :class="{'showNewNote': isVisibleNewNote, 'hideNewNote': isVisibleNewNote == false }">
            <NewNoteComponent />
            <NoteComponent />
            <NoteComponent />
            <NoteComponent />
        </div>

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
        },
        data() {
            return {
                isVisibleNewNote: null
            }
        },
        methods: {
            handleNewNote(){
                if (!this.isVisibleNewNote){
                    this.isVisibleNewNote = true;
                } else if(this.isVisibleNewNote == true){
                    this.isVisibleNewNote = false;
                } else {
                    this.isVisibleNewNote = true;
                }
            }
        }
    }
</script>
<style scoped>
    
    /* Mobile first */

    aside {
        background-color: var(--primary);
        grid-column: 1/2;
        grid-row: 2/3;
        overflow-y: scroll;
    }

    .title-bar-container {
        padding-top: 1rem;
        padding-left: 1rem;
        padding-bottom: 0;
        padding-right: 1rem;
        background-color: var(--primary);
        position: relative;
        z-index: 90;
    }

    .notes-container {
        padding-top: 1.5rem;
        padding-left: 2rem;
        padding-bottom: 2rem;
        padding-right: 2rem;
        transform: translateY(calc(-45vh - 2rem));
    }


    @keyframes slideIn {
        from {
            transform: translateY(calc(-45vh - 2rem));
        }
        to {
            transform: translateY(0%);
        }
    }
    @keyframes slideOut {
        from {
            transform: translateY(0%);
        }
        to {
            transform: translateY(calc(-45vh - 2rem));
        }
    }

    .showNewNote {
        animation: slideIn 300ms forwards;
    }

    .hideNewNote {
        animation: slideOut 300ms forwards;
    }


    /* Desktop */

    @media only screen and (min-width: 1024px) {

        aside {
            grid-column: 1/2;
            grid-row: 2/3;
        }

        .title-bar-container {
            padding-top: 1rem;
            padding-left: 1rem;
            padding-bottom: 0;
            padding-right: 1rem;
            background-color: var(--primary);
            position: relative;
            z-index: 90;
        }

        .notes-container {
            padding-top: 1.5rem;
            padding-left: 2rem;
            padding-bottom: 2rem;
            padding-right: 2rem;
        }
    }


</style>