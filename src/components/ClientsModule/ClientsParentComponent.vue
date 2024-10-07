<template>
    <section>
        <WalletComponent
            v-if="isVisibleWallet"
            :wallet="walletData"
            :totals="totals"
            @invoice-payment="handleInvoicePayment"
            @switch-wallet="handleSwitchWallet"
        />

        <SettledAccountsComponent
            v-if="!isVisibleWallet"
            :settled="settled"
            @switch-wallet="handleSwitchWallet"
        />

        <div>
            <ClientsListComponent
                :clients="clients"
                @edit-client="handleEditClient"
            />
        </div>

        <!-- Modals -->
        <ModalUpdateClientComponent
            v-show="isVisibleEditClientModal"
            :client="clientToEdit"
            @close-modal="toggleEditModal"
            @client-data-updated="handleClientDataUpdated"
        />
    </section>
</template>
<script>

import WalletComponent from "./WalletComponent.vue"
import ClientsListComponent from "./ClientsListComponent.vue"
import ModalUpdateClientComponent from "./ModalUpdateClientComponent.vue"
import SettledAccountsComponent from "./SettledAccountsComponent.vue"

export default {
    name: "ClientsParentComponent",
    components: {
        WalletComponent,
        ClientsListComponent,
        ModalUpdateClientComponent,
        SettledAccountsComponent
    },
    props: {
        indentity: {
            type: Object,
            required: true
        },
        wallet: {
            type: Array,
            required: true
        },
        totals: {
            type: Object,
            required: true
        },
        clients: {
            type: Array,
            required: true
        },
        settled: {
            type: Array,
            required: true
        },
    },
    watch: {
        clients: {
            handler(newVal){
                this.clientsData = newVal;
            },
            immediate: true,
        },
        wallet: {
            handler(newVal){
                this.walletData = newVal;
            },
            immediate: true,
            deep: true
        }
    },
    data() {
        return {
            clientsData: [],
            walletData: [],
            isVisibleEditClientModal: false,
            clientToEdit: {},
            isVisibleWallet: true
        }
    },
    methods: {
        handleInvoicePayment: function (notification) {
            this.$emit('invoice-payment', notification);
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
        },
        handleClientDataUpdated: function (notification, client) {
            if (client) {
                let item = this.clientsData.find(c => c.id == client.id);
                if (item) {
                    item.name = client.name;
                    item.phone = client.phone;
                    item.email = client.email;
                    item.notes = client.notes;
                }
            }
            this.$emit("client-data-updated", notification);
        },
        handleSwitchWallet: function () {
            if(this.isVisibleWallet==true){
                this.isVisibleWallet=false;
            }else{
                this.isVisibleWallet=true;
            }
        },

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