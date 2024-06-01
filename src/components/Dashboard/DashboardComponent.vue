<template>

    <!-- Layout -->
    <div id="dashboard">

        <!-- Navigation bar -->
        <NavbarParentComponent
            :identity="identity"
            :reload="reload"
            @website-list-updated="handleWebsiteListUpdated"
            @toggle-tool="handleToggleTool"
            @user-logged-out="handleUserLoggedOut"
            @load-dashboard-data="handleLoadDashboardData"
            @user-has-no-websites="handleUserHasNoWebsites"
        />

        <!-- Aside -->
        <NotesParentComponent 
            v-show="isVisibleNotes"
            :website="website_id"
            :notes="notes"
            :identity="identity"
            @note-created="handleNoteCreated"
            @note-deleted="handleStatusBarNotification"
            @note-updated="handleStatusBarNotification"
            @note-copied="handleStatusBarNotification"
        />

        <!-- Center -->
        <LeadsParentComponent 
            v-show="isVisibleLeads"
            :identity="identity"
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
            :identity="identity"
            :class="{ 'wide' : !isVisibleNotes }"
            :smViewport = smViewport
            :leads="leads"
            :website="website_id"
            :images="images"
            @image-uploaded="handleImageUploaded"
            @email-added="handleStatusBarNotification"
            @image-deleted="handleStatusBarNotification"
        />

        <AdminParentComponent 
            v-show="isVisibleTeam"
            :class="{ 'wide' : !isVisibleNotes }"
            :identity="identity"
            @teammate-role-updated="handleStatusBarNotification"
            @teammate-added="handleStatusBarNotification"
            @teammate-deleted="handleStatusBarNotification"
            @friend-deleted="handleStatusBarNotification"
            @friend-request-sent="handleStatusBarNotification"
            @website-deleted="handleUpdateWebsiteList"
            @website-created="handleUpdateWebsiteList"
            @website-updated="handleUpdateWebsiteList"
        />

        <!-- Status bar -->
        <StatusbarParentComponent 
            :message="statusBarMessage"
        />

        <!-- Modals -->
        <IntroMessageComponent 
            v-show=isVisibleIntroMessageComponent
            @welcome-message-accepted="handleWelcomeMessageAccepted"
        />
    </div>

</template>

<script>
import axios from '@/lib/axios'
import IntroMessageComponent from './IntroMessageComponent.vue';
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
        StatusbarParentComponent,
        IntroMessageComponent
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
    mounted() {
        this.showIntroMessage();
    },
    data() {
        return {

            // Layout 
            isVisibleNotes: true,
            isVisibleLeads: false,
            isVisibleEmail: false,
            isVisibleTeam: false,
            isVisibleIntroMessageComponent: false,
            
            // Dashboard data
            reload: false,
            website_id: '',
            notes: [],
            leads: [],
            images: [],

            // Status bar notification data
            statusBarMessage: {}
        }
    },
    methods: {

        // Layout
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
        showIntroMessage: function () {
            if(this.identity.intro_message == 1) {
                this.isVisibleIntroMessageComponent = true;
            }else {
                this.isVisibleIntroMessageComponent = false;
            }
        },
        handleWelcomeMessageAccepted: function () {
            this.isVisibleIntroMessageComponent = false;
        },

        // Dashboard data
        handleLoadDashboardData: function (website_id) {
            this.website_id = website_id;
            this.loadWebsiteNotes();
            this.loadWebsiteLeads();
            this.loadWebsiteImages();
        },
        loadWebsiteLeads: async function () {
            try {
                const response = await axios.get('api/lead/records/'+this.website_id, {"withCredentials": true});
                if(response.data.status=="success"){
                    this.leads = response.data.leads;
                    this.getLeadEmails();
                }
            } catch (error) {
                console.error('Error loading website leads:', error);
            }
                
        },
        loadWebsiteNotes: async function () {
            const response = await axios.get('api/note/records/'+this.website_id, {"withCredentials":true});
            if(response.data.status=="success"){
                this.notes = response.data.notes;
            }
        },
        loadWebsiteImages: async function () {
            const response = await axios.get('api/image/websiteImages/'+this.website_id, {"withCredentials":true});
            if(response.data.status=="success"){
                this.images = response.data.images;
            }
        },

        // Update dashboard data
        handleNoteCreated: function (notification) {
            if(notification.status != 'error'){
                this.loadWebsiteNotes();
                this.handleStatusBarNotification(notification);
            }else {
                this.handleStatusBarNotification(notification);
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
        handleImageUploaded: function (notification) {
            this.loadWebsiteImages();
            this.handleStatusBarNotification(notification);
        },
        handleImageDeleted: function (notification) {
            this.loadWebsiteImages();
            this.handleStatusBarNotification(notification);
        },
        handleStatusBarNotification: function (notification){
            this.statusBarMessage=notification;
        },
        handleUpdateWebsiteList: function (notification) {
            this.handleStatusBarNotification(notification);
            this.reload = true;
        },
        handleWebsiteListUpdated: function () {
            this.reload = false;
        },
        handleUserHasNoWebsites: function () {
            this.website_id='';
            this.notes=[];
            this.leads=[];
            this.images=[];
        }
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
