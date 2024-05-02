<template>
    <table>
        <thead>
            <tr>
                <th>Integrante</th>
                <th>Equipo</th>
            </tr>
        </thead>
        <tbody>
            <TeamTableRowComponent 
                v-for="contact in contacts" :key="contact.id" :contact="contact"
            />
        </tbody>
    </table>
</template>
<script>
import TeamTableRowComponent from './TeamTableRowComponent'
export default {
    name: 'TeamTableComponent',
    components: {
        TeamTableRowComponent
    },
    props: {
        contacts: {
            type: Array,
            required: true
        }
    }
}
</script>
<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
    margin: 1rem 0;
}

thead {
    color: var(--primary);
    border-bottom: 1px solid var(--shadows);
}

thead tr th {
    text-align: left;
    padding: .5rem;
    width: 50%;
}



</style>