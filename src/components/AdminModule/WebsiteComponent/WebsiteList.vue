<template>
    <div class="website-list-container">
        <span>Sitios que administro</span>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Sitio</th>
                        <th>URL</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <WebsiteListRowComponent 
                        v-for="website in adminWebsites" :key="website.id" :website="website"
                        @website-selected="handleWebsiteSelected"
                        @authorization-need="handleAuthorizationNeeded"
                        
                    />
                </tbody>
            </table>
        </div>
        <div class="table-container-footer">
            <button class="btn-warning compact" @click="toggleCreateWebsiteModal">crear</button>
        </div>

        <!-- Modals -->
        <ModalCreateWebsiteComponent 
            v-show="isVisibleCreateWebsiteModal"
            @close-modal="toggleCreateWebsiteModal"
            @website-created="handleWebsiteCreated"
        />

        <ModalConfirmationComponent
            v-show="isVisibleConfirmationModal"
            :message="modalMessage"
            @answer="handleConfirmationModalAnswer"
        />
    </div>
</template>
<script>
import axios from '@/lib/axios'
import WebsiteListRowComponent from './WebsiteListRow.vue'
import ModalCreateWebsiteComponent from './ModalCreateWebsite.vue'
import ModalConfirmationComponent from './ModalConfirmation.vue'

