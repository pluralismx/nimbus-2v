<template>
    <article>
        <div class="lead-header">
            <h3>Gerardo Topete Perez</h3>
        </div>
        <div class="lead-body">
            <div class="lead-info">
                <div>
                    <span class="data-label">Telefono: </span>
                    <br/>
                    <span>526642522024</span>
                </div>
                <div>
                    <span class="data-label">Correo: </span>
                    <br/>
                    <span>gerardotopete7@gmail.com</span>
                </div>
                <div class="div-info">
                    <span class="data-label">Status: </span>
                    <select name="status">
                        <option value="nuevo">nuevo</option>
                        <option value="presentacion">presentacion</option>
                        <option value="cotizacion">cotizacion</option>
                        <option value="negociacion">negociacion</option>
                        <option value="cierre">cierre</option>
                    </select>
                </div>
            </div>
            <div class="lead-actions">
                <button class="btn-warning">Llamar</button>
                <button class="btn-primary">Notas</button>
                <button class="btn-primary" @click="showEditLeadModal">Editar</button>
                <button class="btn-primary">Eliminar</button>
            </div>
        </div>
    </article>
</template>
<script>
    export default {
        name: 'LeadComponent',
        methods: {
            showEditLeadModal(){
                this.$emit('show-edit-lead-modal');
            }
        }
    }
</script>
<style scoped>

    /* Mobile first */

    article {
        background-color: var(--accent);
        min-height: 30%;
        width: 100%;
        border-radius: 6px;
        box-shadow: 2px 2px 3px var(--shadows);
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: 18% 82%;
        margin-bottom: 2.5rem;
    }

    .lead-header {
        grid-row: 1/2;
        grid-column: 1/2;
        background-color: var(--warn);
        border-top-right-radius: 6px;
        border-top-left-radius: 6px;
        display: flex;
        align-items: center;
        padding: 0px .5rem;
    }

    .lead-header h3 {
        margin: 0;
        color: var(--basic);
    }

    .lead-body {
        grid-row: 2/3;
        grid-column: 1/2;
        padding: .5rem;
        display: grid;
        grid-template-columns: 70% 30%;
        grid-template-rows: 100%;
    }

    .lead-info {
        grid-column: 1/2;
        grid-row: 1/2;
        overflow: hidden;
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: 3fr 3fr 3fr;
    }

    .div-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: .5rem;
    }

    .data-label {
        font-weight: bold;
        font-size: 17px;
    }

    .div-info select {
        width: 70%;
    }

    .lead-actions {
        grid-column: 2/3;
        grid-row: 1/2;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding-top: 0; 
        padding-bottom: 0;
        padding-left: .5rem;
        padding-right: 0;
        border-left: solid 1px var(--warn);
    }

</style>