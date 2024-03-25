<template>
    <div class="note-container">
        <div class="note-header">
            <input type="text" placeholder="Título">
        </div>
        <div class="note-body">
            <textarea placeholder="Escribe algo interesante"></textarea>
        </div>
        <div class="note-footer">
            <button class="btn-primary">guardar</button>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'NewNoteComponent'
    }
</script>
<style>
    
</style>