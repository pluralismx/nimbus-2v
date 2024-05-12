<template>
    <article>
        <div class="lead-header">
            <h3>{{ lead.name }}</h3>
        </div>
        <div class="lead-body">
            <div class="lead-info">
                <div>
                    <span class="data-label">Telefono: </span>
                    <br/>
                    <span>{{ lead.phone }}</span>
                </div>
                <div>
                    <span class="data-label">Correo: </span>
                    <br/>
                    <span>{{ lead.email }}</span>
                </div>
                <div class="div-info">
                    <span class="data-label">Status: </span>
                    <select name="status" @change="editLead()" v-model="new_status">
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
                <button class="btn-primary" @click="showNotesModal">Notas</button>
                <button class="btn-primary" @click="showEditLeadModal">Editar</button>
                <button class="btn-primary" @click="deleteLead()">Eliminar</button>
            </div>
        </div>
    </article>
</template>
<script>
import axios from '@/lib/axios';

    export default {
        name: 'LeadCardComponent',
        props: {
            lead: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                new_status: this.lead.status
            }
        },
        methods: {
            showEditLeadModal() {
                console.log(this.lead);
                this.$emit('show-edit-lead-modal', this.lead);
            },
            showNotesModal() {
                this.$emit('show-notes-modal');
            },
            deleteLead: async function () {
                const response = await axios.delete('api/lead/delete/'+this.lead.id, {'withCredentials':true});
                if(response.data.status=='success'){
                    this.$emit('lead-deleted', this.lead.id);
                }else {
                    console.log('error deleting lead');
                }
            },
            editLead: async function () {
                const json = {
                    'status': this.new_status
                }
                let formData = new FormData();
                formData.append('json', JSON.stringify(json));
                
                formData.append('_method', 'put');
                const response = await axios.post('api/lead/update/'+this.lead.id, formData, {"withCredentials":true});
                if(response.data.staus=="success"){
                    console.log("lead edited");
                }else {
                    console.log(response.data.status);
                }
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