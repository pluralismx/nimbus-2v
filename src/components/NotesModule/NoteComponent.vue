<template>
    <article class="note-container">
        <div class="note-header">
            <input type="text">
        </div>
        <div class="note-body">
            <textarea name="cuerpo de la nota" placeholder="Escribe algo interesante" v-model="content"></textarea>
        </div>
        <div class="note-footer">
            <button class="btn-warning">eliminar</button>
            <button class="btn-primary">editar</button>
            <button class="btn-primary">copiar</button>
        </div>
    </article>
</template>
<script>
    export default {
        name: 'NoteComponent'
    }
</script>
<style scoped>

    .note-container {
        background-color: var(--shadows);
        border-radius: .5rem;
        box-shadow: 2px 2px 3px black;
        box-sizing: border-box;
        height: 50%;
        width: 90%;
        min-height: 50%;
        margin-bottom: 2rem;
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
        color: var(--accent);
        resize: none;
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