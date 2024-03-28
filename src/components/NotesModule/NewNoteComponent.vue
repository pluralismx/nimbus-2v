<template>
    <article class="note-container">
        <div class="note-header">
            <input type="text" placeholder="Título">
        </div>
        <div class="note-body">
            <textarea placeholder="Escribe algo interesante"></textarea>
        </div>
        <div class="note-footer">
            <button class="btn-primary">guardar</button>
        </div>
    </article>
</template>
<script>
    export default {
        name: 'NotesTitleBarComponent'
    }
</script>
<style scoped>

    /* Mobile first */

    .note-container {
        background-color: var(--basic);
        border-radius: .5rem;
        box-shadow: 2px 2px 3px var(--shadows);
        box-sizing: border-box;
        width: 90%;
        min-height: 50%;
        margin-bottom: 2rem;
    }

    .note-header {
        height: 15%;
        border-bottom: 1px solid var(--primary);
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
        border-bottom: 1px solid var(--primary);
    }

    .note-body textarea {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 1rem;
        background-color: transparent;
        border: none;
        font-family: 'regular';
        color: var(--shadows);
        resize: none;
    }

    .note-body textarea:focus{
        outline: none;
    }

    .note-footer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 15%;
        background-color: transparent;
        border: none;
    }

</style>
