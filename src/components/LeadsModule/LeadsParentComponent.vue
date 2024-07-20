<template>
    <section>
        <LeadsTitleBarComponent 
            @save-lead="handleSaveLead"
            @show-upload-cvs="handleShowUploadCsv"
            @excel-downloaded="handleExcelDownloaded"
            @show-options="handleShowOptions"
            :website="website"
        />
        <!-- Mobile devices -->
        <div class="leads-container" v-if="smViewport">
            <LeadCardComponent
                v-show="!results"
                v-for="lead in displayedData" :key="lead.id" :lead="lead"
                @show-edit-lead-modal="handleShowEditLeadModal"
                @show-notes-modal="handleShowDetails" 
                @lead-status-updated="handleLeadStatusUpdated"
                @delete-lead="handleDeleteLead"
            />
            <LeadCardComponent
                v-show="results"
                v-for="lead in results_data" :key="lead.id" :lead="lead"
                @show-edit-lead-modal="handleShowEditLeadModal"
                @show-notes-modal="handleShowDetails" 
                @lead-status-updated="handleLeadStatusUpdated"
                @delete-lead="handleDeleteLead"
            />
            <div class="mobile-pagination-controlls">
                <button class="btn-primary" @click="previousPage">&lt;</button>
                <span>&nbsp;{{ this.cp }}&nbsp;/&nbsp;{{ this.pages }}&nbsp;</span>
                <button class="btn-primary" @click="nextPage">&gt;</button>
            </div>
        </div>
        <!-- Desktop devices -->
        <div class="leads-container" v-else>
            <LeadsTableComponent 
                :leads="leads"
                @lead-deleted="handleLeadDeleted"
                @show-details="handleShowDetails"
                @lead-updated="handleLeadUpdated"
                @lead-status-updated="handleLeadStatusUpdated"
            />
        </div>
        <!-- Modals -->
        <SaveLeadModalComponent 
            v-show="isVisibleSaveLeadModal"
            :website_id="website"
            @cancel-save-lead="handleCancelSaveLead"
            @lead-created="handleLeadCreated"
        />

        <EditLeadModalComponent
            v-show="isVisibleEditLeadModal"
            @cancel-edit-lead="handleCancelEditLead"
            :lead="leadToEdit"
        />

        <NotesLeadModalComponent 
            v-show="isVisibleNotesLeadModal"
            @close-notes-modal="handleCloseNotesModal"
            @lead-note-added="handleLeadNoteAdded"
            :lead="leadDetails"
            :leadNotes="leadNotes"
        />

        <ModalConfirmationComponent 
            v-show="isVisibleConfirmationModal"
            @answer="handleConfirmationAnswer"
            @close-modal="handleConfirmationAnswer"
        />

        <ModalUploadCvsComponent 
            v-show="isVisibleCvsModal"
            :website="website"
            @answer="handleShowUploadCsv"
            @csv-uploaded="handleCsvUploaded"
        />

        <ModalLeadOptionsComponent 
            v-show="isVisibleLeadOptions"
            @close-modal="handleShowOptions"
            @sort-leads-by="handleSortLeadsBy"
            @change-displayed-results="handleDisplyedResults"
            @search-query="handleSearchQuery"
        />

    </section>
