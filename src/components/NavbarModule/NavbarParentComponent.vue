<template>
    <nav>

        <!-- MOBILE FIRST -->

        <!-- Top menu -->
        <div class="top-menu mobile">
            <label>Sitio: </label>
            <select @change="loadDashboardData($event.target.value)">
                <option v-for="website in websites" :key="website.id" :value="website.id">
                    {{ website.name }}
                </option> 
            </select>
        </div>

        <!-- Bottom menu -->
        <ul class="bottom-menu mobile">
            <li><img src="../../assets/images/white-note.png" @click="toggleTool('notes')"></li>
            <li><img src="../../assets/images/white-funel.png" @click="toggleTool('leads')"></li>
            <li><img src="../../assets/images/white-email.png" @click="toggleTool('email')"></li>
            <li><img src="../../assets/images/white-manager.png" @click="toggleTool('team')"></li>
            <li><img src="../../assets/images/white-logout.png" @click="logout()"></li>
        </ul>

        <!-- DESKTOP TEMPLATE -->

        <!-- Tools menu -->
        <ul class="tools-menu desktop">
            <li>
                <label>Sitio: </label>
                <select @change="loadDashboardData($event.target.value)">
                    <option v-for="website in websites" :key="website.id" :value="website.id">
                        {{ website.name }}
                    </option>
                </select>
            </li>
            <li><span @click="toggleTool('notes-desktop')">Memos</span></li>
            <li><span @click="toggleTool('leads-desktop')">Prospectos</span></li>
            <li><span @click="toggleTool('email-desktop')">Email</span></li>
        </ul>

        <!-- User menu -->
        <ul class="user-menu desktop">
            <li><span @click="toggleTool('team-desktop')">Admin&nbsp;</span></li>
            <li><span>|&nbsp;</span></li>
            <li><span @click="logout()">Cerrar sesión</span></li>
        </ul>
    </nav>
</template>
<script>
    import axios from '@/lib/axios';
    export default {
        name: 'NavbarParentComponent',
        props: {
            identity: {
                type: Object,
                required: true
            },
            reload: {
                type: Boolean,
                required: true
            },
        },
        computed: {
            reloadComputed(){
                return this.reload;
            }
        },
        watch: {
            reloadComputed: {
                immediate: true,
                handler (){
                    this.loadWebsites();
                }
            }
        },
        data() {
            return {
                websites: [],
            }
        },
        created() {
            this.loadWebsites();
        },
        methods: {
            toggleTool(selection){
                this.$emit('toggle-tool', selection);
            },
            loadWebsites: async function (){

                try {
                    let formData = new FormData();
                    const json = {
                        "id_user": this.identity.sub
                    }
                    formData.append('json', JSON.stringify(json));
                    const response = await axios.post('api/website/websites', formData, { withCredentials: true });

                    if (response.data.status == 'success') {
                        this.websites = response.data.websites;
                        if(this.websites.length > 0){
                            this.loadDashboardData(this.websites[0].id);
                        }
                        else {
                            this.$emit('user-has-no-websites');
                        }
                    } else {
                        throw new Error('Failed to fetch websites. Response status: ' + response.data.message);
                    }
                } catch (error) {
                    console.error('Error fetching friends:', error);
                    throw error;
                }
            },
            logout(){
                this.$emit('user-logged-out');
            },
            loadDashboardData: async function (website_id) {
                this.$emit('load-dashboard-data', website_id);
            }
            
        }
    }
</script>
<style scoped>

    /* Mobile first */

    nav {
        background-color: var(--primary);
        grid-column: 1/2;
        grid-row: 1/2;
        position: relative;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.7);
        z-index: 95;
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: 50% 50%;
        color: var(--basic);
    }

    .desktop {
        display: none;
    }

    .mobile {
        display: block;
    }

    /* Actual styles */

    img {
        width: 32px;
    }

    select {
        width: 85%;
    }

    .top-menu {
        grid-row: 1/2;
        grid-column: 1/2;
        padding-top: 4px;
        padding-left: 1rem;
        padding-right: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: var(--basic);
    }

    .bottom-menu {
        grid-row: 2/3;
        grid-column: 1/2;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 1rem;
    }

    @media only screen and (min-width: 1024px) {

        /* Layout set up */

        nav {
            grid-column: 1/3;
            grid-row: 1/2;
            display: grid;
            grid-template-columns: 50% 50%;
            grid-template-rows: 100%;
        }

        .desktop {
            display: block;
        }

        .mobile {
            display: none;
        }

        /* Actual styles */

        .tools-menu {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 1rem;
        }

        .user-menu {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding: 0 1rem;
        }

        select {
            width: 200px;
        }

        span:hover {
            cursor: pointer;
            color: var(--accent);
        }
    }

</style>