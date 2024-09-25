<template>
    <section>
        <WalletComponent
            :wallet="wallet"
            @invoice-payment="handleInvoicePayment"
        />
        <ClientsListComponent
            :clients="clients"
            @edit-client="handleEditClient"
        />

        <!-- Modals -->
        <ModalUpdateClientComponent
            v-show="isVisibleEditClientModal"
            :client="clientToEdit"
            @close-modal="toggleEditModal"
        />
    </section>
</template>
<script>

import axios from '@/lib/axios'
import WalletComponent from "./WalletComponent.vue"
import ClientsListComponent from "./ClientsListComponent.vue"
import ModalUpdateClientComponent from "./ModalUpdateClientComponent.vue"

export default {
    name: "ClientsParentComponent",
    components: {
        WalletComponent,
        ClientsListComponent,
        ModalUpdateClientComponent
    },
    props: {
        indentity: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            wallet: [],
            clients: [],
            isVisibleEditClientModal: false,
            clientToEdit: {}
        }
    },
    created(){
        this.loadWallet();
        this.loadClientsList();
    },
    methods: {
        loadWallet: async function () {
            try{
                const response = await axios.get('api/clients/records', {"withCredentials":true});
                if(response.data.status == "success"){
                    this.wallet = response.data.wallet;
                }else{
                    console.log(response.data.message);
                }
            }catch(e){
                console.log(e);
            }
        },
        handleInvoicePayment: function (notification) {
            this.$emit('invoice-payment', notification);
            this.loadWallet();
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
        handleEditClient: function (client) {
            this.clientToEdit = client;
            this.toggleEditModal();
        },
        toggleEditModal: function () {
            if(this.isVisibleEditClientModal==false){
                this.isVisibleEditClientModal=true;
            }else{
                this.isVisibleEditClientModal=false;
            }
        }
    }
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

@media only screen and (min-width: 1024px) {
    section {
        grid-column: 2/3;
        grid-row: 2/3;
        align-items: flex-start;
    }

    .wide {
        grid-column: 1/3;
        grid-row: 2/3;
    }
}
</style>