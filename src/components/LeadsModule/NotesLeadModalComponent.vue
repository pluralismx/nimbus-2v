<template>
    <div class="modal-screen">
        <!-- Main window -->
        <div class="modal-container">

            <div class="modal-header">
                <span class="lead-card-name">{{ lead.name }}</span>
                <span class="close-cross" @click="closeNotesModal">&times;</span>
            </div>

            <div class="modal-body">

                <!-- Customer message -->
                <div class="lead-message-container">
                    <p>
                        {{ lead.message }}
                    </p>
                </div>

                <!-- Team bulletin board -->
                <div class="bulletin-board">
                    <!-- Comment component -->
                    <div v-for="leadNote in leadNotes" :key="leadNote.id" class="comment-container">
                        <div class="comment-signature">
                            <span>Created by {{ leadNote.name }}&nbsp;{{ leadNote.surname }}&nbsp;</span>
                            <span>at {{ leadNote.date }}</span>
                            <p>
                                {{leadNote.content}}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Comment box -->
                <div class="comment-box-container">
                    <div class="input-comment-block">
                        <input class="input-primary" type="text" v-model="new_comment">
                        <button class="btn-warning" @click="saveLeadNote()">aceptar</button>
                    </div>
                </div>


            </div>

        </div>

    </div>

</template>

<script>
import axios from '@/lib/axios';

export default {
    name: 'NotesLeadModalComponent',
    props: {
        lead: {
            type: Object,
            required: true
        },
        leadNotes: {
            type: Array,
            required: true
        },
    },
    data() {
        return {
            new_comment: '',
        }
    },
    methods: {
        closeNotesModal() {
            this.$emit('close-notes-modal');
        },
        saveLeadNote: async function () {

            const json = {
                "content":this.new_comment, 
                "lead_id": this.lead.id
            };

            let formData = new FormData();
            formData.append('json', JSON.stringify(json));

            const response = await axios.post('api/lead/addNote', formData, {'withCredentials': true});
            if(response.data.status=="success"){
                this.$emit('lead-note-added', this.lead.id);
                this.new_comment = '';
            }
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

.lead-card-name {
    white-space: nowrap;
    overflow-y: hidden;
}

.modal-body {
    padding: .5rem;
    background-color: var(--accent);
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    border-bottom-left-radius: .5rem;
    border-bottom-right-radius: .5rem;
}

.lead-message-container {
    padding: .5rem;
    border: 1px solid var(--primary);
    overflow-y: auto;
    margin-bottom: 1rem;
    border-radius: 4px;
    height: 17vh;
    box-sizing: border-box;
    background-color: var(--shadows);
    color: var(--accent);
    line-height: 1.5;
    font-size: 12px;
}

.bulletin-board {
    padding: .5rem;
    background-color: var(--shadows);
    border: 1px solid var(--primary);
    overflow-y: auto;
    margin-bottom: 1rem;
    border-radius: 4px;
    box-sizing: border-box;
    height: 50svh;
    
}

.comment-container {
    background-color: var(--primary);
    color: var(--basic);
    width: 100%;
    border-radius: 4px;
    margin-bottom: .5rem;
    padding: .5rem;
    box-sizing: border-box;
    font-size: 12px;
}

.comment-box-container {
    overflow-y: auto;
}

.input-comment-block {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.input-comment-block input[type="text"] {
    width: 100%;
    box-sizing: border-box;
    margin-right: 1rem;
}

.input-comment-block button {
    width: 70px;
}

@media only screen and (min-width: 1024px) {
    .modal-container {
        width: 35%;
    }

    .modal-body {
        padding: 1rem;
    }

    .lead-message-container {
        padding: 1rem;
        height: 17vh;
        font-size: 14px;
    }

    .bulletin-board {
        height: 35vh;
    }

    .comment-container {
        background-color: var(--primary);
        color: var(--basic);
        width: 100%;
        border-radius: 4px;
        margin-bottom: .5rem;
        padding: .5rem;
        box-sizing: border-box;
        font-size: 14px;
    }
}
</style>