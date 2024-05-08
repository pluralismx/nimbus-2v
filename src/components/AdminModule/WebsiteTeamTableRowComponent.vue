<template>
    <tr>
        <td>{{ member.name}} {{ member.surname }}</td>
        <td>{{ member.role }}</td>
        <td>
            <button class="btn-primary compact">eliminar</button>
        </td>
    </tr>
</template>
<script>
export default {
    name: 'WebsiteTeamTableRowComponent',
    props: {
        member: {
            type: Array,
            required: true
        }
    }
}
</script>
<style>

</style>