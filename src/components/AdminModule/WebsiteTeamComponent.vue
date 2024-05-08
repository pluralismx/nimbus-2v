<template>
    <div class="website-teammates-container">
        <!-- Website agents-->
        <span>Usuarios asignados a {{ website.name }}</span>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>Rol</th>
                        <th>acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- WebsiteTeamTableRowComponent -->
                    <WebsiteTeamTableRowComponent 
                        v-for="member in websiteUsersUpdated" :key="member.id" :member="member"
                    />
                </tbody>
            </table>
        </div>
        <div class="table-container-footer">
            <select class="compact" v-model="selectedUser"> 
                <option v-for="contact in contacts" :key="contact.id" :value="contact">{{ contact.name }} {{ contact.surname }}</option>
            </select>
            <button class="btn-warning compact" @click="asignUser()">asignar</button>
        </div>
    </div>
</template>
<script>
import axios from '@/lib/axios'
import WebsiteTeamTableRowComponent from './WebsiteTeamTableRowComponent.vue'
export default {
    name: 'WebsiteTeamComponent',
    components: {
        WebsiteTeamTableRowComponent
    },
    props: {
        contacts: {
            type: Array,
            required: true
        },
        website: {
            type: Object,
            required: true
        },
        websiteUsers: {
            type: Array,
            required: true
        }
    },
    computed: {
        computedWebsiteUsers() {
            return this.websiteUsers;
        }
    },
    watch: {
        computedWebsiteUsers: {
            handler(newVal){
                this.websiteUsersUpdated = newVal;
            },
            immediate: true,
            deep: true
        }
    },
    data() {
        return {
            selectedUser: undefined,
            websiteUsersUpdated: {}
        }
    },
    methods: {
        asignUser: function () {
            // console.log('website id: '+this.websiteId);
            // console.log('user id: '+this.selectedUser.id);
            
            let formData = new FormData();
            const json = {
                'id_website': this.website.id,
                'id_user': this.selectedUser.id
            }
            formData.append('json', JSON.stringify(json));
            axios.post('api/website/asignuser', formData, {"withCredentials":true})
                .then(res=>{
                    if(res.data.status == "success"){
                        this.websiteUsersUpdated.push(this.selectedUser);
                    }
                })
                .catch(error=>{
                    console.log(error);
                });

        }
    }
}
</script>
<style scoped>

.website-teammates-container {
    min-height: 50%;
    flex-direction: column;
    box-sizing: border-box;
}

/* Asigned users table */
.actual-website-users-container {
    box-sizing: border-box;
    flex-grow: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
}

span {
    margin: .5rem 0;
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

.website-teammates-container {
    height: 50%;
    display: flex;
    flex-direction: column;
}




</style>