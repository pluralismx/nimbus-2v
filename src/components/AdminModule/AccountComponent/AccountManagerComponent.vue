<template>
    <div class="settings-body">
        <h4>Caracteristicas actuales</h4>
        <table>
            <thead>
                <th>Sitios</th>
                <th>Contactos</th>
                <th>Negocios</th>
                <th>Usuarios</th>
                <th>Correos</th>
                <th>Total</th>
                <th>Sig. pago</th>
            </thead>
            <tbody>
                <td>3</td>
                <td>4500</td>
                <td>3</td>
                <td>3</td>
                <td>6000</td>
                <td>$55</td>
                <td>05/08/24</td>
            </tbody>
        </table>
        <h4>Mejoras</h4>
        <div class="upgrade-card-container">
            <div class="upgrade-card">
                <span>Agregar/quitar 500 contactos</span>
                <br>
                <span>$11.99 USD</span>
            </div>
            <div class="upgrade-card">
                <span>Agregar/quitar negocio</span>
                <br>
                <span>$14.99 USD</span>
            </div>
            <div class="upgrade-card">
                <span>Agregar/quitar usuario</span>
                <br>
                <span>$4.99 USD</span>
            </div>
            <div class="upgrade-card">
                <span>Agregar/quitar sitio</span>
                <br>
                <span>$24.99 USD</span>
            </div>
            <div class="upgrade-card">
                <span>Agregar 500 correos</span>
                <br>
                <span>$9.99 USD</span>
            </div>
        </div>
        <h4>Quitar caracteristicas</h4>
        <div class="upgrade-card-container">
            <button class="btn-warning">Quitar 500 contactos</button>
            <button class="btn-warning">Quitar negocio</button>
            <button class="btn-warning">Quitar usuario</button>
            <button class="btn-warning">Quitar sitio</button>
            <button class="btn-warning">Quitar 500 correos</button>
        </div>
        <h4>Aplicar modificaciones</h4>
        <div class="upgrade-card-container">
            <button class="btn-primary">Subir de nivel</button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'AccountManagerComponent',
    components: {
        
    },
}
</script>
<style scoped>
h4 {
    margin: 1em 0;
}
span {
    font-size: 14px;
}
table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
}
thead {
    width: 100%;
    color: var(--basic);
    background-color: var(--primary);
}

td, th {
    text-align: center;
    padding: 4px;
}

td {
    border-bottom: 1px solid var(--shadows);
}

.upgrade-card-container {
    display: flex;
}

/* Asign teammates */
.settings-body {
    display: flex;
    flex-direction: column;
    padding: 0 1rem;
    padding-bottom: 1rem;
    flex-grow: 1;
    min-height: 0;
    background-color: #d2d8db;
    border-radius: .5rem;
}



@media only screen and (min-width: 1024px) {

    .settings-body {
        display: flex;
        flex-direction: column;
        padding: 0 1rem;
        padding-bottom: 1rem;
    }
    .upgrade-card-container {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem 1rem;
    }
    .upgrade-card {
        padding: 1rem;
        box-sizing: border-box;
        background-color: #d2d8db;
        color: var(--shadows);
        border-radius: .5rem;
        width: calc(50% - .5rem);
        box-shadow: 2px 2px 6px rgba(0,0,0, .8);
        transition: all 300ms;
        border-bottom: 2px solid var(--primary);
    }
    .upgrade-card:hover {
        transform: translateY(4px);
        cursor: pointer;
        background: rgb(168,168,168);
        background: linear-gradient(0deg, rgba(168,168,168,1) 0%, rgba(198,198,198,1) 50%, rgba(210,216,219,1) 100%);
    }
}

</style>