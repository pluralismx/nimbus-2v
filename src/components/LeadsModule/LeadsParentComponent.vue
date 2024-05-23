<template>
    <section>
        <LeadsTitleBarComponent 
            @save-lead="handleSaveLead"
        />
        <!-- Mobile devices -->
        <div class="leads-container" v-if="smViewport">
            <LeadCardComponent
                v-for="lead in leads" :key="lead.id" :lead="lead"
                @show-edit-lead-modal="handleShowEditLeadModal"
                @show-notes-modal="handleShowDetails"
                @lead-status-updated="handleLeadStatusUpdated"
                @delete-lead="handleDeleteLead"
            />
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

    export default {
        name: 'LeadsParentComponent',
        components: {
            LeadsTitleBarComponent,
            LeadCardComponent,
            LeadsTableComponent,
            SaveLeadModalComponent,
            EditLeadModalComponent,
            NotesLeadModalComponent,
            ModalConfirmationComponent
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
            leads: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                isVisibleSaveLeadModal: false,
                isVisibleEditLeadModal: false,
                isVisibleNotesLeadModal: false,
                isVisibleConfirmationModal: false,
                // Data
                leadToEdit: {},
                leadDetails: '',
                leadNotes: [],
                leadToDelete: ''
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
                this.$emit('lead-deleted', lead_id, notification);
            },
            handleCancelEditLead: function () {
                this.isVisibleEditLeadModal = false;
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
        overflow-y: scroll;
    }

    .leads-container {
        width: 100%;
        height: 100%;
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