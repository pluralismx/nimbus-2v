<template>
    <!-- Original lead -->
    <tr>
        <td v-show="edit==false" width="18%"><span class="span-clickable" @click="showDetails()">{{ name }}</span></td>
        <td v-show="edit === false" width="18%">
            <a :href="'tel:' + phone" v-if="phone">
                <span class="span-call-icon" @click="showDetails()">
                    <img src="../../../src/assets/images/phone-icon2.png" class="phone-icon" />&nbsp;
                </span>
            </a>
            <a :href="'https://wa.me/' + phone" target="_blank">
                <span>{{ phone }}</span>
            </a>
        </td>

        <td v-show="edit==false" width="18%"><span :class="{ 'unsubscribed': this.lead.subscribed == 0 }">{{ email }}</span></td>
        
        <td v-show="edit==false" width="18%">
            <select class="select-status" @change="editStatus()" v-model="status" :style="{ color: getColor(status) }" :disabled="status=='pendiente'">
                <option value="nuevo">nuevo</option>
                <option value="presentacion">presentacion</option>
                <option value="cotizacion">cotizacion</option>
                <option value="negociacion">negociacion</option>
                <option value="cierre">cierre</option>
                <option value="pendiente" v-if="status=='pendiente'">pendiente</option>
            </select>
        </td>
        <td v-show="edit==false">{{ date }}</td>
        <td v-show="edit==false" width="18%">
            <button class="btn-primary" @click="toggleEditWebsiteRow()">editar</button>&nbsp;&nbsp;
            <button class="btn-warning" @click="deleteLead()">eliminar</button>
        </td>

        <!-- Edit lead -->
        <td v-show="edit==true" width="18%"><input type="text" v-model="name" required></td>
        <td v-show="edit==true" width="18%"><input type="text" v-model="phone"></td>
        <td v-show="edit==true" width="18%"><input type="text" v-model="email"></td>
        <td v-show="edit==true" width="18%">
            <select class="select-status" @change="editStatus()" v-model="status" :style="{ color: getColor(status) }" :disabled="status=='pendiente'">
                <option value="nuevo">nuevo</option>
                <option value="presentacion">presentacion</option>
                <option value="cotizacion">cotizacion</option>
                <option value="negociacion">negociacion</option>
                <option value="cierre">cierre</option>
                <option value="pendiente" v-if="status=='pendiente'">pendiente</option>
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
        watch: {
            lead: {
                handler(newVal){
                    this.name = newVal.name,
                    this.phone = newVal.phone,
                    this.email = newVal.email,
                    this.status = newVal.status,
                    this.date = newVal.date
                },
                deep: true
            }
        },
        data() {
            return {
                edit: false,
                name: this.lead.name,
                phone: this.lead.phone,
                email: this.lead.email,
                status: this.lead.status,
                date: this.lead.date
            }
        },
        methods: {
            getColor(status) {
                // Define los colores para cada estado
                const colors = {
                    nuevo: '#007BFF',       // Azul fuerte
                    presentacion: '#1E3A8A', // Azul oscuro
                    cotizacion: '#FFB300',  // Amarillo oscuro
                    negociacion: '#D35400', // Naranja oscuro
                    cierre: '#218838',       // Verde oscuro
                    pendiente: '#D35400'
                };
                return colors[status] || '#FFFFFF'; // Devuelve el color correspondiente o blanco si no coincide
            },
            toggleEditWebsiteRow: function () {
                if(this.edit == true){
                    this.edit = false;
                }else {
                    this.edit = true;
                }
            },
            editStatus: async function () {
                if(this.status != 'cierre'){
                    
                    const json = {
                        'id': this.lead.id,
                        'status': this.status
                    }
                    
                    let formData = new FormData();
                    formData.append('json', JSON.stringify(json));
                    formData.append('_method', 'put');

                    const response = await axios.post('api/lead/update/'+this.lead.id, formData, {"withCredentials":true});
                    if(response.data.status=="success"){
                        this.$emit('lead-status-updated', json, {"text":"Estado actualizado", "status":"success"});
                    }else {
                        this.$emit('lead-status-updated', null, {"text":"No su pudo actualizar el estado", "status":"error"});
                    }
                }else{
                    this.$emit('close-sale', this.lead);
                }
            },
            deleteLead: async function () {
                this.$emit('delete-lead', this.lead.id);
            },
            updateLead: async function () {
                
                if(this.name != ''){
                    
                    const json = {
                        'id': this.lead.id,
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
                        this.$emit('lead-updated', json, {"text":"Prospecto actualizado", "status":"success"});
                        this.toggleEditWebsiteRow();
                    }else {
                        this.$emit('lead-updated', null, {"text":"No se pudo actualizar el prospecto", "status":"error"});
                    }
                }else{
                    this.$emit('lead-updated', null, {"text":"No se puedes omitir el nombre", "status":"error"});
                }
            },
            showDetails: function () {
                this.$emit('show-details', this.lead);
            },

        }
    }
</script>
<style scoped>

.span-call-icon{
    display: inline-block;
    transition: all 300ms;
}

.span-call-icon:hover{
    transform: translateY(-.5rem);
}

a:hover {
    text-decoration: underline;
}

td {
    padding: 6px;
    text-align: center;
    height: 2rem;
}

.unsubscribed {
    color: gray;
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

.phone-icon {
    width: 20px;
}

.phone-icon:hover {
    filter: invert(1);
}
    
</style>