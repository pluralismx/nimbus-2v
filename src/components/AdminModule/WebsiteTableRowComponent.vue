<template>
    <tr @click="websiteSelected()" v-show="!editWebsite">
        <td>{{ website.name }}</td>
        <td>{{ website.url }}</td>
        <td>
            <button class="btn-primary compact" @click="showDeleteConfirmationModal">eliminar</button>
            <button class="btn-primary compact" @click="toggleEditWebsiteRow">editar</button>
        </td>
    </tr>

    <!-- Edit website row -->
    <tr v-show="editWebsite">
        <td><input class="compact" type="text" :value="website.name" /></td>
        <td><input class="compact" type="text" :value="website.url" /></td>
        <td>
            <button class="btn-primary compact" @click="showDeleteConfirmationModal">aceptar</button>
            <button class="btn-primary compact" @click="toggleEditWebsiteRow">cancelar</button>
        </td>
    </tr>
</template>
<script>
export default {
    name: "WebsiteTableRowComponent",
    props: {
        website: {
            type: Object,
            required: true
        }
    },
    computed: {
        computedWebsite(){
            this.website;
        }
    },
    watch: {
        computedWebsite: {
            handler(newVal) {
                this.websiteCopy
            }
        }
    },
    data() {
        return {
            editWebsite: false,
            
        }
    },
    methods: {
        websiteSelected: function () {
            this.$emit('website-selected', this.website);
        },
        showDeleteConfirmationModal: function () {
            this.$emit('delete-website', this.website.id);
        },
        toggleEditWebsiteRow: function () {
            if(this.editWebsite == true){
                this.editWebsite = false;
            }else {
                this.editWebsite = true;
            }
        }
    }
}
</script>
<style scoped>


tbody tr {
    border-bottom: 1px solid var(--shadows);
}

tbody tr:last-child {
    border-bottom: none;
}

tbody tr:hover {
    background-color: var(--shadows);
    color: white;
    cursor: pointer;
}

tbody tr td {
    text-align: left;
    padding: .5rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 14px;
}

tbody tr td:nth-last-child(1) {
    text-align: center;
}

tbody tr td button {
    width: 30%;
    margin-left: .5rem;
}
</style>