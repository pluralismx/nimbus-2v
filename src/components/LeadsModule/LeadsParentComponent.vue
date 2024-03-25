<template>
    <section>
        <div class="header-container">
            <h1>Prospectos</h1>
            <span>crear</span>
        </div>
    </section>
</template>
<script>
    export default {
        name: 'LeadsParentComponent'
    }
</script>
<style scoped>

    section {
        background-color: var(--basic);
        height: 100%;
        width: 100%;
        z-index: 85;
        padding: 1rem;
        box-sizing: border-box;
    }

    h1 {
        margin: 0;
    }

    .header-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: var(--shadows);
        padding-bottom: .5rem;
        border-bottom: 1px solid var(--shadows);
    }
</style>