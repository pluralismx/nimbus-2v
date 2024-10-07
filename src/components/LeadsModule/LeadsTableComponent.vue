<template>
    <table>
        <thead>
            <tr class="table-tools">
                <td class="table-search" colspan="3">
                    <label for="">Buscar:&nbsp;</label>
                    <input v-model="search_query" type="text">&nbsp;
                    <button class="btn-warning compact" @click="search()">{{ search_btn_text }}</button>
                </td>
                <td class="table-pagination" colspan="4">
                    <label for="rows_per_page">resultados: </label>
                    <select v-model="this.rp" class="select-rows">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                    </select>
                    <button class="btn-warning compact" @click="previousPage">&lt;</button>
                    <span>&nbsp;{{ this.cp }}</span><span>&nbsp;/&nbsp;</span><span>{{ this.pages }}&nbsp;</span>
                    <button class="btn-warning compact" @click="nextPage">&gt;</button>
                </td>
            </tr>
            <tr>
                <th width="18%"><span class="column-name" @click="sortTable('name')">Compañia</span></th>
                <th width="18%"><span class="column-name" @click="sortTable('phone')">Télefono</span></th>
                <th width="18%"><span class="column-name" @click="sortTable('email')">E-mail</span></th>
                <th width="18%"><span class="column-name" @click="sortTable('status')">Status</span></th>
                <th width="18%"><span class="column-name" @click="sortTable('date')">Fecha</span></th>
                <th width="18%">Acciones</th>
            </tr>
        </thead>
        <tbody v-if="!results">
            <LeadRowComponent 
                v-for="lead in displayedData" :key="lead" :lead="lead"
                @lead-deleted="handleLeadDeleted"
                @show-details="handleShowDetails"
                @lead-updated="handleLeadUpdated"
                @lead-status-updated="handleLeadStatusUpdated"
                @delete-lead="handleDeleteLead"
                @close-sale="handleCloseSale"
            />
        </tbody>
        <tbody v-if="results">
            <LeadRowComponent 
                v-for="lead in results_data" :key="lead" :lead="lead"
                @lead-deleted="handleLeadDeleted"
                @show-details="handleShowDetails"
                @lead-updated="handleLeadUpdated"
                @lead-status-updated="handleLeadStatusUpdated"
                @delete-lead="handleDeleteLead"
                @close-sale="handleCloseSale"
            />
        </tbody>
    </table>
    <ModalConfirmationComponent 
        v-show="isVisibleConfirmationModal"
        @answer="handleModalAnswered"
    />
