<template>
    <section>
        <!-- Admin Title bar-->
        <AdminPanelTitleBarComponent 
            @show-notification-modal="toggleNotificationsModal"
            :hasNotifications="hasNotifications"
        />

        <!-- Friend & Website Manager -->
        <div class="panel-container">
            <!-- Website manager -->
            <div class="settings-container">
                <!-- Header -->
                <div class="settings-header">
                    <span>Mis sitios</span>
                </div>
                <!-- Body -->
                <WebsiteManagerComponent
                    :friends="friends"
                    @teammate-role-updated="handleTeammateRoleUpdated"
                    @teammate-deleted="handleTeammateDeleted"
                    @teammate-added="handleTeammateAdded"
                    @website-deleted="handleWebsiteDeleted"
                    @website-created="handleWebsiteCreated"
                    @website-updated="handleWebsiteUpdated"
                />
            </div>

            <!-- My friends -->
            <div class="settings-container">
                <!-- Header -->
                <div class="settings-header">
                    <span>Mis colaboradores</span>
                </div>
                <!-- Body -->
                <FriendManagerComponent
                    @friends-loaded="handleFriendsLoaded"
                    @friend-deleted="handleFriendDeleted"
                    @friend-request-sent="handleFriendRequestSent"
                />
            </div>

            <ModalNotificationsComponent 
                v-show="isVisibleNotificationsModal"
                @close-notification-modal="toggleNotificationsModal"
                @friendrequest-answered="handleFriendRequestAnswered"
                :friendRequests="friendRequests"
            />
        </div>

        <!-- Account Title bar -->
        <AccountPanelTitleBarComponent
            :type="account.type"
            @toggle-components="handleToggleComponents"
        />

        <!-- Plan builder -->
        <div v-show="isVisibleSubscribeSection" class="panel-container">
            <div v-if="this.account.type != 'standard'" class="settings-container">  
                <PlanBuilderComponent
                    :account="account"
                    @selection-made="handleSelectionMade"
                    @cant-add-feature="handleCantAddFeature"
                />
            </div>
            <div v-show="selection != ''" class="settings-container">
                <SubscriptionPreviewComponent
                    :selection="selection"
                    @open-card-information-modal="handleToggleProcessPaymentModal"
                />
            </div>
        </div>

        <!-- My account -->
        <div v-show="isVisiblePaymentSection" class="panel-container">
            <div class="settings-container">  
                <AccountSummaryComponent
                    :account="account"
                    @selection-made="handleSelectionMade"
                />
            </div>
        </div>

        <!-- Upgrades -->
        <div v-show="isVisibleUpgradeSection" class="panel-container">
            <div class="settings-container">  
                <AccountUpgradesComponent
                    :account="account"
                    @selection-made="handleSelectionMade"
                    @cant-add-feature="handleCantAddFeature"
                />
            </div>
            <div class="settings-container">
                <UpgradesPreviewComponent
                    :selection="selection"
                    :clear="clearUpgradePreview"
                    :account="account"
                    @upgrades-selected="handleUpgradesSelected"
                />
            </div>
        </div>

        <!-- Modals -->
        <ProcessPaymentModalComponent
            :selection="selection"
            v-show="isVisibleProcessPaymentModal"
            @close-proccess-payment-modal="handleToggleProcessPaymentModal"
            @reload-account="handleReloadAccount"
        />
    </section>
</template>
<script>
import axios from '@/lib/axios'
import AdminPanelTitleBarComponent from './AdminPanelTitleBarComponent.vue'
import ModalNotificationsComponent from './FriendsComponent/ModalNotificationsComponent.vue'
import WebsiteManagerComponent from './WebsiteComponent/WebsiteManager.vue';
import AccountPanelTitleBarComponent from './AccountTitleBarComponent.vue';
import PlanBuilderComponent from './SubscribeComponent/PlanBuilderComponent.vue';
import SubscriptionPreviewComponent from './SubscribeComponent/SubscriptionPreviewComponent.vue';
import FriendManagerComponent from './FriendsComponent/FriendManager.vue';
import ProcessPaymentModalComponent from './SubscribeComponent/ProcessPaymentModalComponent.vue';

import AccountSummaryComponent from './MyAccountComponent/AccountSummaryComponent.vue';
import AccountUpgradesComponent from './UpgradeAccountComponent/AccountUpgradesComponent.vue';
import UpgradesPreviewComponent from './UpgradeAccountComponent/UpgradesPreviewComponent';


