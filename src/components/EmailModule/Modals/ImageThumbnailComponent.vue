<template>
    <div class="img-thumbnail" @click="imageSelected()">
        <span class="modal-close" @click="deleteImage()">&times;</span>
        <img :src="imageUrl">
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
        },
        deleteImage: function () {
            this.$emit('delete-image', this.image.id);
        }
    },
    computed: {
        imageUrl() {
            return `${process.env.VUE_APP_IMAGE_PATH}/${this.image.name}`;
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
    position: relative;
}

span {
    position: absolute;
    top: 1rem;
    left: 1rem;
    color: white;
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