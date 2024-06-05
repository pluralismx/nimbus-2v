<template>
    <div class="main-container">
        <h1>Prospectos</h1>
        <div class="title-bar-menu">
            <span @click="saveLead()">agregar</span>
            <span>&nbsp;|&nbsp;</span>
            <span @click="uploadCvs()">cargar CVS</span>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'LeadsTitleBarComponent',
        methods: {
            saveLead: function (){
                this.$emit('save-lead');
            },
            uploadCvs: function () {
                this.$emit('show-upload-cvs');
            }
        }
    }
</script>
<style scoped>

    /* Mobile first */

    .main-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: .5rem;
        border-bottom: 1px solid var(--shadows);
        color: var(--shadows);
        margin-bottom: 1.5rem;
        width: 100%;
    }

    span:hover {
        cursor: pointer;
    }


</style>