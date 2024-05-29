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
            isVisibleConfirmationModal: false
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
        handleWebsiteCreated: function () {
            this.loadAdminWebsites();
        },
        handleAuthorizationNeeded: function (action, website) {
            this.action = action;
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
        handleConfirmationModalAnswer: async function (answer) {
            let success;
            if(answer === true) {
                switch(this.action){
                    case 'delete-website':
                        success = await this.deleteWebsite();
                        if(success){
                            this.loadAdminWebsites();
                            this.toggleConfirmationModal();
                            
                            this.$emit('website-deleted');
                        }else{
                            console.log('error');
                        }
                        break;
                    case 'update-website':
                        success = await this.updateWebsite();
                        if(success){
                            this.loadAdminWebsites();
                            this.toggleConfirmationModal();
                            this.$emit('website-updated', this.selectedWebsite.name);
                        }else{
                            console.log('error');
                        }
                        break;
                }
            }else{
                console.log("action denied");
                this.toggleConfirmationModal();
                this.answer = false;
            }
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
        }
    }
}
</script>
<style scoped>

span {
    margin: .5rem 0;
}

.website-list-container {
    height: 50%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
}

.table-container {
    background-color: #999;
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
    justify-content: flex-end;
}

.table-container-footer select {
    margin-right: 1rem;
    width: 30%;
}




</style>