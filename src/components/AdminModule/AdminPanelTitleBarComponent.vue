<template>
    <div>
        <h1>Panel administrativo</h1>
        <!-- <span @click="createWebsiteModal()">crear</span> -->
    </div>
</template>
<script>
    export default {
        name: 'AdminPanelTitleBarComponent',
        methods: {
            createWebsiteModal() {
                this.$emit('toggle-create-website-modal');
            }
        }
    }
</script>
<style scoped>

    /* Mobile first */

    div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: .5rem;
        border-bottom: 1px solid var(--shadows);
        color: var(--shadows);
        margin-bottom: 1.5rem;
        width: 100%;
    }

</style>