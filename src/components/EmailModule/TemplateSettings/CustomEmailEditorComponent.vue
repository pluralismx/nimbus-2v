<template>
    <section>
        <!-- Subject -->
        <div class="settings-container">
            <!-- Title -->
            <div class="settings-header">
                <span>Asunto del correo</span>
            </div>
            <!-- Content -->
            <div class="settings-body">
                <!-- Facebook -->
                <div class="text-input-block">
                    <label>Asunto</label>
                    <div>
                        <input v-model="subject" class="input-primary" type="text">
                    </div>
                </div>
            </div>
        </div>

        <div class="settings-container">
            <!-- Title -->
            <div class="settings-header">
                <span>Editor de texto plano e hipertexto</span>
            </div>
            <div class="settings-body">
                <!-- HTML -->
                <textarea v-model="custom_template"></textarea>
            </div>
            
        </div>
        <div class="save-button-container">
            <button @click="saveFormData" class="btn-primary">guardar cambios</button>
        </div>
    </section>



</template>
<script>
    import axios from '@/lib/axios';
    import Cookies from 'js-cookie';
    export default {
        name: 'CustomEmailEditorComponent',
        props: {
            isSelected: {
                type: String,
                required: true
            },
            website: {
                type: Number,
                required: true
            }
        },
        data() {
            return {
                custom_template: '',
                subject: ''
            }
        },
        watch: {
            custom_template: {
                handler(){
                    if(this.isSelected == 'custom'){
                        this.html();
                    }
                },
                immediate: true,
                deep: true
            },
            subject: {
                handler(){
                    this.html();
                }
            },
            website: {
                handler: async function (newVal) {
                    if(this.isSelected == "custom"){
                        const savedData = Cookies.getJSON('custom-template'+newVal);
                        if (savedData) {
                            this.subject = savedData.subject;
                            this.custom_template = savedData.templateData;
                        }else {
                            let byDefault = await this.loadTemplate();
                            if(byDefault == false){
                                this.custom_template = ":(";
                            }
                        }
                    }
                }
            }
        },
        methods: {
            html: function (){
                let b64 = btoa(this.custom_template)
                this.$emit('update-html-template', {
                    "subject": this.subject,
                    "body": b64
                });
            },
            saveFormData: async function() {
                // Guardar los datos del formulario en una cookie
                Cookies.set('custom-template'+this.website, { subject: this.subject, templateData: this.templateData }, { expires: 28 });
                
                const template = {
                    name: 'custom',
                    template: {
                        subject: this.subject,
                        templateData: this.custom_template
                    }
                }
                let formData = new FormData();
                formData.append('json', JSON.stringify(template));
                const response = await axios.post('/api/email/saveTemplate/'+this.website, formData, {withCredentials: true});
                if(response.data.status == "success"){
                    console.log(response.data);
                }else{
                    console.log(response.data);
                }

                alert('Se guardaron los cambios');
            },
            loadTemplate: async function () {
                const response = await axios.get('api/email/myTemplates/'+this.website+'/custom', {withCredentials: true});
                if(response.data.status == "success"){
                    let json = JSON.parse(response.data.template);
                    this.subject = json.subject;
                    this.custom_template = json.templateData;
                }else{
                    return Promise.resolve(false);
                }
            }
        }
    }
</script>
<style scoped>

.settings-container {
    margin-top: 2rem;
    box-shadow: 2px 2px 6px var(--shadows);
    border-radius: .5rem;
}

.settings-header {
    background-color: var(--primary);
    color: var(--basic);
    padding: .5rem;
    border-top-left-radius: .5rem;
    border-top-right-radius: .5rem;
}
.settings-body {
    display: flex;
    flex-direction: column;
    padding: 0 1rem;
}

.text-input-block {
    margin: 1rem 0;
}

.text-input-block div {
    margin-top: .5rem;
}

.text-input-block input[type="text"] {
    width: 100%;
    box-sizing: border-box;
}

textarea {
    margin: 1rem 0;
    height: 17.5rem;
    border: 1px solid var(--primary);
    resize: none;
    color: var(--primary);
    border-radius: .5rem;
    padding: .5rem;
    box-sizing: border-box;
}

textarea:focus {
    outline:none;
}

.save-button-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 16px;
}

</style>