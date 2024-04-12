<template>
    <div class="preview-wrapper">
        <div class="preview-container">

        </div>
    </div>
</template>
<script>
    export default {
        name: 'WizardPreviewComponent'
    }
</script>
<style>
    .preview-wrapper {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 1rem;
        background-color: #333;
    }
    .preview-container {
        box-sizing: border-box;
        background-color: var(--basic);
        width: 100%;
        height: 100%;
        border-radius: .5rem;
    }
</style>