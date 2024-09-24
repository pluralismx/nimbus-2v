<template>

    <div class="title-bar-container">
        <h1>Desempeño de mis productos</h1>
        <div class="range-selection-container">
            <span @click="downloadExcel()" class="span-excel">descargar XCEL</span>
        </div>
    </div>

    <table>
        <thead>
            <tr>
                <th>Producto</th>
                <th>Unidades Vendidas</th>
                <th>Ingresos Generados</th>
                <th>Porcentaje de Ingresos</th>
                <th>Porcentaje de Ventas</th>
            </tr>
        </thead>
        <tbody>
            <ProductStatisticsRowComponent 
                v-for="product in productStats" :key="product.id" :product="product"
            />
        </tbody>
    </table>
</template>
<script>
import axios from "@/lib/axios"
import ProductStatisticsRowComponent from './ProductStatisticsRowComponent.vue'
export default {
    name: "ProductStatisticsComponent",
    components: {
        ProductStatisticsRowComponent
    },
    props: {
        productStats: {
            type: Array,
            required: true
        },
        period: {
            type: String,
            required: true
        }
    },
    methods: {
        handleShowAprovalModal: function (saler) {
            this.$emit('show-aproval-modal', saler);
        },
        changeStatsPeriod: function (period) {
            this.$emit("change-stats-period", period);
        },
        downloadExcel: async function () {
            axios({
                url: 'api/product/downloadStats/'+this.period,
                method: 'GET',
                responseType: 'blob',
                withCredentials: true
            })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'productos.xlsx');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                this.$emit("excel-downloaded", {
                    "status": "success",
                    "text": "Excel descargado exitosamente"
                });
            })
            .catch(error => {
                console.error(error);
                this.$emit("excel-downloaded", {
                    "status": "error",
                    "text": "No se pudo descargar el archivo"
                });
            });
        },
    }
}
</script>
<style scoped>
    h1 {
        font-size: 1.5em;
        margin-bottom: 8px;
    }

    .team-statistics-container {
        width: 100%;
        box-sizing: border-box;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        box-shadow: 1px 1px 2px rgba(0,0,0,0.5);
    }

    thead tr {
        background-color: var(--primary);
        color: var(--shadows);
    }
    th {
        color: var(--basic);
        padding: .5rem;
    }

    tbody tr:nth-child(odd){
        background-color: var(--accent);
    }

    tbody tr:nth-child(even){
        background-color: var(--basic);
    }

    .title-bar-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid black;
        margin-bottom: 1.5rem;
    }

    .range-selection-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .range-selection-container select {
        width: 110px;
    }

    .span-excel:hover {
        cursor: pointer;
        color: var(--primary);
    }

</style>