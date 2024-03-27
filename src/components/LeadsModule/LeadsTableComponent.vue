<template>
    <table>
        <thead>
            <tr class="table-tools">
                <td class="table-search" colspan="2">
                    <label for="">Buscar:&nbsp;</label>
                    <input type="text">&nbsp;
                    <button class="btn-warning">Buscar</button>
                </td>
                <td class="table-pagination" colspan="4">
                    <label for="rows_per_page">filas por página: </label>
                    <select class="select-rows">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                    </select>
                    <button class="btn-warning">&lt;</button>
                    <span>&nbsp;1</span><span>&nbsp;/&nbsp;</span><span>10&nbsp;</span>
                    <button class="btn-warning">&gt;</button>
                </td>
            </tr>
            <tr>
                <th width="18%"><span>Nombre</span></th>
                <th width="18%"><span>Telefono</span></th>
                <th width="18%"><span>Correo</span></th>
                <th width="18%"><span>Status</span></th>
                <th width="18%"><span>Fecha</span></th>
                <th width="18%">Acciones</th>
            </tr>
        </thead>
        <tbody>
            <LeadRowComponent />
            <LeadRowComponent />
            <LeadRowComponent />
            <LeadRowComponent />
            <LeadRowComponent />
            <LeadRowComponent />
            <LeadRowComponent />
            <LeadRowComponent />
            <LeadRowComponent />
            <LeadRowComponent />
        </tbody>
    </table>
</template>
<script>
    import LeadRowComponent from './LeadRowComponent.vue';
    export default {
        name: 'LeadsTableComponent',
        components: {
            LeadRowComponent
        }
    }
</script>
<style scoped>

    section {
        background-color: var(--basic);
        padding: 2rem;
        box-sizing: border-box;
        height: 100%;
        overflow-y: scroll;
    }

    .title-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .title-bar h1 {
        margin: 0px;
    }

    .title-bar span:hover {
        cursor: pointer;
        font-weight: bold;
    }


    table{
        width: 100%;
        border-collapse: collapse;
        box-shadow: 2px 2px 3px #222;
    }

    thead{
        background-color: var(--primary);
        color: var(--basic);
    }

    thead tr th {
        padding: .5rem;
        width: 10%;
        height: 2rem;
    }

    thead tr th span{
        color: var(--basic);
        transition: all 300ms;
    }

    thead tr th span:hover{
        cursor: pointer;
    }

    tbody tr:nth-child(odd) {
        background-color: var(--accent);
        color: var(--warning);
    }

    .table-tools {
        background-color: var(--primary);
        color: var(--basic);
        border-bottom: 1px solid var(--shadows);
    }

    .table-tools td {
        padding: .5rem;
    }

    .table-search {
        text-align: left;
    }

    .table-search input{
        width: 15rem;
    }

    .table-pagination {
        text-align: right;
    }

    .select-rows {
        width: 4rem;
        margin-right: 1rem;
        padding: 5px;
    }

    input {
        padding: 5px;
        width: 75%;
        border-radius: 4px;
        border:none;
    }

    input:focus{
        outline: none;
    }
</style>