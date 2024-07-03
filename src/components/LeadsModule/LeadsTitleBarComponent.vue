<template>
    <div class="main-container">
        <h1 id="title-desktop">Prospectos</h1>
        <h1 id="title-mobile" @click="showOptions">Prospectos</h1>
        <div class="title-bar-menu">
            <span @click="saveLead()">agregar</span>
            <span>&nbsp;|&nbsp;</span>
            <span @click="uploadCvs()">subir CSV</span>
            <span>&nbsp;|&nbsp;</span>
            <span @click="downloadXLSX()">bajar XLS</span>
        </div>
    </div>
</template>
<script>
import axios from "@/lib/axios"
export default {
    name: 'LeadsTitleBarComponent',
    props: {
        website: {
            type: Number,
            required: true
        }
    },
    methods: {
        saveLead: function (){
            this.$emit('save-lead');
        },
        uploadCvs: function () {
            this.$emit('show-upload-cvs');
        },
        downloadXLSX: async function () {
            axios({
                url: 'api/leads/export/' + this.website,
                method: 'GET',
                responseType: 'blob',
                withCredentials: true
            })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'leads.xlsx');
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
        showOptions: function () {
            this.$emit('show-options');
        }

    }
}
</script>
<style scoped>

    /* Mobile first */

    .main-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: .5rem;
        border-bottom: 1px solid var(--shadows);
        color: var(--shadows);
        margin-bottom: 1.5rem;
        width: 100%;
    }

    span:hover {
        cursor: pointer;
    }

    #title-mobile {
        display: block;
    }

    #title-desktop {
        display: none;
    }

    @media only screen and (min-width: 1024px) {
        #title-mobile {
            display: none;
        }

        #title-desktop {
            display: block;
        }
    }


</style>