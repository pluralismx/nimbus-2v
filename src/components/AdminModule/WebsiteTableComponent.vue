<template>
    <div class="settings-body">


        <!-- Website list -->
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
                        <WebsiteTableRowComponent 
                            v-for="website in ownersWebsites" :key="website.id" :website="website"
                            @website-selected="handleWebsiteSelected"
                            @delete-website ="handleDeleteWebsite"
                        />
                    </tbody>
                </table>
            </div>
            <div class="table-container-footer">
                <button class="btn-warning compact" @click="openCreateWebsiteModal">crear</button>
            </div>
        </div>


        <!-- Asign user to website -->
        <WebsiteTeamComponent 
            :websiteUsers="websiteUsers"
            :website="website"
            :contacts="contacts"
        />
        <!-- Delete website prompt -->
        <DeleteWebsiteConfirmationModal 
            v-show="isVisibleConfirmationModal"
            @cancel-delete-website="handleToggleDeleteConfirmationModal"
            @proceed-deleting-website="handleProceedDeleting"
        />
        
    </div>
</template>
<script>
import axios from '@/lib/axios'
import WebsiteTableRowComponent from './WebsiteTableRowComponent'
import WebsiteTeamComponent from './WebsiteTeamComponent.vue'
import DeleteWebsiteConfirmationModal from './DeleteWebsiteConfirmationModal'
export default {
    name: 'WebsiteTableComponent',
    components: {
        WebsiteTableRowComponent,
        WebsiteTeamComponent,
        DeleteWebsiteConfirmationModal
    },
    props: {
        websites: {
            type: Array,
            required: true
        },
        contacts: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            ownersWebsites: [],
            website: '',
            websiteUsers: [],
            isVisibleConfirmationModal: false,
        }
    },
    computed: {
        websitesComputed(){
            return this.websites;
        }
    },
    watch: {
        websitesComputed: {
            handler(newVal){
                this.ownersWebsites = newVal
            },
            immediate: true,
            deep: true
        }
    },
    methods: {
        openCreateWebsiteModal: function () {
            this.$emit('open-create-website-modal');
        },
        handleWebsiteSelected: async function (website) {
            try{
                this.website = website;
                let formData = new FormData();
                const json = {
                    'id_website': website.id
                }
                formData.append('json', JSON.stringify(json));

                const response = await axios.post('api/website/users', formData, {"withCredentials": true});
                if(response) {
                    this.websiteUsers = response.data.website_users;
                }
            } catch(error) {
                console.log(error);
            }  
        },
        handleToggleDeleteConfirmationModal: function () {
            if(this.isVisibleConfirmationModal == false){
                this.isVisibleConfirmationModal = true;
            }else {
                this.isVisibleConfirmationModal = false;
            }
        },
        handleDeleteWebsite: function (id_website) {
            this.websiteToDelete = id_website;
            this.handleToggleDeleteConfirmationModal();
        },
        handleProceedDeleting: async function () {
            try{
                let formData = new FormData();
                const json = {
                    'id_website': this.websiteToDelete
                }
                formData.append('json', JSON.stringify(json));
                const response = await axios.post('api/website/delete', formData, {"withCredentials": true});
                if(response.data.status == 'success') {
                    this.handleToggleDeleteConfirmationModal();
                }else {
                    console.log('error al eliminar sitio');
                }
            }catch (error) {
                console.log(error);
            }
        }
    }

}
</script>
<style scoped>
/* Website list */
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

span {
    margin: .5rem 0;
}

table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
}

thead {
    color: white;
    border-bottom: 1px solid var(--shadows);
}

thead tr th {
    text-align: left;
    padding: .5rem;
    width: 50%;
    font-size: 14px;
}

thead tr th:nth-last-child(1) {
    text-align: center;
}


.table-container-footer {
    background-color: var(--primary);
    padding: .5rem;
    border-bottom-left-radius: .5rem;
    border-bottom-right-radius: .5rem;
    display: flex;
    justify-content: flex-end;
}

/* Asign teammates */
.settings-body {
    display: flex;
    flex-direction: column;
    padding: 0 1rem;
    flex-grow: 1;
    min-height: 0;
}

@media only screen and (min-width: 1024px) {
    .settings-body {
        display: flex;
        flex-direction: column;
        padding: 0 1rem;
        padding-bottom: 1rem;
    }
    .website-list-container {
        height: 50%;
        display: flex;
        flex-direction: column;
    }
}

</style>