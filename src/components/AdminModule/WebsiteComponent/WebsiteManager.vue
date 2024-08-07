<template>
    <div class="settings-body">

        <!-- Website list -->
        <WebsiteListComponent 
            @open-create-website-modal="handleToggleCreateWebsiteModal"
            @website-selected="handleWebsiteSelected"
            @website-deleted="handleWebsiteDeleted"
            @website-updated="handleWebsiteUpdated"
            @website-created="handleWebsiteCreated"
            @leads-dumped="handleLeadsDumped"
        />

        <!-- Website Team Members -->
        <TeamMembersListComponent 
            :websiteTeam="websiteTeam"
            :friends="friends"
            @teammate-added="handleTeammateAdded"
            @teammate-deleted="handleTeammateDeleted"
            @teammate-role-updated="handleTeammateRoleUpdated"
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
        friends: {
            type: Array,
            required: true
        },
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

        loadWebsiteTeammates: async function () {
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
        handleTeammateAdded: function (notification) {
            this.loadWebsiteTeammates();
            this.$emit('teammate-added', notification);
        },
        handleTeammateRoleUpdated: function (notification) {
            this.$emit('teammate-role-updated', notification);
        },
        handleTeammateDeleted: function (notification) {
            this.$emit('teammate-deleted', notification);
        },

        //Websites CRUD
        handleWebsiteSelected: function (website) {
            this.website_id = website.id;
            this.website_name = website.name;
            this.loadWebsiteTeammates();
        },
        handleWebsiteCreated: function (notification) {
            this.$emit('website-created', notification);
        },
        handleWebsiteDeleted: function (notification) {
            this.$emit("website-deleted", notification);
            this.websiteTeam = {};
        },
        handleWebsiteUpdated: function (notification) {
            this.$emit("website-updated", notification);
            this.websiteTeam.website_name = notification.website;
        },
        handleLeadsDumped: function (notification) {
            this.$emit("website-updated", notification);
        }
    }
}
</script>
<style scoped>


/* Asign teammates */
.settings-body {
    display: flex;
    flex-direction: column;
    padding: 0 1rem;
    padding-bottom: 1rem;
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
}

</style>