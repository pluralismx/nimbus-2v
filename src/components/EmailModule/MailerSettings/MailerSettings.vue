<template>
    <section>
        <div class="settings-container">
            <div class="settings-header">
                <span>Configuración de cuenta de correo</span>
            </div>
            <div class="settings-body">
                <div class="text-input-block">
                    <label>Email</label>
                    <div>
                        <input v-model="email" class="input-primary" type="text"/>
                    </div>
                </div>

                <div class="text-input-block">
                    <label>Contraseña</label>
                    <div>
                        <input v-model="password" class="input-primary" type="password"/>
                    </div>
                </div>

                <div class="text-input-block">
                    <label>Confirmar contraseña</label>
                    <div>
                        <input v-model="verified" class="input-primary" type="password"/>
                    </div>
                </div>

                <div class="text-input-block">
                    <label>Servidor SMTP</label>
                    <div>
                        <input v-model="smtpServer" class="input-primary" type="text"/>
                    </div>
                </div>

                <div class="text-input-block">
                    <label>Puerto</label>
                    <div>
                        <input v-model="smtpPort" class="input-primary" type="text"/>
                    </div>
                </div>
            </div>
            <div class="settings-footer">
                <button class="btn-warning" @click="addEmail()">guardar</button>
            </div>
        </div>
    </section>
</template>
<script>
import axios from '@/lib/axios'
export default {
    name: 'MailerSettingsComponent',
    props: {
        website: {
            type: Number,
            required: true
        }
    },
    watch: {
        website: {
            handler(){
                this.showEmailSettings();
            }
        }
    },
    data() {
        return {
            email: '',
            password: '',
            smtpServer: '',
            smtpPort: 465
        }
    },
    methods: {
        showEmailSettings: async function () {
            try {
                const response = await axios.get("api/website/websiteEmail/" + this.website, { withCredentials: true });
                if (response.data.status === "success") {
                    this.email = response.data.website_email;
                    this.smtpServer = response.data.email_server;
                } else {
                    // Opcionalmente, maneja el caso cuando la respuesta no es exitosa
                }
            } catch (error) {
                // Silenciar el error
                // Puedes añadir algún código opcional aquí si quieres manejar el error de otra manera
            }
        },
        addEmail: async function () {

            let password;
            if(this.verified === this.password){
                password = this.verified;
            }

            let formData = new FormData();
            const json = {
                "id_website": this.website,
                "email": this.email,
                "password": password, 
                "smtp_port": this.smtpPort,
                "smtp_server": this.smtpServer
            }
            formData.append('json', JSON.stringify(json));

            const response = await axios.post('api/website/addEmailAccount', formData, {"withCredentials": true});
            if(response.data.status == "success"){
                this.$emit('email-added', {
                    "text":"Se agrego la cuenta de correo",
                    "status":"success"
                });
            }else if(response.data.message == "Forbidden"){
                this.$emit('email-added', {
                    "text":"No eres el propietario del sitio",
                    "status":"error"
                });
            }else{
                this.$emit('email-added', {
                    "text":"No se pudo agregar la cuenta",
                    "status":"error"
                });
            }
        }
    }
}
</script>
<style scoped>
.settings-container {
    margin-top: 1rem;
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

.text-input-block input[type="text"], input[type="password"] {
    width: 100%;
    box-sizing: border-box;
}

.settings-footer {
    padding: 1rem 0;
    display: flex;
    justify-content: center;
}

@media only screen and (min-width: 1024px){
    .settings-container {
        margin-top: 0;
    }
}
</style>