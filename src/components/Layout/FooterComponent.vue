<template>
    <footer>
        <span>I'm the footer parent</span>
    </footer>
</template>
<script>
    export default {
        name: 'FooterParentComponent'
    }
</script>
<style scoped>
    footer {
        background-color: var(--shadows);
        height: 100%;
        width: 100%;
        z-index: 85;
        padding: 0 1rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        color: var(--basic);
    }
</style>