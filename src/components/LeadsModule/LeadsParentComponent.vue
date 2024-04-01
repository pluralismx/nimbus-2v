<template>
    <section>
        <LeadsTitleBarComponent 
            @save-lead="handleSaveLead"
        />
        <!-- Mobile devices -->
        <LeadComponent v-if="smViewport"
            @show-edit-lead-modal="handleShowEditLeadModal"
            @show-notes-modal="handleShowNotesModal"
        />

        <!-- Desktop devices -->
        <LeadsTableComponent v-else />

        <!-- Modals -->
        <SaveLeadModalComponent 
            v-show="isVisibleSaveLeadModal"
            @cancel-save-lead="handleCancelSaveLead"
        />

        <EditLeadModalComponent
            v-show="isVisibleEditLeadModal"
            @cancel-edit-lead="handleCancelEditLead"
        />

        <NotesLeadModalComponent 
            v-show="isVisibleNotesLeadModal"
            @close-notes-modal="handleCloseNotesModal"
        />

    </section>
</template>
<script>

    import LeadsTitleBarComponent from './LeadsTitleBarComponent.vue';
    import LeadComponent from './LeadComponent.vue';
    import LeadsTableComponent from './LeadsTableComponent.vue';
    import SaveLeadModalComponent from './SaveLeadModalComponent.vue';
    import EditLeadModalComponent from './EditLeadModalComponent.vue';
    import NotesLeadModalComponent from './NotesLeadModalComponent'

    export default {
        name: 'LeadsParentComponent',
        components: {
            LeadsTitleBarComponent,
            LeadComponent,
            LeadsTableComponent,
            SaveLeadModalComponent,
            EditLeadModalComponent,
            NotesLeadModalComponent
        },
        props: {
            smViewport: {
                type: Boolean,
                required: true
            }
        },
        data() {
            return {
                isVisibleSaveLeadModal: false,
                isVisibleEditLeadModal: false,
                isVisibleNotesLeadModal: false
            }
        },
        methods: {
            handleSaveLead() {
                this.isVisibleSaveLeadModal = true;
            },
            handleCancelSaveLead() {
                this.isVisibleSaveLeadModal = false;
            },
            handleShowEditLeadModal() {
                this.isVisibleEditLeadModal = true;
            },
            handleCancelEditLead() {
                this.isVisibleEditLeadModal = false;
            },
            handleShowNotesModal() {
                this.isVisibleNotesLeadModal = true;
            },
            handleCloseNotesModal() {
                this.isVisibleNotesLeadModal = false;
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
    }


</style>