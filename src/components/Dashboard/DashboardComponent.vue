<template>

    <!-- Layout -->
    <div id="dashboard">

        <!-- Navigation bar -->
        <NavbarParentComponent
            :userId="identity.sub" 
            @toggle-tool="handleToggleTool"
            @user-logged-out="handleUserLoggedOut"
            @load-dashboard-data="handleLoadDashboardData"
        />

        <!-- Aside -->
        <NotesParentComponent 
            v-show="isVisibleNotes"
            :website="website_id"
            :notes="notes"
            @note-created="handleNoteCreated"
        />

        <!-- Center -->
        <LeadsParentComponent 
            v-show="isVisibleLeads"
            :website="website_id"
            :leads="leads"
            :class="{ 'wide' : !isVisibleNotes }" 
            :smViewport = smViewport
            @lead-deleted="handleLeadDeleted"
            @lead-created="handleLeadCreated"
        />

        <EmailParentComponent 
            v-show="isVisibleEmail"
            :class="{ 'wide' : !isVisibleNotes }"
            :smViewport = smViewport
            :leads="leads"
        />

        <AdminParentComponent 
            v-show="isVisibleTeam"
            :class="{ 'wide' : !isVisibleNotes }"
        />

        <!-- Status bar -->
        <StatusbarParentComponent />

    </div>

</template>

<script>
import axios from '@/lib/axios'
import NavbarParentComponent from '../NavbarModule/NavbarParentComponent.vue';
import NotesParentComponent from '../NotesModule/NotesParentComponent.vue';
import LeadsParentComponent from '../LeadsModule/LeadsParentComponent.vue';
import EmailParentComponent from '../EmailModule/EmailParentComponent.vue';
import AdminParentComponent from '../AdminModule/AdminParentComponent.vue';
import StatusbarParentComponent from '../StatusbarModule/StatusbarParentComponent.vue';

export default {
    name: 'DashboardComponent',
    components: {
        NavbarParentComponent,
        NotesParentComponent,
        LeadsParentComponent,
        EmailParentComponent,
        AdminParentComponent,
        StatusbarParentComponent
    },
    props: {
        smViewport: {
            type: Boolean,
            required: true
        },
        identity: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            isVisibleNotes: false,
            isVisibleLeads: false,
            isVisibleEmail: false,
            isVisibleTeam: false,
            
            website_id: '',
            notes: [],
            leads: [],
            
        }
    },
    methods: {
        handleToggleTool: function (selection) {

            switch (selection) {
                case 'notes':
                    if (this.isVisibleNotes == false) {
                        this.isVisibleNotes = true;
                        this.isVisibleLeads = false;
                        this.isVisibleEmail = false;
                        this.isVisibleTeam = false;
                    } else {
                        this.isVisibleNotes = false;
                    }
                    break;
                case 'notes-desktop':
                    if (this.isVisibleNotes == false) {
                        this.isVisibleNotes = true;
                    } else {
                        this.isVisibleNotes = false;
                    }
                    break;
                case 'leads':
                    if (this.isVisibleLeads == false) {
                        this.isVisibleLeads = true;
                        this.isVisibleNotes = false;
                        this.isVisibleEmail = false;
                        this.isVisibleTeam = false;
                    } else {
                        this.isVisibleLeads = false;
                    }
                    break;
                case 'leads-desktop':
                    if (this.isVisibleLeads == false) {
                        this.isVisibleLeads = true;
                        this.isVisibleEmail = false;
                    } else {
                        this.isVisibleLeads = false;
                    }
                    break;
                case 'email':
                    if (this.isVisibleEmail == false) {
                        this.isVisibleEmail = true;
                        this.isVisibleNotes = false;
                        this.isVisibleLeads = false;
                        this.isVisibleTeam = false;
                    } else {
                        this.isVisibleEmail = false;
                    }
                    break;
                case 'email-desktop':
                    if (this.isVisibleEmail == false) {
                        this.isVisibleEmail = true;
                        this.isVisibleLeads = false;
                        this.isVisibleTeam = false;
                    } else {
                        this.isVisibleEmail = false;
                    }
                    break;
                case 'team':
                    if (this.isVisibleTeam == false) {
                        this.isVisibleTeam = true;
                        this.isVisibleNotes = false;
                        this.isVisibleLeads = false;
                        this.isVisibleEmail = false;
                    } else {
                        this.isVisibleTeam = false;
                    }
                    break;
                case 'team-desktop':
                    if (this.isVisibleTeam == false) {
                        this.isVisibleTeam = true;
                        this.isVisibleLeads = false;
                        this.isVisibleEmail = false;
                    } else {
                        this.isVisibleTeam = false;
                    }
                    break;
            }
        },
        handleUserLoggedOut: function (){
            this.$emit('user-logged-out');
        },
        handleLoadDashboardData: function (website_id) {
            this.website_id = website_id;
            this.loadWebsiteNotes();
            this.loadWebsiteLeads(); 
        },
        loadWebsiteNotes: async function () {
            const response = await axios.get('api/note/records/'+this.website_id, {"withCredentials":true});
            if(response.data.status == 'success'){
                this.notes = response.data.notes;
            }else {
                console.log("Could not retrieve notes");
            }
        },
        handleNoteCreated: function () {
            this.loadWebsiteNotes();
        },
        loadWebsiteLeads: async function () {
                const response = await axios.get('api/lead/records/'+this.website_id, {"withCredentials": true});
                if(response.data.status=='success'){
                    this.leads = response.data.leads;
                    console.log(this.leads);
                }else{
                    console.log(response.data);
                }
        },
        handleLeadDeleted: function (lead_id) {
            
            this.leads.forEach((item, index) => {
                if(item.id == lead_id){
                    this.leads.splice(index, 1);
                }
            });
        },
        handleLeadCreated: function () {
            console.log('lead created from dashboard');
            this.loadWebsiteLeads();
        },
    }
}

</script>

<style scoped>
/* Mobile first */

#dashboard {
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-columns: 100vw;
    grid-template-rows: 12vh 83vh 5vh;
    background-color: var(--basic);
}

/* Desktop */

@media only screen and (min-width: 1024px) {
    #dashboard {
        grid-template-columns: 20vw 80vw;
        grid-template-rows: 8vh 86vh 6vh;
    }
}
</style>
