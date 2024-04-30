<template>
    <table>
        <thead>
            <tr>
                <th>Sitio</th>
                <th>URL</th>
            </tr>
        </thead>
        <tbody>
            <WebsiteTableRowComponent 
                v-for="website in ownersWebsites" :key="website.id" :website="website"
            />
        </tbody>
    </table>
</template>
<script>
import WebsiteTableRowComponent from './WebsiteTableRowComponent'
export default {
    name: 'WebsiteTableComponent',
    components: {
        WebsiteTableRowComponent
    },
    props: {
        websites: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            ownersWebsites: []
        }
    },
    computed: {
        websitesComputed(){
            return this.websites;
        }
    },
    watch: {
        websitesComputed: {
            handler(newVal){
                this.ownersWebsites = newVal
                console.log(this.ownersWebsites);
            },
            immediate: true,
            deep: true
        }
    },


}
</script>
<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
    margin: 1rem 0;
}

thead {
    color: var(--primary);
    border-bottom: 1px solid var(--shadows);
}

thead tr th {
    text-align: left;
    padding: .5rem;
    width: 50%;
}

</style>