export default {
    name: 'AdminParentComponent',
    components: {
        AdminPanelTitleBarComponent,
        ModalNotificationsComponent,
        WebsiteManagerComponent,
        FriendManagerComponent,
        AccountPanelTitleBarComponent,
        PlanBuilderComponent,
        SubscriptionPreviewComponent,
        ProcessPaymentModalComponent,
        AccountSummaryComponent,
        AccountUpgradesComponent,
        UpgradesPreviewComponent
    },
    props: {
        account: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            isVisibleNotificationsModal: false,
            friendRequests: [],
            friendRequestAnswer: null,
            friends: '',
            hasNotifications: false,
            selection: '',
            isVisibleProcessPaymentModal: false,
            isVisibleSubscribeSection: false,
            isVisiblePaymentSection: true,
            isVisibleUpgradeSection: false,
            clearUpgradePreview: false,
        }
    },
    created() {
        this.loadNotifications();
    },
    methods: {
        handleFriendsLoaded: function (friends) {
            this.friends = friends;
        },
        toggleNotificationsModal: function () {
            if(this.isVisibleNotificationsModal == false){
                this.isVisibleNotificationsModal = true;
            }else{
                this.isVisibleNotificationsModal = false;
            }
        },
        loadNotifications: async function () {
            let identity = localStorage.getItem('identity');
            let credentials = JSON.parse(identity);
            let user_id = credentials.sub;

            const response = await axios.get('api/friendrequest/get/'+user_id, {"withCredentials": true});
            if(response.data.status == 'success'){
                this.friendRequests = response.data.friendRequests;
                if(this.friendRequests.length > 0){
                    this.hasNotifications = true;
                }else {
                    this.hasNotifications = false;
                }
            }
        },

        // Friendship
        handleFriendRequestAnswered: function () {
            this.toggleNotificationsModal();
            this.loadNotifications();
        },
        handleTeammateRoleUpdated: function (notification) {
            this.$emit('teammate-role-updated', notification);
        },
        handleTeammateDeleted: function (notification) {
            this.$emit('teammate-deleted', notification);
        },
        handleTeammateAdded: function (notification) {
            this.$emit('teammate-added', notification);
        },
        handleFriendDeleted: function (notification) {
            this.$emit('friend-deleted', notification);
        },
        handleFriendRequestSent: function (notification){
            this.$emit('friend-request-sent', notification);
        },

        // Websites
        handleWebsiteDeleted: function (notification) {
            this.$emit('website-deleted', notification);
        },
        handleWebsiteUpdated: function (notification) {
            this.$emit('website-updated', notification);
        },
        handleWebsiteCreated: function (notification) {
            this.$emit('website-created', notification);
        },

        // Account
        handleSelectionMade: function (selection) {
            this.selection = selection;
            if(selection.type=="monthly_payment"){
                this.handleToggleProcessPaymentModal();
            }
            if(selection.type=="upgrade"){
                this.handleToggleProcessPaymentModal();
            }
        },
        handleCantAddFeature: function (notification) {
            this.$emit('cant-add-feature', notification);
        },
        handleToggleProcessPaymentModal: function () {
            if(this.isVisibleProcessPaymentModal == false){
                this.isVisibleProcessPaymentModal = true;
            }else{
                this.isVisibleProcessPaymentModal = false;
            }
        },
        handleToggleComponents: function (component) {
            switch(component) {
                case 'subscribe' : 
                    if(this.isVisibleSubscribeSection == false){
                        this.isVisibleSubscribeSection = true;
                        this.isVisiblePaymentSection = false;
                        this.isVisibleUpgradeSection = false;
                    }
                break;
                case 'payments' : 
                    if(this.isVisiblePaymentSection == false){
                        this.isVisibleSubscribeSection = false;
                        this.isVisiblePaymentSection = true;
                        this.isVisibleUpgradeSection = false;
                    }
                break;
                case 'upgrades' : 
                if(this.isVisibleUpgradeSection == false){
                        this.isVisibleSubscribeSection = false;
                        this.isVisiblePaymentSection = false;
                        this.isVisibleUpgradeSection = true;
                    }
                break;
            }
        },
        handleUpgradesSelected: function (data) {
            this.handleSelectionMade(data);
        },
        handleReloadAccount: function () {
            this.selection = '';
            this.isVisibleSubscribeSection = false;
            this.isVisiblePaymentSection = true;
            this.isVisibleUpgradeSection = false;
            this.clearUpgradePreview = true;
            console.log(this.clearUpgradePreview);
            this.$emit('reload-acount');
        }
    },

}
</script>
<style scoped>
    section {
        grid-column: 1/2;
        grid-row: 2/3;
        background-color: var(--basic);
        padding: 1rem;
        display: block;
        flex-direction: column;
        align-items: center;
        overflow-y: scroll;
    }

    .settings-container {
        margin-bottom: 2rem;
        box-shadow: 2px 2px 6px rgba(0,0,0,.5);
        border-radius: .5rem;
        display: flex;
        flex-direction: column;
        /* height: 50svh; */
    }

    .settings-header {
        background-color: var(--primary);
        color: var(--basic);
        padding: .5rem;
        border-top-left-radius: .5rem;
        border-top-right-radius: .5rem;
        
    }

    .settings-container-footer {
        display: flex;
        justify-content: center;
        padding-bottom: 1rem; 
    }

    .settings-container-footer button {
        width: 30%;
     }

    /* Desktop */

    @media only screen and (min-width: 1024px) {
        section {
            grid-column: 2/3;
            grid-row: 2/3;
            align-items: flex-start;
        }

        .panel-container {
            box-sizing: border-box;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 100%;
            column-gap: 2rem;
            /* flex-grow: 1;
            min-height: 0; */
            margin-top: 0;
            margin-left: 1rem;
            margin-bottom: 4rem;
            margin-right: 1rem;
            height: 71vh;
        }

        .settings-container {
            width: 100%;
            height: 100%;
        }

        .settings-container-footer button {
            width: 20%;
        }

        .wide {
            grid-column: 1/3;
            grid-row: 2/3;
        }
    }
</style>