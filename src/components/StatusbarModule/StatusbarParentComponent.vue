<template>
    <footer>

    </footer>
</template>
<script>
    export default {
        name: 'StatusbarParentComponent'
    }
</script>
<style>
    
    /* Mobile first */

    footer {
        grid-column: 1/2;
        grid-row: 3/4;
        background-color: var(--shadows);
    }

    /* Desktop */

    @media only screen and (min-width: 1024px) {
        footer {
            display: block;
            grid-column: 1/3;
            grid-row: 3/4;
        }
    }


</style>