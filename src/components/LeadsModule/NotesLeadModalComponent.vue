<template>
    <div class="modal-screen">
        <!-- Main window -->
        <div class="modal-container">

            <div class="modal-header">
                <span>Seguimiento</span>
                <span class="close-cross" @click="closeNotesModal">&times;</span>
            </div>

            <div class="modal-body">

                <!-- Customer message -->
                <div class="lead-message-container">
                    <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta quos sunt architecto tempora
                        ipsum, ducimus quae molestiae beatae laudantium recusandae non explicabo laboriosam quasi ullam
                        accusamus vero assumenda voluptatem quibusdam.
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta quos sunt architecto tempora
                        ipsum, ducimus quae molestiae beatae laudantium recusandae non explicabo laboriosam quasi ullam
                        accusamus vero assumenda voluptatem quibusdam.
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta quos sunt architecto tempora
                        ipsum, ducimus quae molestiae beatae laudantium recusandae non explicabo laboriosam quasi ullam
                        accusamus vero assumenda voluptatem quibusdam.
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta quos sunt architecto tempora
                        ipsum, ducimus quae molestiae beatae laudantium recusandae non explicabo laboriosam quasi ullam
                        accusamus vero assumenda voluptatem quibusdam.
                    </p>
                </div>

                <!-- Team bulletin board -->
                <div class="bulletin-board">
                    <!-- Comment component -->
                    <div class="comment-container">
                        Comment
                    </div>
                    <div class="comment-container">
                        Kommentar
                    </div>

                    <div class="comment-container">
                        Comentario
                    </div>
                    <div class="comment-container">
                        Comment
                    </div>
                    <div class="comment-container">
                        Kommentar
                    </div>

                    <div class="comment-container">
                        Comentario
                    </div>
                    <div class="comment-container">
                        Comment
                    </div>
                    <div class="comment-container">
                        Kommentar
                    </div>

                    <div class="comment-container">
                        Comentario
                    </div>
                    <div class="comment-container">
                        Comment
                    </div>
                    <div class="comment-container">
                        Kommentar
                    </div>

                    <div class="comment-container">
                        Comentario
                    </div>
                </div>

                <!-- Comment box -->
                <div class="comment-box-container">
                    <div class="input-comment-block">
                        <input class="input-primary" type="text">
                        <button class="btn-warning">aceptar</button>
                    </div>
                </div>


            </div>

        </div>

    </div>

</template>

<script>
export default {
    name: 'NotesLeadModalComponent',
    methods: {
        closeNotesModal() {
            this.$emit('close-notes-modal');
        }
    }
}

</script>

<style scoped>
.modal-container {
    width: 80%;
    box-shadow: 4px 4px 16px var(--shadows);
    border-radius: .5rem;
}

.modal-header {
    padding: .5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--primary);
    border-top-left-radius: .5rem;
    border-top-right-radius: .5rem;
    color: var(--basic);
}

.modal-body {
    padding: .5rem;
    background-color: var(--basic);
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    border-bottom-left-radius: .5rem;
    border-bottom-right-radius: .5rem;
}

.lead-message-container {
    padding: 1rem;
    border: 1px solid var(--primary);
    overflow-y: auto;
    margin-bottom: 1rem;
    border-radius: 4px;
    height: 20vh;
    box-sizing: border-box;
    /* background-color: var(--shadows);
    color: var(--accent); */
}

.bulletin-board {
    padding: .5rem;
    border: 1px solid var(--primary);
    overflow-y: auto;
    margin-bottom: 1rem;
    border-radius: 4px;
    box-sizing: border-box;
    height: 30vh;
}

.comment-container {
    background-color: var(--primary);
    width: 100%;
    border-radius: 4px;
    margin-bottom: .5rem;
    padding: .5rem;
    box-sizing: border-box;
}

.comment-box-container {
    padding: 0 .5rem;
    overflow-y: auto;
}

.input-comment-block {
    display: flex;
    flex-direction: column;
    align-items: center
}

.input-comment-block input[type="text"] {
    margin-bottom: .5rem;
    width: 100%;
    box-sizing: border-box;
}

.input-comment-block button {
    width: 70px;
}

@media only screen and (min-width: 1024px) {
    .modal-container {
        width: 35%;
    }
}
</style>