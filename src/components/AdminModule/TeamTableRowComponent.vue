<template>

    <tr>
        <td></td>
        <td></td>
    </tr>

</template>
<script>
export default {
    name: 'TeamTableRowComponent'
}

</script>
<style>
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

tbody tr:last-child{
    border-bottom: none;
}
</style>