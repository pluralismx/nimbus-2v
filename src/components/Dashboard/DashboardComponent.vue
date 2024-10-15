<template>

    <!-- Layout -->
    <div id="dashboard">
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
            :products="list_products"
            :class="{ 'wide' : !isVisibleNotes }" 
            :smViewport = smViewport
            @lead-deleted="handleLeadDeleted"
            @lead-created="handleLeadCreated"
            @lead-updated="handleLeadUpdated"
            @lead-status-updated="handleLeadStatusUpdated"
            @csv-uploaded="handleCsvUploaded"
            @excel-downloaded="handleStatusBarNotification"
            @pending-sale="handlePendingSale"
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
            :products="products"
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
            @product-added="handleProductAdded"
            @product-updated="handleStatusBarNotification"
        />

        <StatisticsParentComponent
            v-if="account.type != 'basic'"
            v-show="isVisibleStatistics"
            :identity="identity"
            :sellers="sellers"
            :products="productStats"
            :class="{ 'wide' : !isVisibleNotes }"
            @sale-dismissed="handleSaleDismissed"
            @change-period="handleChangePeriod"
        />

        <ClientsParentComponent
            v-show="isVisibleClients"
            :identity="identity"
            :class="{ 'wide' : !isVisibleNotes }"
            :settled="settled_invoices"
            :wallet="wallet"
            :totals="totals"
            :clients="clients"
            @invoice-payment="handleInvoicePayment"
            @client-data-updated="handleStatusBarNotification"
            @change-period="handleChangeWalletPeriod"
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
import IntroMessageComponent from './IntroMessageComponent.vue'
import NavbarParentComponent from '../NavbarModule/NavbarParentComponent.vue'
import NotesParentComponent from '../NotesModule/NotesParentComponent.vue'
import LeadsParentComponent from '../LeadsModule/LeadsParentComponent.vue'
import EmailParentComponent from '../EmailModule/EmailParentComponent.vue'
import AdminParentComponent from '../AdminModule/AdminParentComponent.vue'
import StatisticsParentComponent from '../StatisticsModule/StatisticsParentComponent.vue'
import ClientsParentComponent from '../ClientsModule/ClientsParentComponent.vue'
import StatusbarParentComponent from '../StatusbarModule/StatusbarParentComponent.vue'

