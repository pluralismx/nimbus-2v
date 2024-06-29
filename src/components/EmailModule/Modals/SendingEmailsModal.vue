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
            <span class="span-error" v-show="error">{{ error }}</span>
            <div class="container-footer">
                <button class="btn-warning" @click="send()">enviar</button>
                <button class="btn-primary" @click="closeModal()">{{ this.buttonText }}</button>
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
        },
        website: {
            type: Number,
            required: true
        },
        subject: {
            type: String,
            required: true
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
            error: false,
            buttonText: 'cancelar'
        }
    },
    methods: {
        closeModal: function () {
            this.error=false;
            this.$emit('close-modal');
            this.buttonText = "cancelar";
        },
        send: async function () {
            
            try {
                this.waiting = false;
                this.sending = true;
                const json = {
                    "subject":this.subject,
                    "recipients":this.recipientsData,
                    "body": atob(this.emailContent),
                    "website": this.website
                }

                console.log(json);
                let formData = new FormData();
                formData.append('json', JSON.stringify(json));
                const response = await axios.post("api/email/sendCampaign", formData, {"withCredentials": true});
                
                if(response.data.status =="success") {
                    this.buttonText = "aceptar";
                    this.sending = false;
                    this.$emit('emails-sent', response.data.emails_sent);
                    response.data.delivery.forEach((item)=>{
                        this.recipientsData.forEach((contact)=>{
                            if(contact.address == item.recipient && item.status == "success"){
                                contact.sentStatus = true;
                            }else if(contact.address == item.recipient && item.status == "error"){
                                contact.sentStatus = false;
                            }
                        });
                    });
                }else if(response.data.message == 'Email account not found'){
                    this.error = "Cuenta de correo no configurada";
                    this.sending = false;
                    this.waiting = true;
                }else {
                    this.error = "No tienes correos suficientes";
                    this.sending = false;
                    this.waiting = true;
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
    box-shadow: 2px 2px 8px var(--shadows);
    border-radius: .5rem;
    width: 75%;
    position: relative;
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
    font-size: 8px;
}

.td-success {
    color: yellowgreen;
}

.td-error {
    color: var(--warn);
}

.span-error {
    position: absolute;
    font-size: 12px;
    left: 1rem;
    transform: translateY(-1rem);
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

    tbody tr td{
        font-size: 1rem;
    }

    .container-footer {        
        display: flex;
    }
}

</style>