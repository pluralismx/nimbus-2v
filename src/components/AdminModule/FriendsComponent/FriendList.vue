<template>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Integrante</th>
                        <th>correo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <FriendListRowComponent 
                        v-for="friend in friends" :key="friend.id" :friend="friend"
                        @delete-friend="handleDeleteFriend"
                    />
                </tbody>
            </table>
        </div>
        <div class="table-container-footer">
            <button class="btn-warning compact" @click="inviteFriend()">invitar</button>
        </div>
        <ModalConfirmationComponent 
            v-show="isVisibleConfirmationModal"
            @close-modal="toggleConfirmationModal"
            @answer="handleModalAnswer"
        />
</template>
<script>
import ModalConfirmationComponent from './ModalConfirmation.vue';
import FriendListRowComponent from './FriendListRow.vue';
import axios from '@/lib/axios';
export default {
    name: 'TeamTableComponent',
    components: {
        FriendListRowComponent,
        ModalConfirmationComponent
    },
    props: {
        adminFriends: {
            type: Array,
            required: true
        }
    },
    computed: {
        friendsComputed() {
            return this.adminFriends;
        }
    },
    watch: {
        friendsComputed: {
            handler(newVal){
                this.friends = newVal;
            },
            immediate: true,
            deep: true
        }
    },
    data() {
        return {
            // Data
            friends: [],
            selectedFriendId: '',
            
            // Layout
            isVisibleConfirmationModal: false
        }
    },
    methods: {
        handleDeleteFriend: function (friend_id) {
            this.selectedFriendId = friend_id;
            this.toggleConfirmationModal();
        },
        toggleConfirmationModal: function () {
            if(this.isVisibleConfirmationModal == false){
                this.isVisibleConfirmationModal = true;
            }else{
                this.isVisibleConfirmationModal = false;
            }
        },
        handleModalAnswer: function  (answer) {
            if(answer == true){
                this.deleteFriend();
                this.toggleConfirmationModal();
            }else{
                this.toggleConfirmationModal();
            }
        },
        deleteFriend:  async function () {
            
            try {
                let identity = localStorage.getItem('identity');
                let credentials = JSON.parse(identity);
                let user_id = credentials.sub;
                
                const json = {
                    'user_id': user_id,
                    'friend_id': this.selectedFriendId,
                }
                let formData = new FormData();

                formData.append('json', JSON.stringify(json));
                
                const response = await axios.post('api/friends/deleteFriend', formData, {"withCredentials": true});
                
                if(response.data.status == "success"){
                    console.log('user deleted successfully');
                }else{
                    console.log('error deleting user');
                }
            }catch(error){
                console.log(error);
            }
        },
        inviteFriend: function () {
            this.$emit('invite-friend');
        }
    }
}
</script>
<style scoped>

span {
    margin: .5rem 0;
}

.table-container {
    background-color: #999;
    border-top-left-radius: .5rem;
    border-top-right-radius: .5rem;
    padding: .5rem;
    box-sizing: border-box;
    flex-grow: 1;
    min-height: 0;
    overflow-y: hidden;
    margin-top: 1rem;
}
table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
}

thead {
    color: white;
    border-bottom: 1px solid var(--shadows);
}

thead tr th {
    text-align: left;
    padding: .5rem;
    width: 50%;
}

thead tr th:last-child{
    text-align: center;
}

.table-container-footer {
    background-color: var(--primary);
    padding: .5rem;
    border-bottom-left-radius: .5rem;
    border-bottom-right-radius: .5rem;
    display: flex;
    justify-content: flex-end;
}


@media only screen and (min-width: 1024px) {

}


</style>