<template>
    <section>
        <LeadsTitleBarComponent 
            @save-lead="handleSaveLead"
        />
        <!-- Mobile devices -->
        <div class="leads-container" v-if="smViewport">
            <LeadCardComponent 
                @show-edit-lead-modal="handleShowEditLeadModal"
                @show-notes-modal="handleShowNotesModal"
                @lead-deleted="handleLeadDeleted"
                v-for="lead in leads" :key="lead.id" :lead="lead"
            />
        </div>

        <!-- Desktop devices -->
        <div class="leads-container" v-else>
            <LeadsTableComponent 
                :leads="leads"
                @lead-deleted="handleLeadDeleted"
                @sort-table="handleSortTable"
                @show-details="handleShowDetails"
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
            :lead="leadDetails"
            :leadNotes="leadNotes"
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

    export default {
        name: 'LeadsParentComponent',
        components: {
            LeadsTitleBarComponent,
            LeadCardComponent,
            LeadsTableComponent,
            SaveLeadModalComponent,
            EditLeadModalComponent,
            NotesLeadModalComponent
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
                // Data
                leadToEdit: {},
                leadDetails: '',
                leadNotes: []
            }
        },
        methods: {
            handleSaveLead: function () {
                this.isVisibleSaveLeadModal = true;
            },
            handleCancelSaveLead: function () {
                this.isVisibleSaveLeadModal = false;
            },
            handleShowEditLeadModal: function (lead) {
                this.leadToEdit = lead;
                this.isVisibleEditLeadModal = true;
            },
            handleCancelEditLead: function () {
                this.isVisibleEditLeadModal = false;
            },
            handleShowNotesModa: function () {
                this.isVisibleNotesLeadModal = true;
            },
            handleCloseNotesModal: function () {
                this.isVisibleNotesLeadModal = false;
            },
            handleLeadCreated: function () {
                this.isVisibleSaveLeadModal = false;
                this.$emit('lead-created');
            },
            handleLeadDeleted: function (lead_id) {
                this.$emit('lead-deleted', lead_id);
            },
            handleShowDetails: function (lead) {
                this.isVisibleNotesLeadModal = true;
                this.leadDetails = lead;
                this.loadLeadNotes();
            },
            loadLeadNotes: async function () {
                const response = await axios.get('api/lead/getLeadNotes/'+this.leadDetails.id, {"withCredentials": true});
                if(response.data.status=='success'){
                    this.leadNotes = response.data.lead_notes;
                }
            }
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