<template>
    <section>

        <SellerStatisticsComponent
            :sellers="sellers"
            @show-aproval-modal="toggleModalSaleAproval"
            @change-period="handleChangePeriod"
        />

        <ProductStatisticsComponent 
            :productStats="products"
            @change-period="handleChangePeriod"
        />

        <!-- Modals -->
        <ModalSaleAprovalComponent
            v-if="isVisibleModalSaleAproval"
            :seller="seller"
            @close-modal="toggleModalSaleAproval"
            @sale-dismissed="handleSaleDisimissed"
        />
    </section>
</template>
<script>
import SellerStatisticsComponent from "./SellerStatistics/SellerStatisticsComponent.vue"
import ModalSaleAprovalComponent from "./SellerStatistics/ModalSaleAprovalComponent.vue"
import ProductStatisticsComponent from './ProductStatistics/ProductStatisticsComponent.vue'
export default {
    name: "StatisticsParentComponent",
    components: {
        SellerStatisticsComponent,
        ModalSaleAprovalComponent,
        ProductStatisticsComponent
    },
    props: {
        identity: {
            type: Object,
            required: true
        },
        sellers: {
            type: Array,
            required: true
        },
        products: {
            type: Array,
            required: true
        }
    },
    data(){
        return {
            isVisibleModalSaleAproval: false,
            seller: '',
        }
    },
    methods: {
        toggleModalSaleAproval: function (seller) {
            if(this.isVisibleModalSaleAproval==false){
                this.isVisibleModalSaleAproval=true;
                this.seller = seller;
            }else{
                this.isVisibleModalSaleAproval=false;
                this.seller = '';
            }
        },
        handleSaleDisimissed: function (notification) {
            this.$emit('sale-dismissed', notification);
        },
        handleChangePeriod: function (range) {
            this.$emit("change-period", range);
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