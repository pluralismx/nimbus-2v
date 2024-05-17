<template>
    <div class="website-teammates-container">
        <!-- Website agents-->
        <span>Usuarios asignados a <span class="span-website-name">{{ websiteTeamData.website_name }}</span></span>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Integrante</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- WebsiteTeamTableRowComponent -->
                    <TeamMembersListRowComponent 
                        v-for="member in websiteTeamData.team" :key="member.id" :member="member"
                        @teammate-deleted="handleTeammateDeleted"
                    />
                </tbody>
            </table>
        </div>
        <div class="table-container-footer">
            <select class="compact" v-model="asignedUser"> 
                <option v-for="friend in friends" :key="friend.id" :value="friend">{{ friend.name }} {{ friend.surname }}</option>
            </select>
            <button class="btn-warning compact" @click="addTeammate()">asignar</button>
        </div>
    </div>
</template>
<script>
import axios from '@/lib/axios'
import TeamMembersListRowComponent from './TeamMembersListRow'
export default {
    name: 'TeamMembersListComponent',
    components: {
        TeamMembersListRowComponent
    },
    props: {
        websiteTeam: {
            type: {},
            required: true
        },
        friends: {
            type: Array,
            required: true
        }
    },
    computed: {
        websiteTeamComputed() {
            return this.websiteTeam;
        }
    },
    watch: {
        websiteTeamComputed: {
            handler(newVal){
                this.websiteTeamData = newVal;
            },
            immediate: true,
            deep: true
        }
    },
    data() {
        return {
            websiteTeamData: {},
            asignedUser: {}
        }
    },
    methods: {
        addTeammate: async function () {
            let formData = new FormData();
            const json = {
                'id_website': this.websiteTeamData.website_id,
                'id_user': this.asignedUser.id
            }
            formData.append('json', JSON.stringify(json));
            const response = await axios.post('api/team/asignTeammate', formData, {"withCredentials":true})
            if(response.data.status == 'success'){
                this.$emit('teammate-added');
            }else{
                console.log(response.data);
            }

        },
        handleTeammateDeleted: function (id) {
            this.websiteTeamData.team.forEach((teammate, index)=>{
                if(teammate.website_user_id == id){
                    this.websiteTeamData.team.splice(index, 1);
                }
            });
        }
    }
}
</script>
<style scoped>

.website-teammates-container {
    display: flex;
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

.span-website-name {
    color: var(--primary);
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
    width: 50%;
}

.website-teammates-container {
    height: 50%;
    display: flex;
    flex-direction: column;
}

@media only screen and (min-height: 1024px) {
    .table-container-footer select {
        margin-right: 1rem;
        width: 30%;
    }
}


</style>