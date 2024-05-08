<template>
    <section>
        <!-- Title bar-->
        <AdminPanelTitleBarComponent 
            @show-notification-modal="toggleNotificationsModal"
        />

        <div class="panel-container">
            <!-- Website manager -->
            <div class="settings-container">
                <!-- Header -->
                <div class="settings-header">
                    <span>Mis sitios</span>
                </div>
                <!-- Body -->
                <WebsiteTableComponent
                    @open-create-website-modal="toggleCreateWebsitemodal" 
                    :websites="ownersWebsites"
                    :contacts="contacts"
                />
            </div>

            <!-- My friends -->
            <div class="settings-container">
                <!-- Header -->
                <div class="settings-header">
                    <span>Mi equipo</span>
                </div>
                <!-- Body -->
                <TeamTableComponent 
                    :contacts="contacts"
                />
            </div>
        </div>

        <!-- Modals -->
        <CreateWebsiteModalComponent
            v-show="isVisibleCreateWebsiteModal"
            @cancel-create-website="toggleCreateWebsitemodal"
            @website-created="handleWebsiteCreated"
        />

        <AddTeammateModalComponent
            v-show="isVisibleAddTeammateModal" 
            @cancel-add-teammate="toggleInviteTeammateModal"
        />

        <NotificationsModalComponent 
            v-show="isVisibleNotificationsModal"
            :friendRequests="friendRequests"
            @close-notification-modal="toggleNotificationsModal"
            @friend-request-answered="handleFriendRequestAnswered"
        />
    </section>
</template>
<script>
import axios from '@/lib/axios'
import AdminPanelTitleBarComponent from './AdminPanelTitleBarComponent.vue'
import WebsiteTableComponent from './WebsiteTableComponent.vue'
import TeamTableComponent from './TeamTableComponent.vue'
// Modals
import CreateWebsiteModalComponent from './CreateWebsiteModal.vue'
import AddTeammateModalComponent from './AddTeammateModalComponent.vue'
import NotificationsModalComponent from './NotificationsModalComponent.vue'

export default {
    name: 'AdminParentComponent',
    components: {
        AdminPanelTitleBarComponent,
        TeamTableComponent,
        WebsiteTableComponent,
        CreateWebsiteModalComponent,
        AddTeammateModalComponent,
        NotificationsModalComponent
    },
    data() {
        return {
            isVisibleCreateWebsiteModal: false,
            isVisibleAddTeammateModal: false,
            isVisibleNotificationsModal: false,
            ownersWebsites: '',
            friendRequests: '',
            friendRequestAnswer: null,
            contacts: ''
        }
    },
    mounted() {
        this.myFriends();
        this.myWebsites();
    },
    methods: {
        toggleCreateWebsitemodal() {
            if(this.isVisibleCreateWebsiteModal == false) {
                this.isVisibleCreateWebsiteModal = true;
            }else {
                this.isVisibleCreateWebsiteModal = false;
            }
        },
        toggleInviteTeammateModal() {
            if(this.isVisibleAddTeammateModal == false) {
                this.isVisibleAddTeammateModal = true;
            }else {
                this.isVisibleAddTeammateModal = false;
            }
        },
        loadFriendRequests() {
            let identity = localStorage.getItem('identity');
            let credentials = JSON.parse(identity);
            let id = credentials.sub;

            axios.get('api/friendrequest/get/'+id, { "withCredentials": true })
                .then(res => {
                    if(res.data.status == 'success'){
                        this.friendRequests = res.data.friendRequests;
                        console.log(this.friendRequests);
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        },
        loadOwnersWebsites: async function () {
            try{
                let identity = localStorage.getItem('identity');
                let credentials = JSON.parse(identity);
                let id = credentials.sub;
                let formData = new FormData();
                const json = {
                    'id_user': id
                };
                formData.append('json', JSON.stringify(json))
                const response = await axios.post('api/website/adminWebsites', formData, { "withCredentials": true });
                if(response.data.status == "success") {
                    return response.data.websites;
                } else {
                    throw new Error('Failed to fetch friends. Response status: ' + response.data.status);
                }
            }catch(error) {
                console.error('Error fetching friends:', error);
                throw error;
            }
        },
        myWebsites: async function () {
            try {
                this.ownersWebsites = await this.loadOwnersWebsites();
                return true;
            } catch (error) {
                console.error('Error loading websites:', error);
            }
        },
        loadFriends: async function () {
            try {
                // Retrieve user identity from localStorage
                let identity = localStorage.getItem('identity');
                let credentials = JSON.parse(identity);
                let user_id = credentials.sub;

                // Make an Axios GET request to fetch friends
                const response = await axios.get('api/friends/myfriends/' + user_id, { withCredentials: true });

                // Check if the response status is success
                if (response.data.status === 'success') {
                    // Resolve the promise with the contacts data
                    return response.data.contacts;
                } else {
                    // If the response status is not success, handle the error
                    throw new Error('Failed to fetch friends. Response status: ' + response.data.status);
                }
            } catch (error) {
                // Catch any errors that occurred during the Axios request
                console.error('Error fetching friends:', error);
                throw error; // Rethrow the error to propagate it further
            }
        },
        myFriends: async function () {
            try {
                // Call loadFriends function to retrieve contacts
                this.contacts = await this.loadFriends();
            } catch (error) {
                // Handle any errors that occurred during the retrieval of contacts
                console.error('Error loading friends:', error);
            }
        },
        handleWebsiteCreated: async function () {
            const create_website = await this.myWebsites();
            if(create_website){
                this.toggleCreateWebsitemodal();
                alert('sitio creado');
            }else{
                this.toggleCreateWebsitemodal();
                alert('error');
            }
        },
        toggleNotificationsModal() {
            if(this.isVisibleNotificationsModal == false) {
                this.isVisibleNotificationsModal = true;
            }else {
                this.isVisibleNotificationsModal = false;
            }
        },
        handleFriendRequestAnswered(answer, id, contact_id){
            
            let identity = localStorage.getItem('identity');
            let credentials = JSON.parse(identity);
            let user_id = credentials.sub;
            
            const data = {
                "request_id":id,
                "status":answer,
                "user_id": user_id,
                "contact_id": contact_id
            }

            let json = JSON.stringify(data);
            let formData = new FormData();
            formData.append('json', json);

            axios.post('api/friendrequest/answer', formData, { "withCredentials": true })
                .then(res => {
                    console.log(res.data);
                    this.isVisibleNotificationsModal = false;

                })
                .catch(error => {
                    console.log(error);
                })  
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