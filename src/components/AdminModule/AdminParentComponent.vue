<template>
    <section>
        <!-- Title bar-->
        <AdminPanelTitleBarComponent />

        <div class="panel-container">
            <!-- Website manager -->
            <div class="settings-container">
                <!-- Header -->
                <div class="settings-header">
                    <span>Mis sitios</span>
                </div>
                <!-- Body -->
                <div class="settings-body">
                    <WebsiteManagerComponent />
                </div>
                <div class="settings-container-footer">
                    <button @click="toogleCreateWebsitemodal" class="btn-primary">crear</button>
                </div>
            </div>

            <!-- Team manager -->
            <div class="settings-container">
                <!-- Header -->
                <div class="settings-header">
                    <span>Mi equipo</span>
                </div>
                <!-- Body -->
                <div class="settings-body">
                    <TeamTableComponent />
                </div>
                <div class="settings-container-footer">
                    <button @click="toogleInviteTeammateModal" class="btn-primary">invitar</button>
                </div>
            </div>
        </div>

        <!-- Modals -->
        <CreateWebsiteModalComponent 
            v-show="isVisibleCreateWebsiteModal"
            @cancel-create-website="toogleCreateWebsitemodal"
        />

        <AddTeammateModalComponent
            v-show="isVisibleAddTeammateModal" 
            @cancel-add-teammate="toogleInviteTeammateModal"
        />
    </section>
</template>
<script>
import AdminPanelTitleBarComponent from './AdminPanelTitleBarComponent.vue'
import WebsiteManagerComponent from './WebsiteManagerComponent.vue'
import TeamTableComponent from './TeamTableComponent.vue'
// Modals
import CreateWebsiteModalComponent from './CreateWebsiteModal.vue'
import AddTeammateModalComponent from './AddTeammateModalComponent.vue'

export default {
    name: 'AdminParentComponent',
    components: {
        AdminPanelTitleBarComponent,
        TeamTableComponent,
        WebsiteManagerComponent,
        CreateWebsiteModalComponent,
        AddTeammateModalComponent
    },
    data() {
        return {
            isVisibleCreateWebsiteModal: false,
            isVisibleAddTeammateModal: false
        }
    },
    methods: {
        toogleCreateWebsitemodal() {
            if(this.isVisibleCreateWebsiteModal == false) {
                this.isVisibleCreateWebsiteModal = true;
            }else {
                this.isVisibleCreateWebsiteModal = false;
            }
        },
        toogleInviteTeammateModal() {
            if(this.isVisibleAddTeammateModal == false) {
                this.isVisibleAddTeammateModal = true;
            }else {
                this.isVisibleAddTeammateModal = false;
            }
        }
    },

}
</script>
<style scoped>
    section {
        grid-column: 1/2;
        grid-row: 2/3;
        background-color: var(--basic);
        padding: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-y: scroll;
    }

    .settings-container {
        margin-bottom: 2rem;
        box-shadow: 2px 2px 6px var(--shadows);
        border-radius: .5rem;
    }

    .settings-header {
        background-color: var(--primary);
        color: var(--basic);
        padding: .5rem;
        border-top-left-radius: .5rem;
        border-top-right-radius: .5rem;
        
    }

    .settings-body {
        display: flex;
        flex-direction: column;
        padding: 0 1rem;
    }

    .settings-container-footer {
        display: flex;
        justify-content: center;
        padding-bottom: 1rem; 
    }

    .settings-container-footer button {
        width: 30%;
     }

    /* Desktop */

    @media only screen and (min-width: 1024px) {
        section {
            grid-column: 2/3;
            grid-row: 2/3;
            align-items: flex-start;
        }

        .panel-container {
            box-sizing: border-box;

            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 100%;
            column-gap: 2rem;
            
            height: 100%;
            margin-top: 0;
            margin-left: 1rem;
            margin-bottom: 1rem;
            margin-right: 1rem;
        }

        .settings-container {
            width: 100%;
            height: 100%;
        }

        .settings-container-footer button {
            width: 20%;
        }

        .wide {
            grid-column: 1/3;
            grid-row: 2/3;
        }
    }
</style>