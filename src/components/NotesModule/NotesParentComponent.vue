<template>
    <aside>
        <div class="title-bar-container">
            <NotesTitleBarComponent 
                @toggle-NewNote="handleNewNote"
            />
        </div>

        <div class="notes-container" :class="{'showNewNote': isVisibleNewNote == 'show' }">
            <NewNoteComponent 
                :websiteId="website"
                :identity="identity"
                @note-created="handleNoteCreated"
            />
            <NoteComponent 
                v-for="note in notesData" :key="note.id" :note="note"
                @delete-note="handleDeleteNote"
                @edit-note="handleEditNote"
                @note-copied="handleNoteCopied"
            />
        </div>

    </aside>
</template>
<script>
    import NotesTitleBarComponent from './NotesTitleBarComponent.vue';
    import NewNoteComponent from './NewNoteComponent.vue';
    import NoteComponent from './NoteComponent.vue';
import axios from '@/lib/axios';

    export default {
        name: 'NotesParentComponent',
        components: {
            NotesTitleBarComponent,
            NewNoteComponent,
            NoteComponent
        },
        props: {
            notes: {
                type: Array,
                required: true
            },
            website: {
                type: Number,
                required: true
            },
            identity: {
                type: Object,
                required: true
            }
        },
        computed: {
            notesComputed(){
                return this.notes;
            }
        },
        watch: {
            notesComputed: {
                handler(newVal){
                    this.notesData = newVal;
                },
                immediate: true,
                deep: true
            }
        },
        data() {
            return {
                isVisibleNewNote: '',
                notesData: []
            }
        },
        methods: {
            handleNewNote(){
                if (!this.isVisibleNewNote){
                    this.isVisibleNewNote = 'show';
                } else if(this.isVisibleNewNote == 'show'){
                    this.isVisibleNewNote = 'hide';
                } else {
                    this.isVisibleNewNote = 'show';
                }
            },
            handleDeleteNote: async function (noteId) { 
                const json = {
                    'note_id': noteId
                }

                let formData = new FormData();
                formData.append('json', JSON.stringify(json));

                const response = await axios.post('api/note/delete', formData, {'withCredentials':true});

                if(response.data.status==='success'){
                    this.notesData.forEach((item, index)=>{
                        if(item.id == noteId){
                            this.notesData.splice(index, 1);
                        }
                    });
                    this.$emit('note-deleted', {"text":"Nota eliminada", "status":"success"});
                }else {
                    this.$emit('note-deleted', {"text":"No se pudo eliminar la nota", "status":"error"});
                }
            },
            handleNoteCreated: function (notification) {
                this.$emit('note-created', notification);
            },
            handleEditNote: async function (note) {
                const json = {
                    'title': note.title,
                    'content': note.content
                }

                let formData = new FormData();
                formData.append('json', JSON.stringify(json));
                formData.append("_method", "put");
                const response = await axios.post('api/note/update/'+note.id, formData, {'withCredentials':true});

                if(response.data.status=='success'){
                    this.notesData.forEach((item, index)=>{
                        if(item.id == note.id){
                            this.notesData[index] = note;
                        }
                    });
                    this.$emit('note-updated', {"text":"Nota actualizada", "status":"success"});
                }else {
                    this.$emit('note-updated', {"text":"No se pudo actualizar la nota", "status":"error"});
                }
            },
            handleNoteCopied: function (notification) {
                this.$emit('note-copied', notification);
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
        transition: all 300ms;
    }

    .showNewNote {
        transform: translateY(0%);
        transition: all 300ms;
    }

    .hideNewNote {
        animation: hideNewNote 300ms forwards;
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