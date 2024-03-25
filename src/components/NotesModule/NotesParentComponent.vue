<template>
    <aside>

        <div class="header-container">
            <h1>Prospectos</h1>
            <span>crear</span>
        </div>

    </aside>
</template>
<script>
    export default {
        name: 'NotesParentComponent',
    }
</script>
<style scoped>

    aside {
        background-color: var(--primary);
        height: 100%;
        width: 100%;
        z-index: 85;
        padding: 1rem;
        overflow-y: scroll;
        box-sizing: border-box;
    }

    h1 {
        margin: 0;
    }

    .header-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: var(--basic);
        padding-bottom: .5rem;
        border-bottom: 1px solid var(--basic);
    }

</style>