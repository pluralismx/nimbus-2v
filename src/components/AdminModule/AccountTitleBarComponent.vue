<template>
    <div class="div-main">
        <h1>Mi cuenta</h1>
        <div class="div-options">
            <span @click="toggleDashboard('subscribe')">contratar | </span>
            <span @click="toggleDashboard('upgrades')">mejoras | </span>
            <span @click="toggleDashboard('payments')">pagos</span>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'AdminPanelTitleBarComponent',
        props: {
            hasNotifications: {
                type: Boolean,
                required: true
            }
        },
        methods: {
            toggleDashboard: function (component) {
                this.$emit('toggle-components', component);
            }
        }
    }
</script>
<style scoped>

    /* Mobile first */

    .div-main {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: .5rem;
        border-bottom: 1px solid var(--shadows);
        color: var(--shadows);
        margin-bottom: 1.5rem;
        width: 100%;
    }

    /* .div-options {
        display: flex;
        align-items: center;
        justify-content: space-between;
    } */

    /* span {
        margin-right: 2rem;
    }

    span:nth-last-child(1) {
        margin: 0;
    } */

    span:hover {
        cursor:pointer;
    }

</style>