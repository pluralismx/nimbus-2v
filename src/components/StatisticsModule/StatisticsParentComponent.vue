<template>
    <section>

        <SalerStatisticsComponent
            :teamData="teamData"
            :period="period"
            @show-aproval-modal="toggleModalSaleAproval"
            @change-period="handleChangePeriod"
        />

        <ProductStatisticsComponent 
            :productStats="productStats"
            :period="period"
            @change-period="handleChangePeriod"
        />

        <!-- Modals -->
        <ModalSaleAprovalComponent
            v-if="isVisibleModalSaleAproval"
            :saler="saler"
            @close-modal="toggleModalSaleAproval"
            @sale-dismissed="handleSaleDisimissed"
        />
    </section>
</template>
<script>
import axios from "@/lib/axios"
import SalerStatisticsComponent from "./SalerStatistics/SalerStatisticsComponent.vue"
import ModalSaleAprovalComponent from "./SalerStatistics/ModalSaleAprovalComponent.vue"
import ProductStatisticsComponent from './ProductStatistics/ProductStatisticsComponent.vue'
export default {
    name: "StatisticsParentComponent",
    components: {
        SalerStatisticsComponent,
        ModalSaleAprovalComponent,
        ProductStatisticsComponent
    },
    props: {
        identity: {
            type: Object,
            required: true
        },
    },
    mounted(){
        if(this.identity.account != 'basic'){
            this.loadStatistics();
            this.loadProductStats();
        }
    },
    data(){
        return {
            teamData: [],
            isVisibleModalSaleAproval: false,
            saler: '',
            productStats: [],
            period: "day"
        }
    },
    methods: {
        loadStatistics: async function () {
            const response = await axios.get("api/sale/salerStats/"+this.period, {"withCredentials": true});
            if(response.data.status == "success"){
                this.teamData = response.data.salers;
                console.log(this.teamData);
            }
        },
        loadProductStats: async function () {
            const response = await axios.get("api/product/productStats/"+this.period+"/"+this.identity.sub, {"withCredentials": true});
            if(response.data.status == "success"){
                this.productStats = response.data.products;
            }
        },
        toggleModalSaleAproval: function (saler) {
            if(this.isVisibleModalSaleAproval==false){
                this.isVisibleModalSaleAproval=true;
                this.saler = saler;
            }else{
                this.isVisibleModalSaleAproval=false;
                this.saler = '';
            }
        },
        handleSaleDisimissed: function (notification) {
            if(notification.status == "success"){
                this.loadStatistics();
                this.loadProductStats();
            }
            this.$emit('sale-dismissed', notification);
        },
        handleChangePeriod: function (range) {
            console.log(range);
            this.period = range;
            this.loadStatistics();
            this.loadProductStats();
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