<template>
    <div class="modal-screen">
        <div class="container">
            <div class="container-head">
                <span>Enviar correos</span>
                <span class="close-cross" @click="closeModal()">&times;</span>
            </div>
            <div class="container-body">
                <!-- recipients list -->
                <div class="table-container">
                    <table>
                        <tbody>
                            <!-- recipient row component -->
                            <tr v-for="(recipient, index) in recipientsData" :key="recipient">
                                <td>{{ index + 1 }}</td>
                                <td>{{ recipient.address }}</td>
                                <td v-show="this.waiting">en espera</td>
                                <td v-show="this.sending">enviando...</td>
                                <td v-show="recipient.sentStatus === true" class="td-success">ENVIADO</td>
                                <td v-show="recipient.sentStatus === false" class="td-error">ERROR</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="container-footer">
                <button class="btn-warning" @click="send()">enviar</button>
                <button class="btn-primary" @click="closeModal()">cancelar</button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "@/lib/axios"
export default {
    name: 'SendingEmailsModalComponent',
    props: {
        recipients: {
            type: Array,
            required: true
        },
        emailContent: {
            type: String,
            required: true // BASE64
        }
    },
    watch: {
        recipients: {
            handler(newVal){
                this.recipientsData = newVal
            },
            immediate: true
        }
    },
    data() {
        return {
            recipientsData: [],
            waiting: true,
            sending: false,
        }
    },
    methods: {
        closeModal: function () {
            this.$emit('close-modal');
        },
        send: async function () {
            // console.log(this.emailContent);
            try {
                this.waiting = false;
                this.sending = true;
                const json = {
                    "recipients":this.recipientsData,
                    "body": atob(this.emailContent)
                }
                let formData = new FormData();
                formData.append('json', JSON.stringify(json));
                const response = await axios.post("api/email/sendCampaign", formData, {"withCredentials": true});
                
                if(response.data) {
                    this.sending = false;
                    response.data.forEach((item)=>{
                        this.recipientsData.forEach((contact)=>{
                            if(contact.address == item.recipient && item.status == "success"){
                                contact.sentStatus = true;
                            }else if(contact.address == item.recipient && item.status == "error"){
                                contact.sentStatus = false;
                            }
                        });
                    });
                    this.waiting = true;
                }else {
                    console.log(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
}

</script>
<style scoped>

.container {
    background-color: var(--basic);
    box-shadow: 2px 2px 8px var(--shadows);
    border-radius: .5rem;
    width: 75%;
}

.container-head {
    background-color: var(--primary);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .5rem;
    color: var(--basic);
    border-top-left-radius: .5rem;
    border-top-right-radius: .5rem; 
}

.container-body {
    padding: 1rem 1rem;
    background-color: transparent;
}

.container-footer {        
    display: flex;
    justify-content: center;
    padding-bottom: 1rem;
}

button {
    width: 25%;
    margin-right: 1rem;
}

.table-container {
    background-color: var(--shadows);
    padding: .5rem;
    border-radius: 4px;
    color: var(--accent);
    overflow-y: scroll;
    height: 40vh;
}

table {
    width: 100%;
    border-collapse: collapse;
}

tbody tr td{
    padding: .5rem;
    border-bottom: 1px solid var(--accent);
}

.td-success {
    color: yellowgreen;
}

.td-error {
    color: var(--warn);
}

@media only screen and (min-width: 1024px){
    .container {
        background-color: var(--basic);
        width: 500px;
    }
    .container-head {
        background-color: var(--primary);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: .5rem;
        color: var(--basic);
    }

    .container-body {
        padding: 1rem 1rem;
        background-color: transparent;
    }

    .container-footer {        
        display: flex;
    }
}

</style>