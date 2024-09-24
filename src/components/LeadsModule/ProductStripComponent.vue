<template>
    <div class="added-product-container">
        <span class="close-cross" @click="addMore()">{{ product.qty }}</span>
        <span>{{ product.name }}</span>
        <span class="close-cross" @click="removeItem()">&times;</span>
    </div>
</template>
<script>
export default {
    name: "ProductStripComponent",
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    methods: {
        removeItem: function () {
            this.$emit('remove-item', this.product.id);
        },
        addMore: function () {
            this.$emit('add-other', this.product.id);
        }
    }
}
</script>
<style scoped>
    .added-product-container {
        padding: .5rem;
        border-radius: 1rem;
        background-color: var(--primary);
        box-shadow: 1px 1px 2px rgba(0,0,0,0.6);
        color: var(--basic);
        margin-bottom: .5rem;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>