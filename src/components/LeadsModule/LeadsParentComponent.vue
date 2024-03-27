<template>
    <section>
        <LeadsTitleBarComponent />
        <!-- Mobile devices -->
        <LeadComponent v-if="smViewport"/>

        <!-- Desktop devices -->
        <LeadsTableComponent v-else />
    </section>
</template>
<script>

    import LeadsTitleBarComponent from './LeadsTitleBarComponent.vue';
    import LeadComponent from './LeadComponent.vue';
    import LeadsTableComponent from './LeadsTableComponent.vue';

    export default {
        name: 'LeadsParentComponent',
        components: {
            LeadsTitleBarComponent,
            LeadComponent,
            LeadsTableComponent
        },
        props: {
            smViewport: {
                type: Boolean,
                required: true
            }
        },
    }
</script>
<style scoped>
    
    /* Mobile first */

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