<template>
    <article class="note-container">
        <div class="note-header">
            <input type="text" v-model="title">
        </div>
        <div class="note-body">
            <textarea name="cuerpo de la nota" placeholder="Escribe algo interesante" v-model="content"></textarea>
        </div>
        <div class="note-footer">
            <button class="btn-warning" @click="deleteNote()">eliminar</button>
            <button class="btn-primary" @click="editNote()">editar</button>
            <button class="btn-primary" @click="copyNote()">copiar</button>
        </div>
    </article>
</template>
<script>
    export default {
        name: 'NoteComponent',
        props: {
            note: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                title: this.note.title,
                content: this.note.content
            }
        },
        methods: {
            deleteNote: function () {
                this.$emit('delete-note', this.note.id);
            },
            editNote: function () {
                const note = {
                    'id': this.note.id,
                    'title': this.title,
                    'content': this.content
                }
                this.$emit('edit-note', note);
            },
            copyNote: function () {
                let copiedText = this.content;
                navigator.clipboard.writeText(copiedText)
                    .then(() => {
                        this.$emit('note-copied', {"text":"Texto copiado", "status":"success"});
                    })
                    .catch(() => {
                        this.$emit('note-copied', {"text":"Error al copiar la nota", "status":"error"});
                    });
            }
        }
    }
</script>
<style scoped>

    .note-container {
        background-color: var(--shadows);
        border-radius: .5rem;
        box-shadow: 2px 2px 3px rgba(0,0,0,0.7);
        box-sizing: border-box;
        height: 45vh;
        width: 100%;
        margin-bottom: 2rem;
        transition: transform 300ms;
    }

    .note-container:hover textarea {
        color: var(--accent);
    }

    .note-header {
        height: 15%;
        background-color: var(--accent);
        border-top-left-radius: .5rem;
        border-top-right-radius: .5rem;
    }

    .note-header input{
        background-color: transparent;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 1rem;
        border: none;
        color: var(--shadows);
        font-size: 16px;
    }

    .note-header input:focus{
        outline: none;
    }

    .note-body {
        height: 70%;
        background-color: transparent;
        border-bottom: 1px solid var(--accent);
    }

    .note-body textarea {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 1rem;
        background-color: transparent;
        border: none;
        font-family: 'regular';
        color: var(--warn);
        resize: none;
        line-height: 1.5;
    }

    .note-body textarea:focus{
        outline: none;
    }

    .note-footer {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        height: 15%;
        background-color: transparent;
        border: none;
        padding: 0 .5rem;
    }

    button {
        width: 30%;
    }
    
</style>