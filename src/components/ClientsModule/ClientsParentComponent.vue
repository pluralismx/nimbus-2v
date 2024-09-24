<template>
    <section>
        <WalletComponent
            :wallet="wallet"
        />
    </section>
</template>
<script>
import axios from '@/lib/axios'
import WalletComponent from "./WalletComponent.vue"
export default {
    name: "ClientsParentComponent",
    components: {
        WalletComponent
    },
    props: {
        indentity: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            wallet: []
        }
    },
    created(){
        this.loadWallet();
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