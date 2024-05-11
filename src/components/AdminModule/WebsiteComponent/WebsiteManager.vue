<template>
    <div class="settings-body">

        <!-- Website list -->
        <WebsiteListComponent 
            @open-create-website-modal="handleToggleCreateWebsiteModal"
            @website-selected="handleWebsiteSelected"
            @website-deleted="handleWebsiteDeleted"
            @website-updated="handleWebsiteUpdated"
            
        />

        <!-- Website Team Members -->
        <TeamMembersListComponent 
            :websiteTeam="websiteTeam"
            :friends="friends"
            @teammate-added="handleTeammateAdded"
        />
      
    </div>
</template>
<script>
import axios from '@/lib/axios'
import WebsiteListComponent from './WebsiteList.vue'
import TeamMembersListComponent from './TeamMembersList.vue'

export default {
    name: 'WebsiteManagerComponent',
    components: {
        WebsiteListComponent,
        TeamMembersListComponent,
        
    },
    props: {
        contacts: {
            type: Array,
            required: true
        },
        friends: {
            type: Array,
            required: true
        }
    },
    computed: {
        websitesComputed(){
            return this.websites;
        }
    },
    data() {
        return {
            // Modals
            isVisibleCreateWebsiteModal: false,
            isVisibleDeleteConfirmationModal: false,
            isVisibleUpdateConfirmationModal: false,
            
            // Data
            website_id: '',
            website_name: '',
            websiteTeam: {},
        }
    },
    methods: {
        handleWebsiteSelected: function (website) {
            
            this.website_id = website.id;
            this.website_name = website.name;
            this.loadWebsiteTeammates();

        },
        loadWebsiteTeammates: async function () {
            console.log(this.website_id);
            try{
                const json = {
                    "id_website": this.website_id
                }
                let formData = new FormData();
                formData.append('json', JSON.stringify(json));
                const response = await axios.post('api/team/teammates', formData, {"withCredentials": true});
                if(response.data.status == 'success'){
                    const websiteTeam = {
                        'website_id': this.website_id,
                        'website_name': this.website_name,
                        'team': response.data.website_users
                    }
                    this.websiteTeam = websiteTeam;
                }else {
                    this.websiteTeam = {}
                }
            }catch(error){
                console.log(error);
            }
        },
        handleTeammateAdded: function () {
            this.loadWebsiteTeammates();
        },
        handleWebsiteDeleted: function () {
            this.websiteTeam = {};
        },
        handleWebsiteUpdated: function (website_name) {
            this.websiteTeam.website_name = website_name;
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