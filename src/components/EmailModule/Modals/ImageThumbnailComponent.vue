<template>
    <div class="img-thumbnail" @click="imageSelected()">
        <img :src="'http://localhost/api-nimbus/storage/app/websites/' + image.name">
    </div>
</template>
<script>
export default {
    name: 'ImageThumbnailComponent',
    props: {
        image: {
            type: Object,
            required: true
        }
    },
    methods: {
        imageSelected: function () {
            this.$emit('image-selected', this.image.name);
        }
    }
}
</script>
<style scoped>

.img-thumbnail {
    flex: 0 0 calc(33% - 6px);
    margin: 3px;
    box-sizing: border-box;
    align-self: flex-start;
    justify-self: flex-start;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    padding: 4px;
}

.img-thumbnail img {
    width: 100%;
}

.img-thumbnail:hover {
    background-color: rgba(80, 80, 80, .5);
}

@media only screen and (min-width: 1024px) {
    .img-thumbnail {
        padding: 8px;
    }
}
</style>