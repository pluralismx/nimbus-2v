<template>
    <table>
        <thead>
            <tr class="table-tools">
                <td class="table-search" colspan="2">
                    <label for="">Search:&nbsp;</label>
                    <input v-model="search_query" type="text">&nbsp;
                    <button class="btn-warning" @click="search()">{{ search_btn_text }}</button>
                </td>
                <td class="table-pagination" colspan="4">
                    <label for="rows_per_page">rows per page: </label>
                    <select v-model="this.rp" class="select-rows">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                    </select>
                    <button class="btn-warning" @click="previousPage">&lt;</button>
                    <span>&nbsp;{{ this.cp }}</span><span>&nbsp;/&nbsp;</span><span>{{ this.pages }}&nbsp;</span>
                    <button class="btn-warning" @click="nextPage">&gt;</button>
                </td>
            </tr>
            <tr>
                <th width="18%"><span @click="sortTable('name')">Company</span></th>
                <th width="18%"><span @click="sortTable('phone')">Phone</span></th>
                <th width="18%"><span @click="sortTable('email')">E-mail</span></th>
                <th width="18%"><span @click="sortTable('status')">Status</span></th>
                <th width="18%"><span @click="sortTable('date')">Date</span></th>
                <th width="18%">Actions</th>
            </tr>
        </thead>
        <tbody v-if="!results">
            <LeadRowComponent 
                v-for="lead in displayedData" :key="lead" :lead="lead"
                @lead-deleted="handleLeadDeleted"
                @show-details="handleShowDetails"
            />
        </tbody>
        <tbody v-if="results">
            <LeadRowComponent 
                v-for="lead in results_data" :key="lead" :lead="lead"
                @lead-deleted="handleLeadDeleted"
            />
        </tbody>
    </table>
</template>
<script>
import LeadRowComponent from './LeadRowComponent.vue';
export default {
    name: 'leadsDataTableComponent',
    components: {
        LeadRowComponent
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
            search_btn_text: 'buscar'  
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
            let asc = true;
            let desc = true;

            for (let i = 1; i < this.leadsData.length; i++) {
                if (this.leadsData[i][index] < this.leadsData[i - 1][index]) {
                    asc = false;
                }
                if (this.leadsData[i][index] > this.leadsData[i - 1][index]) {
                    desc = false;
                }
            }

            if (desc) {
                this.leadsData.sort((a, b) => {
                    let columnA = a[index];
                    let columnB = b[index];
                    return columnA.localeCompare(columnB, 'es', { sensitivity: 'base' });
                });
            } else if (asc) {
                this.leadsData.sort((a, b) => {
                    let columnA = a[index];
                    let columnB = b[index];
                    return -columnA.localeCompare(columnB, 'es', { sensitivity: 'base' });
                });
            } else {
                this.leadsData.sort((a, b) => {
                    let columnA = a[index];
                    let columnB = b[index];
                    return columnA.localeCompare(columnB, 'es', { sensitivity: 'base' });
                });
            }
        },
        search (){
            if(this.results == false){
                this.search_btn_text = 'limpiar';
                let query = this.search_query;
                console.log(this.search_query);
                this.leadsData.forEach(lead => {
                    if (query === lead.name || query === lead.phone || query === lead.email) {
                        let id = lead.id_lead;
                        if (!this.results_data.some(match => match.id_lead === id)) {
                            this.results_data.push(lead);
                        }
                    }
                });
                this.results = true;
            }else{
                this.results_data = [];
                this.search_query = null;
                this.results = false;
                this.search_btn_text = 'buscar';
            }
        },
        handleShowDetails: function (lead) {
            this.$emit('show-details', lead);
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

    tbody tr:nth-child(odd) {
        background-color: var(--accent);
        color: var(--warning);
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