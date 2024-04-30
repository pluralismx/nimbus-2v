<template>
    <table>
        <thead>
            <tr>
                <th>Integrante</th>
                <th>Equipo</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Omar Lopez</td>
                <td>Pluralis</td>
            </tr>
            <tr>
                <td>Isai Nava</td>
                <td>Pluralis</td>
            </tr>
            <tr>
                <td>Cesar Ornelas</td>
                <td>Pluralis</td>
            </tr>
            <tr>
                <td>Pablo Villalpando</td>
                <td>Dental house</td>
            </tr>
        </tbody>
    </table>
</template>
<script>
export default {
    name: 'TeamTableComponent',
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