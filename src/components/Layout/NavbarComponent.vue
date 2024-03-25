<template>
    <nav>
        <!-- Menu desktop-->
        <ul class="menu">
            <li>
                <label for="website">Sitio: </label>
                <select>
                    <option>Sitio 1</option>
                    <option>Sitio 2</option>
                    <option>Sitio 3</option>
                </select>
            </li>
            <li><span>Notas</span></li>
            <li><span>Prospectos</span></li>
            <li><span>Email</span></li>
        </ul>

        <!-- Settings desktop-->
        <ul class="settings">
            <li><span>Cerrar sesión</span></li>
        </ul>

        <ul class="mobile-website">
            <li>
                <label for="website">Sitio</label>
                <input type="text">
            </li>
        </ul>

    </nav>
</template>
<script>
    export default {
        name: 'NavbarComponent'
    }
</script>
<style scoped>

    nav {
        background-color: var(--primary);
        height: 100%;
        width: 100%;
        z-index: 90;
        position: relative;
        box-shadow: 0 3px 6px var(--shadows);
        display: grid;
        grid-template-columns: 50% 50%;
        grid-template-rows: 100%;
        padding: 0 1rem;
        box-sizing: border-box;
        color: var(--basic);
    }

    ul li {
        padding: 0;
        margin: 0;
    }

    select {
        width: 200px;
    }

    span:hover {
        color: var(--accent);
        cursor: pointer;
    }


    .menu {
        margin: 0;
        list-style: none;
        padding: 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    
    .settings {
        margin: 0;
        list-style: none;
        padding: 0;
        display: flex;
        flex-direction: row;
        justify-content: right;
        align-items: center;
    }

    @media only screen and (max-width: 768px) {

        /* Hiding desktop elements... */

        .menu {
            display: none;
        }
        
        .settings {
            display: none;
        }


        ul li {
            padding: 0;
            margin: 0;
        }

        select {
            width: 200px;
        }

        /* Actual mobile set up */

        nav {
            background-color: var(--primary);
            height: 100%;
            width: 100%;
            z-index: 90;
            position: relative;
            box-shadow: 0 3px 6px var(--shadows);
            display: grid;
            grid-template-columns: 100%;
            grid-template-rows: 50% 50%;
            padding: 0 1rem;
            box-sizing: border-box;
            color: var(--basic);
        }

        .mobile-website {
            list-style-type: none;
            padding: 0;
            margin: 0;
        }




    }




</style>