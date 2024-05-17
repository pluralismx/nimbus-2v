<template>
    <!-- Original lead -->
    <tr>
        <td v-show="edit==false" width="18%"><span class="span-clickable" @click="showDetails()">{{ name }}</span></td>
        <td v-show="edit==false" width="18%"><span>{{ phone }}</span></td>
        <td v-show="edit==false" width="18%"><span>{{ email }}</span></td>
        
        <td v-show="edit==false" width="18%">
            <select class="select-status" v-model="status" @change="editStatus()">
                <option value="nuevo">nuevo</option>
                <option value="presentacion">presentacion</option>
                <option value="cotizacion">cotizacion</option>
                <option value="negociacion">negociacion</option>
                <option value="cierre">cierre</option>
            </select>
        </td>
        <td v-show="edit==false">26/03/24</td>
        <td v-show="edit==false" width="18%">
            <button class="btn-primary" @click="toggleEditWebsiteRow()">editar</button>&nbsp;&nbsp;
            <button class="btn-warning" @click="deleteLead()">eliminar</button>
        </td>

        <!-- Edit lead -->
        <td v-show="edit==true" width="18%"><input type="text" v-model="name"></td>
        <td v-show="edit==true" width="18%"><input type="text" v-model="phone"></td>
        <td v-show="edit==true" width="18%"><input type="text" v-model="email"></td>
        <td v-show="edit==true" width="18%">
            <select class="select-status" v-model="status">
                <option value="nuevo">nuevo</option>
                <option value="presentacion">presentacion</option>
                <option value="cotizacion">cotizacion</option>
                <option value="negociacion">negociacion</option>
                <option value="cierre">cierre</option>
            </select>
        </td>
        <td v-show="edit==true">26/03/24</td>
        <td v-show="edit==true" width="18%">
            <button class="btn-warning" @click="updateLead()">actualizar</button>&nbsp;&nbsp;
            <button class="btn-primary" @click="toggleEditWebsiteRow()">cancelar</button>
        </td>
        
    </tr>
</template>
<script>
    import axios from '@/lib/axios'
    export default {
        name: 'LeadRowComponent',
        props: {
            lead: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                edit: false,
                name: this.lead.name,
                phone: this.lead.phone,
                email: this.lead.email,
                status: this.lead.status
            }
        },
        methods: {
            toggleEditWebsiteRow: function () {
                if(this.edit == true){
                    this.edit = false;
                }else {
                    this.edit = true;
                }
            },
            editStatus: async function () {
                const json = {
                    'status': this.status
                }
                let formData = new FormData();
                formData.append('json', JSON.stringify(json));
                
                formData.append('_method', 'put');
                const response = await axios.post('api/lead/update/'+this.lead.id, formData, {"withCredentials":true});
                if(response.data.staus=="success"){
                    console.log("lead edited");
                }else {
                    console.log(response.data.status);
                }
            },
            deleteLead: async function () {
                const response = await axios.delete('api/lead/delete/'+this.lead.id, {'withCredentials':true});
                if(response.data.status=='success'){
                    this.$emit('lead-deleted', this.lead.id);
                }else {
                    console.log('error deleting lead');
                }
            },
            updateLead: async function () {
                const json = {
                    'name': this.name,
                    'phone': this.phone,
                    'email': this.email,
                    'status': this.status,
                }
                let formData = new FormData();
                formData.append('json', JSON.stringify(json));
                
                formData.append('_method', 'put');
                const response = await axios.post('api/lead/update/'+this.lead.id, formData, {"withCredentials":true});
                if(response.data.status=="success"){
                    console.log('lead updated');
                    this.toggleEditWebsiteRow();
                }else {
                    console.log(response.data.status);
                }
            },
            showDetails: function () {
                this.$emit('show-details', this.lead);
            },

        }
    }
</script>
<style scoped>
    td {
        padding: 6px;
        text-align: center;
        height: 2rem;
    }

    .select-status {
        color: var(--shadows);
        width: 75%;
    }

    button {
        width: 40%;

    }

    input {
        width: 85%;
        text-align: center;
    }
    
</style>