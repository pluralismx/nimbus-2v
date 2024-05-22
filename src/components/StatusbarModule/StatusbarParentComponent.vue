<template>
    <footer>
        <span v-show="isVisible" :class="message.status == 'error' ? 'red' : 'green' ">{{ message.text }}</span>
    </footer>
</template>
<script>
    export default {
        name: 'StatusbarParentComponent',
        props: {
            message: {
                type: Object,
                required: true
            }
        },
        watch: {
            message: {
                handler(){
                    this.showStatusMessage();
                }
            }
        },
        methods: {
            showStatusMessage: function () {
                this.isVisible=true;
                setTimeout(()=>{
                    this.isVisible=false;
                }, 2000);
            }
        },
        data() {
            return {
                isVisible: false
            }
        }
    }
</script>
<style scoped>

    span {
        color: white;
    }

    .green {
        color: yellowgreen;
    }

    .red {
        color: red;
    }
    
    /* Mobile first */

    footer {
        grid-column: 1/2;
        grid-row: 3/4;
        background-color: var(--shadows);
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 0 1rem;
    }

    /* Desktop */

    @media only screen and (min-width: 1024px) {
        footer {
            grid-column: 1/3;
            grid-row: 3/4;
        }
    }


</style>