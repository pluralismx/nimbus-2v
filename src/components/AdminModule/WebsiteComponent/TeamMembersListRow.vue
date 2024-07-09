<template>
    <tr>
        <td>{{ member.name}} {{ member.surname }}</td>
        <td>
            <select class="compact" @change="updateRole($event.target.value)" :value="member.role">
                <option disabled>Rol...</option>
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
            type: Object,
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
                this.$emit('teammate-deleted', {
                    "member":this.member.website_user_id,
                    "text":"Miembro eliminado", 
                    "status":"success"
                });
            }else if(response.data.message == "You can not delete yourself"){
                this.$emit('teammate-deleted', {
                    "text":"No te puedes eliminar a ti mismo", 
                    "status":"error"
                });
            }else{
                this.$emit('teammate-deleted', {
                    "text":"No se pudo eliminar al miembro", 
                    "status":"error"
                });
            }
        },
        updateRole: async function (role) {
            let formData = new FormData();
            const json = {
                "role":role,
                "id_teammate": this.member.website_user_id
            }
            formData.append('_method', 'put');
            formData.append('json', JSON.stringify(json));

            const response = await axios.post('api/team/updateTeammate', formData, {"withCredentials": true});
            if(response.data.status == "success"){
                this.$emit('teammate-role-updated', {"text":"Rol actualizado", "status":"success"});
            }else {
                this.$emit('teammate-role-updated', {"text":"No se pudo cambiar el rol", "status":"error"});
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

.btn-primary.compact {
    width: 80px;
    box-shadow: 1px 1px 2px rgba(0,0,0,.6);
}
</style>