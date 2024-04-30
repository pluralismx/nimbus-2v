<template>
    <nav>

        <!-- MOBILE FIRST -->

        <!-- Top menu -->
        <div class="top-menu mobile">
            <label>Sitio: </label>
            <select></select>
        </div>

        <!-- Bottom menu -->
        <ul class="bottom-menu mobile">
            <li><img src="../../assets/images/white-note.png" @click="toggleTool('notes')"></li>
            <li><img src="../../assets/images/white-funel.png" @click="toggleTool('leads')"></li>
            <li><img src="../../assets/images/white-email.png" @click="toggleTool('email')"></li>
            <li><img src="../../assets/images/white-manager.png" @click="toggleTool('team')"></li>
            <li><img src="../../assets/images/white-logout.png"></li>
        </ul>

        <!-- DESKTOP TEMPLATE -->

        <!-- Tools menu -->
        <ul class="tools-menu desktop">
            <li>
                <label>Sitio: </label>
                <select></select>
            </li>
            <li><span @click="toggleTool('notes-desktop')">Notas</span></li>
            <li><span @click="toggleTool('leads-desktop')">Prospectos</span></li>
            <li><span @click="toggleTool('email-desktop')">Email</span></li>
        </ul>

        <!-- User menu -->
        <ul class="user-menu desktop">
            <li><span @click="logout">Cerrar sesión |&nbsp;</span></li>
            <li><span @click="toggleTool('team-desktop')">Admin</span></li>
        </ul>
    </nav>
</template>
<script>
    import axios from '@/lib/axios';
    export default {
        name: 'NavbarParentComponent',
        props: {
            userId: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                websites: null
            }
        },
        created() {
            // console.log(this.userId);
            this.loadWebsites(this.userId);
        },
        methods: {
            toggleTool(selection){
                this.$emit('toggle-tool', selection);
            },
            loadWebsites(id){
                axios.get('/api/website/records/'+id, { 'withCredentials': true })
                .then(res=>{
                    this.websites = res.data.websites;
                    console.log(this.websites);
                })
                .catch(error=>{
                    console.log(error);
                });
            },
            logout(){
                this.$emit('user-logged-out');
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
        box-shadow: 0px 2px 6px var(--shadows);
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
        width: 38px;
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