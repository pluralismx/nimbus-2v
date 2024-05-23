<template>
    <section>
        <!-- Title bar-->
        <AdminPanelTitleBarComponent 
            @show-notification-modal="toggleNotificationsModal"
            :hasNotifications="hasNotifications"
        />

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
                />
            </div>
            <ModalNotificationsComponent 
                v-show="isVisibleNotificationsModal"
                @close-notification-modal="toggleNotificationsModal"
                @friendrequest-answered="handleFriendRequestAnswered"
                :friendRequests="friendRequests"
            />
        </div>
    </section>
</template>
<script>
import axios from '@/lib/axios'
import AdminPanelTitleBarComponent from './AdminPanelTitleBarComponent.vue'
import ModalNotificationsComponent from './FriendsComponent/ModalNotificationsComponent.vue'
import WebsiteManagerComponent from './WebsiteComponent/WebsiteManager.vue';
import FriendManagerComponent from './FriendsComponent/FriendManager.vue';


export default {
    name: 'AdminParentComponent',
    components: {
        AdminPanelTitleBarComponent,
        ModalNotificationsComponent,
        WebsiteManagerComponent,
        FriendManagerComponent,
    },
    data() {
        return {
            isVisibleNotificationsModal: false,
            friendRequests: [],
            friendRequestAnswer: null,
            friends: '',
            hasNotifications: false
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
        handleFriendRequestAnswered: function () {
            this.toggleNotificationsModal();
            this.loadNotifications();
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
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-y: scroll;
    }

    .settings-container {
        margin-bottom: 2rem;
        box-shadow: 2px 2px 6px var(--shadows);
        border-radius: .5rem;
        display: flex;
        flex-direction: column;
        height: 50vh;
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
            flex-grow: 1;
            min-height: 0;
            margin-top: 0;
            margin-left: 1rem;
            margin-bottom: 1rem;
            margin-right: 1rem;
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