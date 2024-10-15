<template>

    <div class="title-bar-container">
        <div class="title-container">
            <img src="../../../assets/images/seller.png" alt="">
            <h1>Desempeño de mis vendedores</h1>
        </div>
        
        <div class="range-selection-container">
            <label for="">Periodo:&nbsp;</label>
            <select class="compact" @change="changeStatsPeriod($event.target.value)">
                <option value="day">1 dia</option>
                <option value="week">1 semana</option>
                <option value="two-weeks">2 semanas</option>
                <option value="month">1 mes</option>
                <option value="quarter">3 meses</option>
                <option value="year">Anual</option>
            </select>
            <span>&nbsp;|&nbsp;</span>
            <span @click="downloadExcel()" class="span-excel">descargar XCEL</span>
        </div>
    </div>

    <table>
        <thead>
            <tr>
                <th>Vendedor</th>
                <th>Ventas completas</th>
                <th>Ventas pendientes</th>
                <th>Ventas incompletas</th>
                <th>Tasa de conversion</th>
                <th>Ingresos Generados</th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="sellers.length == 0">
                <td colspan="6" style="text-align: center;">No tienes vendedores</td>
            </tr>
            <SellerStatisticsRowComponent 
                v-for="seller in sellers" :key="seller.seller_id" :seller="seller"
                @show-aproval-modal="handleShowAprovalModal"
            />
        </tbody>
    </table>
</template>
<script>
import axios from "@/lib/axios"
import SellerStatisticsRowComponent from './SellerStatisticsRowComponent.vue'
export default {
    name: "SellerStatisticsComponent",
    components: {
        SellerStatisticsRowComponent
    },
    props: {
        sellers: {
            type: Array,
            required: true
        },
        period: {
            type: String,
            required: true
        }
    },
    methods: {
        handleShowAprovalModal: function (seller) {
            this.$emit('show-aproval-modal', seller);
        },
        downloadExcel: async function () {
            axios({
                url: 'api/sale/downloadStats/' + this.period,
                method: 'GET',
                responseType: 'blob',
                withCredentials: true
            })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'vendedores.xlsx');
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
        changeStatsPeriod: function (range) {
            this.$emit('change-period', range);
        }
    }
}
</script>
<style scoped>

    .title-container {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
    }

    .title-container img {
        width: 25px;
        margin-right: .5rem;
    }

    h1 {
        font-size: 1.5em;
    }

    .team-statistics-container {
        width: 100%;
        box-sizing: border-box;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        box-shadow: 1px 1px 2px rgba(0,0,0,0.5);
        margin-bottom: 4rem;
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
    td {
        padding: .5rem;
    }
</style>