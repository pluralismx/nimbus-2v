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
            @note-deleted="handleStatusBarNotification"
            @note-updated="handleStatusBarNotification"
            @note-copied="handleStatusBarNotification"
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
            @lead-updated="handleStatusBarNotification"
            @lead-status-updated="handleStatusBarNotification"
        />

        <EmailParentComponent 
            v-show="isVisibleEmail"
            :class="{ 'wide' : !isVisibleNotes }"
            :smViewport = smViewport
            :leads="leads"
            :website="website_id"
            :images="images"
            @image-uploaded="handleImageUploaded"
        />

        <AdminParentComponent 
            v-show="isVisibleTeam"
            :class="{ 'wide' : !isVisibleNotes }"
        />

        <!-- Status bar -->
        <StatusbarParentComponent 
            :message="statusBarMessage"
        />

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

            // Layout 
            isVisibleNotes: true,
            isVisibleLeads: false,
            isVisibleEmail: false,
            isVisibleTeam: false,
            
            // Dashboard data
            website_id: '',
            notes: [],
            leads: [],
            images: [],

            // Status bar notification data
            statusBarMessage: {}
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
            this.loadWebsiteImages();
        },
        loadWebsiteNotes: async function () {
            const response = await axios.get('api/note/records/'+this.website_id, {"withCredentials":true});
            if(response.data.status == 'success'){
                this.notes = response.data.notes;
            }else {
                console.log("Could not retrieve notes");
            }
        },
        handleNoteCreated: function (notification) {
            this.loadWebsiteNotes();
            this.handleStatusBarNotification(notification);
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
        loadWebsiteImages: async function () {
            const response = await axios.get('api/image/websiteImages/'+this.website_id, {"withCredentials":true});
            if(response.data.status == "success"){
                this.images = response.data.images;
            }
        },
        handleLeadDeleted: function (lead_id, notification) {  
            this.leads.forEach((item, index) => {
                if(item.id == lead_id){
                    this.leads.splice(index, 1);
                }
            });
            this.handleStatusBarNotification(notification);
        },
        handleLeadCreated: function (notification) {
            this.loadWebsiteLeads();
            this.handleStatusBarNotification(notification);
        },
        handleImageUploaded: function () {
            this.loadWebsiteImages();
        },
        handleStatusBarNotification: function (notification){
            this.statusBarMessage=notification;
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
