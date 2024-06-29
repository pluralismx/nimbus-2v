<template>
    <div class="modal-screen">

        <div class="modal-container">

            <!-- Header -->
            <div class="modal-header">
                <span>Bandeja de entrada</span>
                <span class="close-cross" @click="closeModal">&times;</span>
            </div>

            <!-- Body -->
            <div class="modal-body">

                <!-- Contact card -->
                <div v-for="request in friendRequests" :key="request.id" class="contact-card">
                    <div class="contact-card-body">
                        <!-- Picture -->
                        <div class="contact-card-avatar">
                            <img src="../../../assets/images/white-team.png"/>
                        </div>
                        <!-- Info -->
                        <div class="contact-card-info">
                            <p><span class="sender">{{ request.name }} {{ request.surname }}</span><br/>te invito a unirte a su equipo</p>
                            <div class="buttons-block">
                                <button class="btn-basic" @click="answerFriendRequest('rejected', request.id, request.contact_id)">rechazar</button>
                                <button class="btn-warning" @click="answerFriendRequest('accepted', request.id, request.contact_id)">aceptar</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-show="friendRequests==''" class="contact-card">
                    <div class="contact-card-body basic">
                        <span class="empty-inbox">No tienes solicitudes por el momento</span>
                    </div>
                </div>
                
            </div>
        </div>
    </div>


</template>
<script>
import axios from '@/lib/axios'
export default {
    name: 'ModalNotificationsComponent',
    props: {
        friendRequests: {
            type: Array,
            required: true
        }
    },
    methods: {
        closeModal() {
            this.$emit("close-notification-modal");
        },
        answerFriendRequest: async function (answer, id, contact_id) {
            console.log(answer);
            try{
                let identity = localStorage.getItem('identity');
                let credentials = JSON.parse(identity);
                let user_id = credentials.sub;
                let formData = new FormData();
                const json = {
                    "request_id":id,
                    "status":answer,
                    "user_id":user_id,
                    "contact_id": contact_id
                }
                formData.append('json', JSON.stringify(json));
                const response = await axios.post('api/friendrequest/answer', formData, {"withCredentials": true});
                
                if(response.data.status == "success"){
                    this.$emit("friendrequest-answered");
                }
            }catch(error){
                console.log(error);
            }
        },
        
    }
}
</script>
<style scoped>
.modal-container {
    width: 75%;
    border-radius: .5rem;
    box-shadow: 4px 4px 16px rgba(0,0,0,0.6);
}

.modal-header {
    padding: .5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--primary);
    border-top-left-radius: .5rem;
    border-top-right-radius: .5rem;
    color: var(--basic);
}

.modal-body {
    padding: 1rem;
    background-color: var(--basic);
    border-bottom-left-radius: .5rem;
    border-bottom-right-radius: .5rem;
}

/* Contact card */
.contact-card {
    background-color: var(--primary);
    border-radius: .5rem;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.5);
    margin-bottom: 1rem;
}

.selected {
    background-color: var(--warn);
    color: white;
}

.contact-card-body {
    padding: .5rem;
    display: flex;
    border-radius: .5rem;

}

.basic {
    background-color: var(--basic);
    color: #aaa;
}

.empty-inbox {
    padding: 1rem;
    text-align: center
}

.contact-card-avatar {
    width: 20%;
    display: flex;
    align-items: center;
}
.contact-card-avatar img {
    width: 100%
}

.contact-card-info {
    padding-left: 1rem;
    color: var(--basic);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.contact-card-info p{
    font-size: 14px;
}

.sender {
    font-size: 18px;
}

.buttons-block {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    margin-top: .5rem;
}

.buttons-block button {
    width: 75px;
    margin-right: .5rem;
    padding: 4px
}

@media only screen and (min-width: 1024px) {
    .modal-container {
        width: 350px;
    }
}
</style>