</template>
<script>
import axios from '@/lib/axios';
import LeadRowComponent from './LeadRowComponent.vue';
import ModalConfirmationComponent from './ModalConfirmationComponent.vue'
export default {
    name: 'leadsDataTableComponent',
    components: {
        LeadRowComponent,
        ModalConfirmationComponent
    },
    props: {
        leads: {
            type: Array,
            required: true
        }
    },
    data(){
        return {
            leadsData: null,
            leads_per_page: null,
            rp: 10,
            cp: 1,
            search_query: null,
            results: false,
            results_data: [],
            search_btn_text: 'buscar',
            isVisibleConfirmationModal: false,
            leadToDelete: ''
        }
    },
    computed: {
        leadsDataComputed() {
            return this.leads;
        },
        pages() {
            return Math.ceil((this.leadsData.length / this.rp));
        },
        limitStart() {
            return (this.cp - 1) * this.rp;
        },
        limitEnd(){
            return (this.rp * this.cp);
        },
        displayedData(){
            return this.leadsData.slice(this.limitStart, this.limitEnd);
        }
    },
    watch: {
        leadsDataComputed: {
            handler(newVal){
                this.leadsData = newVal;
            },
            immediate: true,
            deep: true
        }
    },

    methods: {
        handleLeadDeleted: function (lead_id) {
            this.$emit('lead-deleted', lead_id);
        },
        nextPage (){
                if(this.cp < this.pages){
                    this.cp++;
                }
        },
        previousPage (){
            if(this.cp > 1){
                this.cp--;
            }
        },
        sortTable(index) {
            // Verificar el estado actual del orden
            if (this.orderByColumn === index) {
                // Si ya estamos ordenando por esta columna, invertir el orden
                this.orderAsc = !this.orderAsc;
            } else {
                // Si es una nueva columna, ordenar ascendente por defecto
                this.orderByColumn = index;
                this.orderAsc = true;
            }

            // Ordenar según el estado actual
            if (this.orderAsc) {
                this.leadsData.sort((a, b) => {
                    let columnA = a[index].toLowerCase(); // Convertir a minúsculas para ordenar de manera no sensible a mayúsculas
                    let columnB = b[index].toLowerCase(); // Convertir a minúsculas para ordenar de manera no sensible a mayúsculas
                    return columnA.localeCompare(columnB, 'es', { sensitivity: 'base' });
                });
            } else {
                this.leadsData.sort((a, b) => {
                    let columnA = a[index].toLowerCase(); // Convertir a minúsculas para ordenar de manera no sensible a mayúsculas
                    let columnB = b[index].toLowerCase(); // Convertir a minúsculas para ordenar de manera no sensible a mayúsculas
                    return columnB.localeCompare(columnA, 'es', { sensitivity: 'base' });
                });
            }
        },
        search() {
            if (this.results === false) {
                this.search_btn_text = 'limpiar';
                let query = this.search_query.toLowerCase();
                this.results_data = [];

                this.leadsData.forEach(lead => {
                    if (
                        (lead.name && lead.name.toLowerCase().startsWith(query)) || 
                        (lead.phone && lead.phone.toLowerCase().startsWith(query)) || 
                        (lead.email && lead.email.toLowerCase().startsWith(query))
                    ) {
                        this.results_data.push(lead);
                    }
                });
                this.results = true;
            } else {
                this.results_data = [];
                this.search_query = null;
                this.results = false;
                this.search_btn_text = 'buscar';
            }
        },
        handleShowDetails: function (lead) {
            this.$emit('show-details', lead);
        },
        handleLeadUpdated: function (lead, notification) {
            this.$emit('lead-updated', lead, notification);
        },
        handleLeadStatusUpdated: function (lead, notification) {
            this.$emit('lead-status-updated', lead, notification);
        },
        handleDeleteLead: function (id) {
            this.isVisibleConfirmationModal=true;
            this.leadToDelete = id;
        },
        handleModalAnswered: async function (answer) {
            if(answer){
                const response = await axios.delete('api/lead/delete/'+this.leadToDelete, {"withCredentials":true});
                if(response.data.status=="success"){
                    this.handleLeadDeleted(this.leadToDelete);
                    this.isVisibleConfirmationModal=false;
                    this.$emit('lead-deleted', this.leadToDelete, {
                        "text": "Prospecto eliminado",
                        "status": "success",
                        "owner": response.data.owner
                    });
                }else if(response.data.message=="Forbidden"){
                    this.isVisibleConfirmationModal=false;
                    this.$emit('lead-deleted', false, {"text":"Permisos insuficientes", "status":"error"});
                }else{
                    this.isVisibleConfirmationModal=false;
                    this.$emit('lead-deleted', this.leadToDelete, {"text":"No se pudo eliminar el prospecto", "status":"error"});
                }
            }else{
                this.isVisibleConfirmationModal=false;
            }
        },
        handleCloseSale: function (lead) {
            this.$emit('close-sale', lead);
        }
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
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
        margin-bottom: 1rem;
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
    }


    tbody tr:nth-child(odd) {
        background-color: var(--accent);
        color: var(--warning);
    }
    tbody tr:hover {
        background-color: var(--shadows);
        color: var(--accent);
        cursor: pointer;
    }
    tbody tr:nth-child(odd):hover {
        background-color: var(--shadows);
        color: var(--accent);
        cursor: pointer;
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

    .column-name:hover {
        cursor: pointer;
        color: var(--accent);
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