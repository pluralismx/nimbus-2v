<template>
    <section>
        Leads parent component
    </section>
</template>
<script>
    export default {
        name: 'LeadsParentComponent'
    }
</script>
<style>
    
    /* Mobile first */

    section {
        grid-column: 1/2;
        grid-row: 2/3;
        background-color: var(--basic);
    }

    /* Desktop */

    @media only screen and (min-width: 1024px) {
        section {
            grid-column: 2/3;
            grid-row: 2/3;
        }

        .wide {
            grid-column: 1/3;
            grid-row: 2/3;
        }
    }


</style>