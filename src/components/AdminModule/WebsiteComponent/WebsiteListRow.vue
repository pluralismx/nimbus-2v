<template>
    <tr @click="websiteSelected()" v-show="!editWebsite">
        <td>{{ website.name }}</td>
        <td>{{ website.url }}</td>
        <td class="td-actions-desktop">
            <button class="btn-primary compact" @click="deleteWebsite()">eliminar</button>
            <button class="btn-primary compact" @click="toggleEditWebsiteRow">editar</button>
        </td>
        <td class="td-actions-mobile">
            <button class="btn-primary compact" @click="deleteWebsite()">&#10006;</button>
            <button class="btn-primary compact" @click="toggleEditWebsiteRow">&#9999;</button>
        </td>
    </tr>

    <!-- Edit website row -->
    <tr v-show="editWebsite">
        <td><input v-model="new_name" class="compact" type="text"></td>
        <td><input v-model="new_url" class="compact" type="text"></td>
        <td>
            <button class="btn-warning compact" @click="updateWebsite">aceptar</button>
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
    data() {
        return {
            editWebsite: false,
            new_name: this.website.name,
            new_url: this.website.url
        }
    },
    methods: {
        websiteSelected: function () {
            this.$emit('website-selected', this.website);
        },
        toggleEditWebsiteRow: function () {
            if(this.editWebsite == true){
                this.editWebsite = false;
            }else {
                this.editWebsite = true;
            }
        },
        deleteWebsite: function () {
            this.$emit('authorization-need', "delete-website", this.website);
        },
        updateWebsite: function () {
            const newWebsiteData = {
                'id_website': this.website.id,
                'name':this.new_name,
                'url':this.new_url
            }
            this.$emit('authorization-need', "update-website", newWebsiteData);
            this.toggleEditWebsiteRow();
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

tbody tr td button {
    margin-left: .5rem;
    width: 40%;
}

tbody tr:nth-last-child(2){
    border-bottom: none;
}

.td-actions-desktop {
    display: none;
}

@media only screen and (min-width: 1024px) {
    tbody tr td button {
        margin-left: .5rem;
    }
    .td-actions-desktop {
        display: block;
        text-align: center;
    }
    .td-actions-mobile {
        display: none;
    }
}

.btn-primary.compact{
    width: 80px;
    box-shadow: 1px 1px 2px rgba(0,0,0,.6);
}
</style>