</template>
<script>
    import axios from '@/lib/axios'
    import LeadsTitleBarComponent from './LeadsTitleBarComponent.vue';
    import LeadCardComponent from './LeadCard.vue';
    import LeadsTableComponent from './LeadsTableComponent.vue';
    import SaveLeadModalComponent from './SaveLeadModalComponent.vue';
    import EditLeadModalComponent from './EditLeadModalComponent.vue';
    import NotesLeadModalComponent from './NotesLeadModalComponent';
    import ModalConfirmationComponent from './ModalConfirmationComponent.vue';
    import ModalUploadCvsComponent from './ModalUploadCvsComponent.vue';
    import ModalLeadOptionsComponent from './ModalLeadOptionsComponent.vue';

    export default {
        name: 'LeadsParentComponent',
        components: {
            LeadsTitleBarComponent,
            LeadCardComponent,
            LeadsTableComponent,
            SaveLeadModalComponent,
            EditLeadModalComponent,
            NotesLeadModalComponent,
            ModalConfirmationComponent,
            ModalUploadCvsComponent,
            ModalLeadOptionsComponent
        },
        props: {
            smViewport: {
                type: Boolean,
                required: true
            },
            website: {
                type: Number,
                required: true
            },
            identity: {
                type: Object,
                required: true
            },
            leads: {
                type: Array,
                required: true
            }
        },
        computed: {
            leadsComputed() {
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
            leadsComputed: {
                handler(newVal){
                    this.leadsData = newVal;
                }
            },
            immediate: true,
            deep: true
        },
        data() {
            return {
                isVisibleSaveLeadModal: false,
                isVisibleEditLeadModal: false,
                isVisibleNotesLeadModal: false,
                isVisibleConfirmationModal: false,
                isVisibleCvsModal: false,
                isVisibleLeadOptions: false,
                
                // Data
                leadsData: [],
                leadToEdit: {},
                leadDetails: '',
                leadNotes: [],
                leadToDelete: '',

                // Display options
                sortBy: '',
                leads_per_page: null,
                rp: 10,
                cp: 1,
                search_query: null,
                results: false,
                results_data: [],
            }
        },
        methods: {

            // Lead update
            handleLeadUpdated: function (notification) {
                this.$emit('lead-updated', notification);
            },
            handleLeadStatusUpdated: function (notification) {
                this.$emit('lead-status-updated', notification);
            },
            handleShowEditLeadModal: function (lead) {
                this.leadToEdit = lead;
                this.isVisibleEditLeadModal = true;
            },

            // Lead notes
            handleLeadNoteAdded: function (id) {
                this.leadDetails.id = id;
                this.loadLeadNotes();
            },
            loadLeadNotes: async function () {
                const response = await axios.get('api/lead/getLeadNotes/'+this.leadDetails.id, {"withCredentials": true});
                if(response.data.status=='success'){
                    this.leadNotes = response.data.lead_notes;
                }
            },
            handleShowDetails: function (lead) {
                this.isVisibleNotesLeadModal = true;
                this.leadDetails = lead;
                this.loadLeadNotes();
            },
            handleCloseNotesModal: function () {
                this.isVisibleNotesLeadModal = false;
            },

            // Create lead
            handleSaveLead: function () {
                this.isVisibleSaveLeadModal = true;
            },
            handleCancelSaveLead: function () {
                this.isVisibleSaveLeadModal = false;
            },
            handleLeadCreated: function (notification) {
                this.isVisibleSaveLeadModal = false;
                this.$emit('lead-created', notification);
            },

            // Delete lead
            handleDeleteLead: function (id) {
                this.leadToDelete = id;
                this.isVisibleConfirmationModal=true;
            },
            handleConfirmationAnswer: async function (answer) {
                if(answer){
                    const response = await axios.delete('api/lead/delete/'+this.leadToDelete, {'withCredentials':true});
                    if(response.data.status=='success'){
                        this.$emit('lead-deleted', this.leadToDelete, {"text":"Prospecto eliminado", "status":"success"});
                        this.isVisibleConfirmationModal=false;
                    }else {
                        this.$emit('lead-deleted', this.leadToDelete, {"text":"No se pudo eliminar el prospecto", "status":"error"});
                        this.isVisibleConfirmationModal=false;
                    }
                }else{
                    this.isVisibleConfirmationModal=false;
                }
            },
            handleLeadDeleted: function (lead_id, notification) {
                if(!lead_id){
                    this.$emit('lead-deleted', notification);
                }
                this.$emit('lead-deleted', lead_id, notification);
            },
            handleCancelEditLead: function () {
                this.isVisibleEditLeadModal = false;
            },

            // Excel and CVS
            handleShowUploadCsv: function () {
                if(this.isVisibleCvsModal ==  false){
                    this.isVisibleCvsModal = true;
                }else {
                    this.isVisibleCvsModal = false;
                }
            },
            handleCsvUploaded: function (notification) {
                this.$emit('csv-uploaded', notification);
            },
            handleExcelDownloaded: function (notification) {
                this.$emit('excel-downloaded', notification);
            },

            // Mobile lead Options
            handleShowOptions: function () {
                if(this.isVisibleLeadOptions == false){
                    this.isVisibleLeadOptions = true;
                }else {
                    this.isVisibleLeadOptions = false;
                }
            },
            handleSortLeadsBy: function (criteria) {
            // Verificar el estado actual del orden
                if (this.orderByColumn === criteria) {
                    // Si ya estamos ordenando por esta columna, invertir el orden
                    this.orderAsc = !this.orderAsc;
                } else {
                    // Si es una nueva columna, ordenar ascendente por defecto
                    this.orderByColumn = criteria;
                    this.orderAsc = true;
                }

                // Ordenar según el estado actual
                if (this.orderAsc) {
                    this.leadsData.sort((a, b) => {
                        let columnA = a[criteria].toLowerCase(); // Convertir a minúsculas para ordenar de manera no sensible a mayúsculas
                        let columnB = b[criteria].toLowerCase(); // Convertir a minúsculas para ordenar de manera no sensible a mayúsculas
                        return columnA.localeCompare(columnB, 'es', { sensitivity: 'base' });
                    });
                } else {
                    this.leadsData.sort((a, b) => {
                        let columnA = a[criteria].toLowerCase(); // Convertir a minúsculas para ordenar de manera no sensible a mayúsculas
                        let columnB = b[criteria].toLowerCase(); // Convertir a minúsculas para ordenar de manera no sensible a mayúsculas
                        return columnB.localeCompare(columnA, 'es', { sensitivity: 'base' });
                    });
                }
            },
            handleDisplyedResults: function (results) {
                this.rp = results;
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
            handleSearchQuery: function (query) {
                this.search_query = query;
                this.search();
            },
            search: function (){
                if(this.results == false){
                    let query = this.search_query;
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
                }
            },
        }
    }
</script>
<style scoped>
    
    /* Mobile first */
    section {
        grid-column: 1/2;
        grid-row: 2/3;
        background-color: var(--basic);
        padding: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-sizing: border-box;
        overflow-y: scroll;
    }
    

    .leads-container {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
    }

    .leads-container::-webkit-scrollbar {
        display: none;
    }

    .mobile-pagination-controlls {
        display: flex;
        align-items: center;
        font-size: 16px;
        justify-content: center;
    }

    /* Desktop */
    @media only screen and (min-width: 1024px) {
        section {
            grid-column: 2/3;
            grid-row: 2/3;
        }
        .wide {
            grid-column: 1/3;
            grid-row: 2/3;
        }
        .leads-container {
            width: 100%;
            height: 100%;
        }
    }

</style>