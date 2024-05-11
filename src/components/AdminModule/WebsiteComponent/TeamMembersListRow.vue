<template>
    <tr>
        <td>{{ member.name}} {{ member.surname }}</td>
        <td>
            <select class="compact">
                <option>ADMIN</option>
                <option>USER</option>
            </select>
        </td>
        <td>
            <button class="btn-primary compact" @click="deleteTeammate">eliminar</button>
        </td>
    </tr>
</template>
<script>
import axios from '@/lib/axios';

export default {
    name: 'TeamMembersListRowComponent',
    props: {
        member: {
            type: Array,
            required: true
        }
    },
    methods: {
        deleteTeammate: async function () {
            let website_user_id = this.member.website_user_id;
            let formData = new FormData();
            const json = {
                "website_user_id": website_user_id
            }
            formData.append('json', JSON.stringify(json));
            const response = await axios.post('api/team/deleteTeammate', formData, {"withCredentials": true});
            if(response.data.status == "success"){
                console.log(this.member.website_user_id);
                this.$emit('teammate-deleted', this.member.website_user_id);
            }else{
                console.log('couldnt delete user');
            }

        }
    }
}
</script>
<style scoped>
tr td:nth-last-child(1) {
    text-align: center;
    padding: .5rem;
    width: 50%;
}
</style>