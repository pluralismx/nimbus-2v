<template>
    <div>
        <h1>Mi cuenta</h1>
        <span v-show="!hasNotifications" @click="showNotificationModal()">&#128235;</span>
        <span v-show="hasNotifications" @click="showNotificationModal()">&#128236;</span>
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
            showNotificationModal() {
                this.$emit('show-notification-modal');
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

    span {
        font-size: 1.5rem;
    }

    span:hover {
        cursor:pointer;
    }

</style>