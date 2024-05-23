<template>
    
    <div class="modal-screen">

        <div class="modal-container">

            <!-- Header -->
            <div class="modal-header">
                <span>Añadir colaborador</span>
                <span class="close-cross" @click="closeModal">&times;</span>
            </div>

            <!-- Body -->
            <div class="modal-body">
                <div class="input-block">
                    <input v-model="email" class="input-primary" type="text" placeholder="juan@ejemplo.com">
                    <button @click="searchContact()" class="btn-primary"><img src="../../../assets/images/white-magnifier.png"/></button>
                </div>

                <!-- Contact card -->
                <div v-if="result" @click="selectContact()" class="contact-card" :class="{'selected': selection}">
                    <div class="contact-card-body">
                        <!-- Picture -->
                        <div class="contact-card-avatar">
                            <img src="../../../assets/images/white-manager.png"/>
                        </div>
                        <!-- Info -->
                        <div class="contact-card-info">
                            <p>{{ result.name }}&nbsp;{{ result.surname }}</p>
                        </div>
                    </div>
                </div>

                <!-- Default -->
                <div v-if="!result" class="contact-card-default">
                    <div class="contact-card-body">
                        <!-- Picture -->
                        <div class="contact-card-avatar">
                            <img src="../../../assets/images/white-manager.png"/>
                        </div>
                        <!-- Info -->
                        <div class="contact-card-info">
                            <p>No hay resultados</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Buttons -->
            <div class="modal-footer">
                <div class="buttons-block">
                    <button class="btn-warning" @click="sendInvitation()">invitar</button>
                    <button class="btn-primary" @click="closeModal()">cancel</button>
                </div>
            </div>
            
        </div>

    </div>

</template>

<script>
import axios from '@/lib/axios'
export default {
    name: 'ModalAddFriendComponent',
    data(){
        return {
            'email': null,
            'result': '',
            'selection': ''
        }
    },
    methods: {
        closeModal: function (){
            this.$emit('close-modal');
        },
        searchContact: function () {
            let email = this.email;
            let formData = new FormData();
            const data = {
                'email':email
            }
            let json = JSON.stringify(data);
            formData.append('json', json);
            axios.post('api/users/search', formData, { "withCredentials": true })
                .then(res=>{
                    if(res.data.status == 'success'){
                        this.result = res.data.user;
                    }else {
                        this.result = '';
                    }
                })
                .catch(error=>{
                    console.log(error);
                });
        },
        selectContact: function () {
            if(this.selection == ''){
                this.selection = this.result.id;
            }else {
                this.selection = ''
            }
        },
        sendInvitation: function () {

            let string = localStorage.getItem('identity');
            let object = JSON.parse(string);
            let sender = object.sub;
            const data = {
                'sender': sender,
                'receiver': this.selection
            }
            let json = JSON.stringify(data);
            let formData = new FormData();
            formData.append('json', json);
            
            axios.post('api/friendrequest/send', formData, {"withCredentials":true})
                .then(res=>{
                    if(res.data.status == 'success'){
                        this.closeModal();
                    }else{
                        console.log(res.data);
                    }
                })
                .catch(error=>{
                    console.log(error);
                })


        }
    }
}
</script>

<style scoped>

    .modal-container {
        width: 75%;
        border-radius: .5rem;
        background-color: var(--basic);
        box-shadow: 2px 2px 16px var(--shadows);
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
        padding: .5rem;
        background-color: var(--basic);
    }

    .input-block {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 1rem 0;
    }

    .input-block input {
        width: 80%;
    }

    .input-block button {
        width: 20%;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }

    .input-block button img{
        width: 40%;
    }

    /* Contact card */

    .contact-card-default {
        background-color: var(--primary);
        border-radius: .5rem;
        box-shadow: 2px 2px 5px var(--shadows);
        margin-bottom: 1rem;
    }

    .contact-card {
        background-color: var(--primary);
        border-radius: .5rem;
        box-shadow: 2px 2px 5px var(--shadows);
        margin-bottom: 1rem;
    }

    .selected {
        background-color: var(--warn);
        color: white;
    }

    .contact-card-body {
        padding: .5rem;
        display: flex;

    }

    .contact-card-avatar {
        width: 20%;
    }
    .contact-card-avatar img {
        width: 100%
    }

    .contact-card-info {
        padding-left: .5rem;
        color: var(--basic);
        display: flex;
        align-items: center;
    }

    /* Footer */

    .modal-footer {
        padding-top: 0;
        padding-left: .5rem;
        padding-bottom: .5rem;
        padding-right: .5rem;
        border-bottom-left-radius: .5rem;
        border-bottom-right-radius: .5rem;
        background-color: var(--basic);
    }

    .buttons-block {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
    }

    .buttons-block button {
        width: 100px;
    }

    @media only screen and (min-width: 1024px) {
        .contact-card:hover {
            cursor: pointer;
            background-color: var(--warn);
        }
        .modal-container {
            width: 350px;
            border-radius: .5rem;
            background-color: var(--basic);
        }

        .input-block button img{
            width: 14px;
        }

        .contact-card-avatar img {
            width: 50px;
        }
    }

</style>