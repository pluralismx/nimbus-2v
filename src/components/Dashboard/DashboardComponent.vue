<template>

    <!-- Layout -->
    <div id="dashboard">

        <!-- Navigation bar -->
        <NavbarParentComponent 
            @toggle-tool="handleToggleTool" 
        />

        <!-- Aside -->
        <NotesParentComponent 
            v-show="isVisibleNotes" 
        />

        <!-- Center -->
        <LeadsParentComponent 
            v-show="isVisibleLeads" 
            :class="{ 'wide' : !isVisibleNotes }" 
        />

        <EmailParentComponent 
            v-show="isVisibleEmail"
            :class="{ 'wide' : !isVisibleNotes }" 
        />

        <!-- Status bar -->
        <StatusbarParentComponent />

    </div>

</template>

<script>
import NavbarParentComponent from '../NavbarModule/NavbarParentComponent.vue';
import NotesParentComponent from '../NotesModule/NotesParentComponent.vue';
import LeadsParentComponent from '../LeadsModule/LeadsParentComponent.vue';
import EmailParentComponent from '../EmailModule/EmailParentComponent.vue';
import StatusbarParentComponent from '../StatusbarModule/StatusbarParentComponent.vue';

export default {
    name: 'DashboardComponent',
    components: {
        NavbarParentComponent,
        NotesParentComponent,
        LeadsParentComponent,
        EmailParentComponent,
        StatusbarParentComponent
    },
    data() {
        return {
            isVisibleNotes: false,
            isVisibleLeads: false,
            isVisibleEmail: false
        }
    },
    methods: {
        handleToggleTool(selection) {

            switch (selection) {
                case 'notes':
                    if (this.isVisibleNotes == false) {
                        this.isVisibleNotes = true;
                        this.isVisibleLeads = false;
                        this.isVisibleEmail = false;
                    } else {
                        this.isVisibleNotes = false;
                    }
                    break;
                case 'notes-desktop':
                    if (this.isVisibleNotes == false) {
                        this.isVisibleNotes = true;
                    } else {
                        this.isVisibleNotes = false;
                    }
                    break;
                case 'leads':
                    if (this.isVisibleLeads == false) {
                        this.isVisibleLeads = true;
                        this.isVisibleNotes = false;
                        this.isVisibleEmail = false;
                    } else {
                        this.isVisibleLeads = false;
                    }
                    break;
                case 'leads-desktop':
                    if (this.isVisibleLeads == false) {
                        this.isVisibleLeads = true;
                        this.isVisibleEmail = false;
                    } else {
                        this.isVisibleLeads = false;
                    }
                    break;
                case 'email':
                    if (this.isVisibleEmail == false) {
                        this.isVisibleEmail = true;
                        this.isVisibleNotes = false;
                        this.isVisibleLeads = false;
                    } else {
                        this.isVisibleEmail = false;
                    }
                    break;
                case 'email-desktop':
                    if (this.isVisibleEmail == false) {
                        this.isVisibleEmail = true;
                        this.isVisibleLeads = false;
                    } else {
                        this.isVisibleEmail = false;
                    }
                    break;
            }
        }
    }
}

</script>

<style scoped>
/* Mobile first */

#dashboard {
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-columns: 100vw;
    grid-template-rows: 12vh 83vh 5vh;
    background-color: var(--basic);
}

/* Desktop */

@media only screen and (min-width: 1024px) {
    #dashboard {
        grid-template-columns: 20vw 80vw;
        grid-template-rows: 8vh 86vh 6vh;
    }
}
</style>