export default {
    name: 'WebsiteListComponent',
    components: {
        WebsiteListRowComponent,
        ModalCreateWebsiteComponent,
        ModalConfirmationComponent
    },
    created() {
        this.loadAdminWebsites();
    },
    data() {
        return {
            // Data
            adminWebsites: [],
            action: '',
            selectedWebsite: '',
            selectedWebsiteTeam: [],
            // Layout
            isVisibleCreateWebsiteModal: false,
            isVisibleConfirmationModal: false,
            modalMessage: ''
        }
    },
    methods: {
        loadAdminWebsites: async function () {
            try{
                let identity = localStorage.getItem('identity');
                let credentials = JSON.parse(identity);
                let id_user = credentials.sub;
                let formData = new FormData();
                const json = {
                    'id_user': id_user
                };
                formData.append('json', JSON.stringify(json))
                const response = await axios.post('api/website/adminWebsites', formData, { "withCredentials": true });
                if(response.data.status == "success") {
                    this.adminWebsites = response.data.websites;
                } else {
                    throw new Error('Failed to fetch websites. Response status: ' + response.data.status);
                }
            }catch(error) {
                console.error('Error fetching websites:', error);
                throw error;
            }
        },
        handleWebsiteSelected: async function (website) {
            this.$emit('website-selected', website);
        },
        toggleCreateWebsiteModal: function () {
            if(this.isVisibleCreateWebsiteModal == false){
                this.isVisibleCreateWebsiteModal = true;
            }else {
                this.isVisibleCreateWebsiteModal = false;
            }
        },
        handleAuthorizationNeeded: function (action, website) {
            this.action = action;
            if(action == "dump"){
                this.modalMessage = {
                    "title": "Vaciar prospectos",
                    "message": "Se descargarán los prospectos en una hoja de cálculo y se eliminarán de cuenta"
                }
            }else if(action == "delete-website"){
                this.modalMessage = {
                    "title": "Eliminar sitio",
                    "message": "Se eliminará el sitio web y toda la información relacionada"
                } 
            }else if(action == "update-website"){
                this.modalMessage = {
                    "title": "Actualizar sitio",
                    "message": "¿Seguro que desea continuar?"
                }  
            }
            this.selectedWebsite = website;
            this.toggleConfirmationModal();
        },
        toggleConfirmationModal: function () {
            if(this.isVisibleConfirmationModal == false){
                this.isVisibleConfirmationModal = true;
            }else {
                this.isVisibleConfirmationModal = false;
            }
        },


        // Websites CRUD
        handleWebsiteCreated: function (notification) {
            this.loadAdminWebsites();
            this.$emit('website-created', notification);
        },
        deleteWebsite: async function () {
            try {
                let formData = new FormData();
                const json = {
                    'id_website': this.selectedWebsite.id
                }
                formData.append('json', JSON.stringify(json));
                const response = await axios.post("api/website/deleteWebsite", formData, {"withCredentials":true});
                if(response.data.status == "success"){
                    return true;
                }else {
                    return false;
                }
            } catch(error){
                console.log(error);
            }
        },
        updateWebsite: async function () {
            try {
                let formData = new FormData();
                formData.append('json', JSON.stringify(this.selectedWebsite));
                const response = await axios.post("api/website/updateWebsite", formData, {"withCredentials":true});
                if(response.data.status == "success"){
                    return true;
                }else {
                    return false;
                }
            } catch(error){
                console.log('try failed');
            }
        },
        handleConfirmationModalAnswer: async function (answer) {
            let success;
            if(answer === true) {
                switch(this.action){
                    case 'delete-website':
                        success = await this.deleteWebsite();
                        if(success){
                            this.loadAdminWebsites();
                            this.toggleConfirmationModal();
                            this.$emit('website-deleted', {"text":"Sitio eliminado", "status":"success"});
                        }else{
                            this.$emit('website-deleted', {"text":"No se pudo eliminar el sitio", "status":"error"});
                        }
                        break;
                    case 'update-website':
                        success = await this.updateWebsite();
                        if(success){
                            this.loadAdminWebsites();
                            this.toggleConfirmationModal();
                            this.$emit('website-updated', {
                                "text":"Sitio actualizado", 
                                "status":"success",
                                "website":this.selectedWebsite.name
                            });
                        }else{
                            this.$emit('website-updated', {"text":"No se pudo actualizar el sitio", "status":"error"});
                        }
                        break;
                    case 'dump':
                        success =  await this.downloadExcel();
                        if(success == true){
                            this.loadAdminWebsites();
                            this.toggleConfirmationModal();
                            this.$emit('website-updated', {
                                "text":"Se vacio la tabla", 
                                "status":"success",
                                "website":this.selectedWebsite.name
                            });
                        }else{
                            this.$emit('website-updated', {
                                "text":"Error", 
                                "status":"error"
                            });
                        }
                    break;
                }
            }else{
                this.toggleConfirmationModal();
                this.answer = false;
            }
        },
        downloadExcel: async function () {
            try {
                // Descargar el archivo Excel
                const response = await axios({
                    url: 'api/leads/export/' + this.selectedWebsite.id,
                    method: 'GET',
                    responseType: 'blob',
                    withCredentials: true
                });

                // Crear un enlace para la descarga del archivo Excel
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'leads.xlsx');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                // Eliminar los leads del sitio web
                const dump = await this.deleteWebsiteLeads();

                if (dump === true) {
                    // this.$emit("leads-dumped", {
                    //     "status": "success",
                    //     "text": "Se vaciaron los prospectos"
                    // });
                    return true;
                } else {
                    // this.$emit("leads-dumped", {
                    //     "status": "error",
                    //     "text": "No se pudieron vaciar los prospectos"
                    // });
                    return false;
                }
            } catch (error) {
                console.error(error);
                this.$emit("leads-dumped", {
                    "status": "error",
                    "text": "No se pudo descargar el archivo"
                });
                return false;
            }
        },

        deleteWebsiteLeads: async function () {
            try {
                let website = this.selectedWebsite.id;
                const response = await axios.delete(`/api/leads/dump/${website}`, { withCredentials: true });

                if (response.data.status === "success") {
                    return true;
                } else {
                    return false;
                }
            } catch (error) {
                console.error(error);
                // Emitir un evento de error en caso de excepción
                this.$emit('leads-dumped', {
                    "text": "Error en la solicitud",
                    "status": "error"
                });
                return false; // Asegurarse de retornar false en caso de error
            }
        },
    }
}
</script>
<style scoped>

span {
    margin: .5rem 0;
}

.website-list-container {
    height: 50vh;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
}

.table-container {
    background-color: #aaa;
    border-top-left-radius: .5rem;
    border-top-right-radius: .5rem;
    padding: .5rem;
    box-sizing: border-box;
    flex-grow: 1;
    min-height: 0;
    overflow-y: scroll;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.table-container::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.table-container {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
}

table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
    margin: 0;
    font-size: 14px;
}

thead {
    color: white;
    border-bottom: 1px solid var(--shadows);
}

thead tr th {
    text-align: left;
    padding: .5rem;
    width: 50%;
}

thead tr th:nth-last-child(1) {
    text-align: center;
    padding: .5rem;
    width: 50%;
}

.table-container-footer {
    background-color: var(--primary);
    padding: .5rem;
    border-bottom-left-radius: .5rem;
    border-bottom-right-radius: .5rem;
    display: flex;
    justify-content: flex-start;
    border-top: 1px solid #aaa;
}

.btn-warning.compact{
    width: 80px;
    box-shadow: 1px 1px 2px rgba(0,0,0,.6);
}

@media only screen and (min-width: 1024px) {
    .website-list-container {
        max-height: 50%;
    }
}
</style>