export default {
    name: 'DashboardComponent',
    components: {
        NavbarParentComponent,
        NotesParentComponent,
        LeadsParentComponent,
        EmailParentComponent,
        AdminParentComponent,
        StatisticsParentComponent,
        ClientsParentComponent,
        StatusbarParentComponent,
        IntroMessageComponent,
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
        this.showIntroMessage();
        this.loadWallet();
        this.loadProducts();
        this.loadAccountData();
        this.loadStatistics();
        this.loadProductStats();
        this.loadClientsList();
        this.loadSettledInvoices();
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
            isVisibleStatistics: false,
            isVisibleClients: false,
            
            // Dashboard data
            reload: false,
            website_id: '',
            notes: [],
            leads: [],
            images: [],
            account: {},
            list_products: [],
            products: [],
            clients: [],
            // Datos para las estidisticas
            sellers: [], 
            wallet: [],
            totals: [],
            wallet_period: "day",
            productStats: [],
            settled_invoices: [],
            period: "day",
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
                        this.isVisibleStatistics = false;
                        this.isVisibleEmail = false;
                        this.isVisibleTeam = false;
                        this.isVisibleClients = false;
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
                        this.isVisibleStatistics = false;
                        this.isVisibleLeads = false;
                        this.isVisibleTeam = false;
                        this.isVisibleClients = false;
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
                        this.isVisibleStatistics = false;
                        this.isVisibleLeads = false;
                        this.isVisibleEmail = false;
                        this.isVisibleClients = false;
                    } else {
                        this.isVisibleTeam = false;
                    }
                    break;
                case 'statistics-desktop':
                    if (this.isVisibleStatistics == false) {
                        this.isVisibleStatistics = true;
                        this.isVisibleTeam = false;
                        this.isVisibleLeads = false;
                        this.isVisibleEmail = false;
                        this.isVisibleClients = false;
                    } else {
                        this.isVisibleStatistics = false;
                    }
                    break;
                case 'clients-desktop':
                    if (this.isVisibleClients == false) {
                        this.isVisibleClients = true;
                        this.isVisibleStatistics = false;
                        this.isVisibleTeam = false;
                        this.isVisibleLeads = false;
                        this.isVisibleEmail = false;
                    } else {
                        this.isVisibleClients = false;
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
                this.loadAccountData(),
                this.loadListProducts(),
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
        loadProducts: async function () {
            const response = await axios.get("api/product/list/"+this.identity.sub, {"withCredentials": true});
            if(response.data.status == "success"){
                this.products = response.data.products;
            }
        },
        loadListProducts: async function () {
            const response = await axios.get("api/product/listProducts/"+this.website_id, {"withCredentials": true});
            if(response.data.status == "success"){
                this.list_products = response.data.products;
            }else{
                this.list_products = [];
            }
        },
        loadAccountData: async function () {
            const response = await axios.get('api/account/accountDetails', {"withCredentials": true});
            if(response.data.status=="success"){
                this.account = response.data.account;
            }
        },
        loadWallet: async function () {
            try{
                const response = await axios.get('api/clients/records', {"withCredentials":true});
                if(response.data.status == "success"){
                    this.wallet = response.data.wallet;
                    this.totals = response.data.totals;
                }else{
                    this.wallet = [],
                    this.totals = []
                }
            }catch(e){
                console.log(e);
            }
            
        },
        loadSettledInvoices: async function () {
            try{
                const response = await axios.get('api/invoice/settled', {"withCredentials": true});
                if(response.data.status == "success"){
                    this.settled_invoices = response.data;
                }
            }catch(e){
                console.error(e);
            }
        },
        loadStatistics: async function () {
            const response = await axios.get("api/sale/sellerStats/"+this.period, {"withCredentials": true});
            if(response.data.status == "success"){
                this.sellers = response.data.sellers;
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
                this.account.actual_contacts = Number(this.account.actual_contacts) + Number(notification.records_added);
            }
            this.loadWebsiteLeads();
        },
        handleEmailsSent: function (qty) {
            this.account.sent_emails = Number(this.account.sent_emails) + qty;
        },
        handleLeadUpdated: function (lead, notification) {
            if (lead) {
                this.leads.forEach((item) => {
                    if (item.id === lead.id) {
                        item.name = lead.name;
                        item.email = lead.email;
                        item.phone = lead.phone;
                        item.status = lead.status;
                    }
                });
            }
            this.handleStatusBarNotification(notification);
        },
        handleLeadStatusUpdated: function (lead, notification) {
            if (lead) {
                console.log(lead);
                const foundLead = this.leads.find(item => item.id === lead.id);
                if (foundLead && lead.status) {
                    foundLead.status = lead.status;
                }
            }
            this.handleStatusBarNotification(notification);
            this.loadStatistics();
        },
        handleProductAdded: function (notification, product){
            this.products.push(product);
            this.loadListProducts();
            this.handleStatusBarNotification(notification);
        },
        handleSaleDismissed: function (notification) {
            this.handleStatusBarNotification(notification);
            this.loadStatistics();
            this.loadProductStats();
            this.loadClientsList();
            this.loadWallet();
        },
        handlePendingSale: function (notification){
            this.handleStatusBarNotification(notification);
        },
        handleChangePeriod: function (period) {
            this.period = period;
            this.loadStatistics();
            this.loadProductStats();
        },
        loadProductStats: async function () {
            const response = await axios.get("api/product/productStats/"+this.period+"/"+this.identity.sub, {"withCredentials": true});
            if(response.data.status == "success"){
                this.productStats = response.data.products;
            }
        },
        loadClientsList: async function () {
            try{
                const response = await axios.get("api/clients/list", {"withCredentials": true});
                if(response.data.status == "success"){
                    this.clients = response.data.clients;
                }else{
                    console.log(response.data.message);
                }
            }catch(e){
                console.log(e);
            }
        },
        handleChangeWalletPeriod: function (period){
            this.wallet_period = period;
        },
        handleInvoicePayment: function(notification){
            this.handleStatusBarNotification(notification);
            this.loadSettledInvoices();
            this.loadWallet();
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
