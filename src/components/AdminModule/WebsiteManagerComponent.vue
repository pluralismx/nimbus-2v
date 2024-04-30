<template>
    <table>
        <thead>
            <tr>
                <th>Sitio</th>
                <th>URL</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Pluralis</td>
                <td>http://www.pluralis.com.mx</td>
            </tr>
            <tr>
                <td>Dental house</td>
                <td>http://www.dentalhouse.com.mx</td>
            </tr>
            <tr>
                <td>Picopen</td>
                <td>http://www.picopen.com.mx</td>
            </tr>
        </tbody>
    </table>
</template>
<script></script>
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