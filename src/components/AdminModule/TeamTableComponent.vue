<template>
    <div class="settings-body">
        <span>Personas en mi equipo</span>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Integrante</th>
                        <th>Equipo</th>
                    </tr>
                </thead>
                <tbody>
                    <TeamTableRowComponent 
                        v-for="contact in contactsJson" :key="contact.id" :contact="contact"
                    />
                </tbody>
            </table>
        </div>
        <div class="table-container-footer">
            <button class="btn-warning compact">invitar</button>
        </div>
    </div>
</template>
<script>
import TeamTableRowComponent from './TeamTableRowComponent';
export default {
    name: 'TeamTableComponent',
    components: {
        TeamTableRowComponent
    },
    props: {
        contacts: {
            type: Array,
            required: true
        }
    },
    computed: {
        contactsComputed() {
            return this.contacts;
        }
    },
    watch: {
        contactsComputed: {
            handler(newVal){
                this.contactsJson = newVal;
            },
            immediate: true,
            deep: true
        }
    },
    data() {
        return {
            contactsJson: ''
        }
    }
}
</script>
<style scoped>

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
    overflow-y: hidden;
}
table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
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

.settings-body {
    display: flex;
    flex-direction: column;
    padding: 0 1rem;
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