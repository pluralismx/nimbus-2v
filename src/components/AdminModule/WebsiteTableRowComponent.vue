<template>
    <tr>
        <td>{{ website.name }}</td>
        <td>{{ website.url }}</td>
    </tr>
</template>
<script>
export default {
    name: "WebsiteTableRowComponent",
    props: {
        website: {
            type: Object,
            required: true
        }
    },
}
</script>
<style scoped>
tbody tr td {
    text-align: left;
    padding: .5rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

tbody tr {
    border-bottom: 1px solid var(--shadows);
}

tbody tr:last-child {
    border-bottom: none;
}
</style>