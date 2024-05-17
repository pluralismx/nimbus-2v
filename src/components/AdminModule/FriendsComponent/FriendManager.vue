<template>
    <div class="settings-body">
        <FriendListComponent 
            :adminFriends="adminFriends"
            @invite-friend="toggleAddFriendModal"
        />
    </div>
    <ModalAddFriendComponent 
        v-show="isVisibleAddFriendModal"
        @close-modal="this.toggleAddFriendModal"
    />
</template>
<script>
import axios from '@/lib/axios';
import ModalAddFriendComponent from './ModalAddFriend.vue'
import FriendListComponent from './FriendList.vue';
export default {
    name: 'FriendManagerComponent',
    components: {
        FriendListComponent,
        ModalAddFriendComponent
    },
    created() {
        this.loadAdminFriends();
    },
    data () {
        return {
            // Layout
            isVisibleAddFriendModal: false,

            // Data
            adminFriends: [],
        }
    },
    methods: {
        loadAdminFriends: async function () {
            try {
                let identity = localStorage.getItem('identity');
                let credentials = JSON.parse(identity);
                let user_id = credentials.sub;

                const response = await axios.get('api/friends/myfriends/' + user_id, { withCredentials: true });

                if (response.data.status === 'success') {
                    this.adminFriends = response.data.contacts;
                    this.$emit("friends-loaded", this.adminFriends);
                } else {
                    throw new Error('Failed to fetch friends. Response status: ' + response.data.status);
                }
            } catch (error) {
                console.error('Error fetching friends:', error);
                throw error;
            }
        },
        toggleAddFriendModal() {
            if(this.isVisibleAddFriendModal == false) {
                this.isVisibleAddFriendModal = true;
            }else {
                this.isVisibleAddFriendModal = false;
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
    }
}
</script>
<style>
.settings-body {
    display: flex;
    flex-direction: column;
    padding: 0 1rem;
    padding-bottom: 1rem;
    flex-grow: 1;
    min-height: 0;
}

@media only screen and (min-width: 1024px) {
    .settings-body {
        display: flex;
        flex-direction: column;
        padding: 0 1rem;
        padding-bottom: 1rem;
    }
    .website-list-container {
        height: 50%;
        display: flex;
        flex-direction: column;
    }
}
</style>