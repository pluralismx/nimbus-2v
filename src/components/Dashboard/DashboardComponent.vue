<template>

    <!-- Layout -->
    <div id="dashboard">
        <!-- Loading screen -->
         <div class="loading-app-screen" v-show="loadingApp">
            <h1>Cargando</h1>
         </div>
        <!-- Navigation bar -->
        <NavbarParentComponent
            :identity="identity"
            :reload="reload"
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
            @lead-updated="handleLeadUpdated"
            @lead-status-updated="handleLeadUpdated"
            @csv-uploaded="handleCsvUploaded"
            @excel-downloaded="handleStatusBarNotification"
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
            @emails-sent="handleEmailsSent"
        />

        <AdminParentComponent 
            v-show="isVisibleTeam"
            :class="{ 'wide' : !isVisibleNotes }"
            :identity="identity"
            :account="account"
            @teammate-role-updated="handleStatusBarNotification"
            @teammate-added="handleStatusBarNotification"
            @teammate-deleted="handleStatusBarNotification"
            @friend-deleted="handleStatusBarNotification"
            @friend-request-sent="handleStatusBarNotification"
            @website-deleted="handleUpdateWebsiteList"
            @website-created="handleUpdateWebsiteList"
            @website-updated="handleUpdateWebsiteList"
            @cant-add-feature="handleStatusBarNotification"
            @reload-acount="loadAccountData"
            @downgrade-invalid="handleStatusBarNotification"
            
        />

        <!-- Status bar -->
        <StatusbarParentComponent 
            :message="statusBarMessage"
            :account="account"
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
        },
    },
    mounted() {
        this.loadAccountData()    
        this.showIntroMessage();
    },
    data() {
        return {

            // Layout
            loadingApp: false,
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
            account: {},

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
                        this.isVisibleTeam = false;
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
        handleLoadDashboardData: async function (website_id) {
            
            this.website_id = website_id;
            await Promise.all([
                this.loadWebsiteNotes(),
                this.loadWebsiteLeads(),
                this.loadWebsiteImages(),
                this.loadAccountData()
            ]);
            
        },
        loadWebsiteLeads: async function () {
            
            try {
                const response = await axios.get('api/lead/records/'+this.website_id, {"withCredentials": true});
                if(response.data.status=="success"){
                    this.leads = response.data.leads;
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
            if(this.website_id !== undefined && this.website_id !== '' && this.website_id !== null){
                const response = await axios.get('api/image/websiteImages/'+this.website_id, {"withCredentials":true});
                if(response.data.status=="success"){
                    this.images = response.data.images;
                }
            }
        },
        loadAccountData: async function () {
            const response = await axios.get('api/account/accountDetails', {"withCredentials": true});
            if(response.data.status=="success"){
                this.account = response.data.account;
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
            if(lead_id){
                this.leads = this.leads.filter(item => item.id !== lead_id);
                if (notification && notification.owner) {
                    this.account.actual_contacts--;
                }
                this.handleStatusBarNotification(notification);
            }else{
                this.handleStatusBarNotification(notification);
            }
            
        },
        handleLeadCreated: function (notification) {
            this.loadWebsiteLeads();
            if(notification.status == "success" && notification.owner != false){
                this.account.actual_contacts++;
            }
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
            if(this.reload == false){
                this.reload = true;
            }else if(this.reload == true){
                this.reload = false;
            }
        },
        handleUserHasNoWebsites: function () {
            this.website_id='';
            this.notes=[];
            this.leads=[];
            this.images=[];
            this.loadAccountData();
        },
        handleCsvUploaded: function (notification) {
            this.handleStatusBarNotification(notification);
            if(notification && notification.owner){
                this.account.actual_contacts = Number(this.account.actual_contacts + notification.records_added);
            }
            this.loadWebsiteLeads();
        },
        handleEmailsSent: function (qty) {
            this.account.sent_emails = Number(this.account.sent_emails) + qty;
        },
        handleLeadUpdated: function (notification) {
            this.loadWebsiteLeads();
            this.handleStatusBarNotification(notification);
        }
    }
}

</script>

<style scoped>
/* Mobile first */

#dashboard {
    height: 100svh;
    width: 100svw;
    display: grid;
    grid-template-columns: 100svw;
    grid-template-rows: 14svh 79svh 7svh;
    background-color: var(--basic);
}

/* Desktop */

@media only screen and (min-width: 1024px) {
    #dashboard {
        grid-template-columns: 27vw 73vw;
        grid-template-rows: 8vh 86vh 6vh;
    }
}

@media only screen and (min-width: 1440px) {
    #dashboard {
        grid-template-columns: 20vw 80vw;
        grid-template-rows: 8vh 86vh 6vh;
    }
}
</style>
