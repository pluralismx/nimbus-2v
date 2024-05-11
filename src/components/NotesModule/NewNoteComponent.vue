<template>
    <article class="note-container">
        <div class="note-header">
            <input v-model="title" type="text" placeholder="Título">
        </div>
        <div class="note-body">
            <textarea v-model="content" placeholder="Escribe algo interesante"></textarea>
        </div>
        <div class="note-footer">
            <button class="btn-primary" @click="saveNote">guardar</button>
        </div>
    </article>
</template>
<script>
import axios from '@/lib/axios';

    export default {
        name: 'NotesTitleBarComponent',
        props: {
            websiteId: {
                type: Number,
                required: true
            }
        },
        data () {
            return {
                title: '',
                content: ''
            }
        },
        methods: {
            saveNote: async function () {

                let identity = localStorage.getItem('identity');
                let credentials = JSON.parse(identity);
                let user_id = credentials.sub;

                let formData = new FormData();
                const json = {
                    'id_user': user_id,
                    'id_website': this.websiteId,
                    'title': this.title,
                    'content': this.content
                }

                formData.append('json', JSON.stringify(json));

                const response = await axios.post('api/note/create', formData, {"withCredentials": true});
                if(response.data.status=="success"){
                    console.log("note created");
                }else{
                    console.log(response.data);
                }
            }
        }
    }
</script>
<style scoped>

    /* Mobile first */
    .note-container {
        background-color: var(--basic);
        border-radius: .5rem;
        box-shadow: 2px 2px 3px var(--shadows);
        box-sizing: border-box;
        width: 100%;
        height: 45vh;
        margin-bottom: 2rem;
        position: relative;
        z-index: 85;
    }

    .note-header {
        height: 15%;
        border-bottom: 1px solid var(--primary);
    }

    .note-header input{
        background-color: transparent;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 1rem;
        border: none;
        color: var(--shadows);
        font-size: 16px;
    }

    .note-header input:focus{
        outline: none;
    }

    .note-body {
        height: 70%;
        background-color: transparent;
        border-bottom: 1px solid var(--primary);
    }

    .note-body textarea {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 1rem;
        background-color: transparent;
        border: none;
        font-family: 'regular';
        color: var(--shadows);
        resize: none;
    }

    .note-body textarea:focus{
        outline: none;
    }

    .note-footer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 15%;
        background-color: transparent;
        border: none;
    }


</style>
