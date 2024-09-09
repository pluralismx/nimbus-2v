<template>
    <div>
        <h1>Mi productos y servicio</h1>
    </div>
</template>
<script>
export default {
    name: "ProductTitleBarComponent",
}
</script>
<style scoped>
/* Mobile first */
div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: .5rem;
    border-bottom: 1px solid var(--shadows);
    color: var(--shadows);
    margin-bottom: 1.5rem;
    width: 100%;
}

span {
    font-size: 1.5rem;
}

span:hover {
    cursor:pointer;
}
</style>