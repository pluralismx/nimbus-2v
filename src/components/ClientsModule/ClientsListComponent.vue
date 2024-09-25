<template>
    <div class="title-bar-container">
        <h1>Mis clientes</h1>
        <div class="range-selection-container">
            <span @click="downloadExcel()" class="span-excel">descargar XCEL</span>
        </div>
    </div>

    <table>
        <thead>
            <tr>
                <th width="25%">Nombre</th>
                <th width="25%">Teléfono</th>
                <th width="25%">E-mail</th>
                <th width="25%">Frecuencia de Compra</th>
            </tr>
        </thead>
        <tbody>
            <ClientsListRowComponent
                v-for="client in clientsData" :key="client.id" :client="client" 
                @edit-client="handleEditClient"
            />
        </tbody>
    </table>
</template>
<script>
import axios from '@/lib/axios'
import ClientsListRowComponent from './ClientsListRowComponent.vue';
export default {
name: "ClientsListComponent",
components: {
    ClientsListRowComponent
},
props: {
    wallet: {
        type: Array,
        required: true
    },
    clients: {
        type: Array,
        required: true
    }
},
watch: {
    clients: {
        handler(newVal){
            this.clientsData = newVal;   
        },
        immediate: true,
        deep: true
    }
},
data() {
    return {
        isVisibleInvoiceModal: false,
        invoiceEdit: {},
        clientsData: []
    }
},
methods: {
    downloadExcel: async function () {
        axios({
            url: 'api/clients/downloadWallet',
            method: 'GET',
            responseType: 'blob',
            withCredentials: true
        })
        .then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'cuentas_por_cobrar.xlsx');
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
    handleEditClient: function (client) {
        this.$emit('edit-client', client);
    }

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

table {
    width: 50%;
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
</style>