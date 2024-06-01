<template>

    <tr>
        <td>{{ friend.name }} {{ friend.surname }}</td>
        <td>{{ friend.email }}</td>
        <td><button class="btn-warning compact" @click="deleteFriend()">eliminar</button></td>
    </tr>

</template>
<script>
export default {
    name: 'FriendListRowComponent',
    props: {
        friend: {
            type: Object,
            required: true
        }
    },
    methods: {
        deleteFriend: function () {
            this.$emit('delete-friend', this.friend.id);
        }
    }
}
</script>
<style scoped>
tbody tr td {
    text-align: left;
    padding: .5rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 14px;
}

tbody tr {
    border-bottom: 1px solid var(--shadows);
}

tbody tr:last-child{
    border-bottom: none;
}

tbody td:last-child{
    text-align: center;
}
</style>