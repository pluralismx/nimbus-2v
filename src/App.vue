<template>

    <!-- Login -->
    <div id="login" v-if="!isLogged">
        <LoginParentComponent />
    </div>

    <!-- Dashboard -->
    <div id="dashboard" v-if="isLogged">
        <!-- Navigation bar -->
        <section class="navbar-container">
            <!-- Navbar -->
            <NavbarComponent />
        </section>

        <!-- Aside -->
        <section class="aside-container" v-show="isVisibleAsideComponent">
            <!-- Notes -->
            <NotesParentComponent />
        </section>

        <!-- Center -->
        <section :class="{ 'main-container': true, 'wide': !isVisibleAsideComponent }">

            <!-- Leads -->
            <LeadsParentComponent 
                v-show="isVisibleLeadsComponent"
            />
            <!-- Email -->
            <EmailParentComponent 
                v-show="isVisibleEmailComponent"
            />
        </section>

        <!-- Footer -->
        <section class="footer-container">
            <!-- Footer -->
            <FooterParentComponent />
        </section>
    </div>


</template>

<script>
    import LoginParentComponent from './components/LoginModule/LoginParentComponent.vue';
    import NavbarComponent from './components/Layout/NavbarComponent.vue';
    import NotesParentComponent from './components/NotesModule/NotesParentComponent.vue';
    import LeadsParentComponent from './components/LeadsModule/LeadsParentComponent.vue';
    import EmailParentComponent from './components/EmailModule/EmailParentComponent.vue';
    import FooterParentComponent from './components/Layout/FooterComponent.vue';

    export default {
        name: 'App',
        components: {
            LoginParentComponent,
            NavbarComponent,
            NotesParentComponent,
            LeadsParentComponent,
            EmailParentComponent,
            FooterParentComponent
        },
        data() {
            return {
                isLogged: true,
                isVisibleAsideComponent: true,

                // Modificar
                isVisibleLeadsComponent: true,
                isVisibleEmailComponent: false,
            }
        }
    }
</script>

<style>

    /* Login */

    #login {
        box-sizing: border-box;
        height: 100vh;
        width: 100vw;
    }

    /* Dashboard */

    #dashboard {
        box-sizing: border-box;
        display: grid;
        grid-template-columns: 20vw 80vw;
        grid-template-rows: 8vh 86vh 6vh;
    }

    .navbar-container {
        background-color: blue;
        grid-row: 1/2;
        grid-column: 1/3;
    }

    .aside-container {
        background-color: green;
        grid-row: 2/3;
        grid-column: 1/2;
    }

    .main-container {
        background-color: yellow;
        grid-row: 2/3;
        grid-column: 2/3;
    }

    .wide {
        grid-column: 1/3; 
    }

    .footer-container {
        background-color: red;
        grid-row: 3/4;
        grid-column: 1/3;
    }

    @media only screen and (max-width: 768px) {
        
        #dashboard {
            display: grid;
            grid-template-columns: 100vw;
            grid-template-rows: 12vh 82vh 6vh;
        }

        .navbar-container {
            background-color: blue;
            grid-row: 1/2;
            grid-column: 1/2;
        }

        .aside-container {
            display: none;
        }

        .main-container {
            background-color: yellow;
            grid-row: 2/3;
            grid-column: 1/2;
        }

        .footer-container {
            background-color: red;
            grid-row: 3/4;
            grid-column: 1/2;
        }

    }
</style>
