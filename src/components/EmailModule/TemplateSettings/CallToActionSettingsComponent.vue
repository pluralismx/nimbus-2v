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

        <!-- Header -->
        <div class="settings-container">
            <!-- Title -->
            <div class="settings-header">
                <span>Cabecera y pancarta</span>
            </div>
            <!-- Content -->
            <div class="settings-body">
                <!-- Logo -->
                <div class="image-input-block">
                    <label>Logotipo</label>
                    <div>
                        <input v-model="templateData.logo" class="input-primary" type="text">
                        <button class="btn-primary" @click="openImageModal('headerImage')">imagen...</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Body -->
        <div class="settings-container">
            <!-- Title -->
            <div class="settings-header">
                <span>Introducción</span>
            </div>
            <div class="settings-body">
                <!-- Heading -->
                <div class="text-input-block">
                    <label>Título</label>
                    <div>
                        <input v-model="templateData.title" class="input-primary" type="text">
                    </div>
                </div>

                <!-- Content -->
                <div class="text-input-block">
                    <label>Texto</label>
                    <div>
                        <textarea v-model="templateData.content"></textarea>
                    </div>
                </div>
            </div>

        </div>

        <!-- Banner -->
        <div class="settings-container">
            <!-- Title -->
            <div class="settings-header">
                <span>Pancarta</span>
            </div>
            <!-- Content -->
            <div class="settings-body">
                <!-- Logo -->
                <div class="image-input-block">
                    <label>Pancarta</label>
                    <div>
                        <input v-model="templateData.banner" class="input-primary" type="text">
                        <button class="btn-primary" @click="openImageModal('bannerImage')">imagen...</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Call to action button -->
        <div class="settings-container">
            <!-- Title -->
            <div class="settings-header">
                <span>Botón de llamada a la acción</span>
            </div>
            <!-- Content -->
            <div class="settings-body">
                <!-- Text -->
                <div class="text-input-block">
                    <label>Texto</label>
                    <div>
                        <input v-model="templateData.buttonText" class="input-primary" type="text">
                    </div>
                </div>
                <!-- Link -->
                <div class="text-input-block">
                    <label>Enlace</label>
                    <div>
                        <input v-model="templateData.buttonLink" class="input-primary" type="text">
                    </div>
                </div>
            </div>
        </div>

        <!-- Social -->
        <div class="settings-container">
            <!-- Title -->
            <div class="settings-header">
                <span>Redes sociales</span>
            </div>
            <!-- Content -->
            <div class="settings-body">
                <!-- Facebook -->
                <div class="text-input-block">
                    <label>Facebook URL</label>
                    <div>
                        <input v-model="templateData.facebook_link" class="input-primary" type="text">
                    </div>
                </div>
                <!-- Instagram -->
                <div class="text-input-block">
                    <label>Instagram URL</label>
                    <div>
                        <input v-model="templateData.instagram_link" class="input-primary" type="text">
                    </div>
                </div>
                <!-- Youtube -->
                <div class="text-input-block">
                    <label>Youtube URL</label>
                    <div>
                        <input v-model="templateData.youtube_link" class="input-primary" type="text">
                    </div>
                </div>
            </div>
        </div>

        <!-- Contact -->
        <div class="settings-container">
            <!-- Title -->
            <div class="settings-header">
                <span>Contacto</span>
            </div>
            <!-- Content -->
            <div class="settings-body">
                <!-- Image -->
                <div class="image-input-block">
                    <label>Logotipo</label>
                    <div>
                        <input class="input-primary" type="text" v-model="templateData.footer">
                        <button class="btn-primary" @click="openImageModal('footerImage')">imagen...</button>
                    </div>
                </div>
                <!-- Slogan -->
                <div class="text-input-block">
                    <label>Slogan</label>
                    <div>
                        <input v-model="templateData.slogan" class="input-primary" type="text">
                    </div>
                </div>
                <!-- Address -->
                <div class="text-input-block">
                    <label>Dirección</label>
                    <div>
                        <input v-model="templateData.address" class="input-primary" type="text">
                    </div>
                </div>
                <!-- E-mail -->
                <div class="text-input-block">
                    <label>E-mail</label>
                    <div>
                        <input v-model="templateData.email" class="input-primary" type="text">
                    </div>
                </div>
                <!-- Phone -->
                <div class="text-input-block">
                    <label>Teléfono</label>
                    <div>
                        <input v-model="templateData.phone" class="input-primary" type="text">
                    </div>
                </div>
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
    import { render } from '../Templates/CallToAction.js'
    export default {
        name: 'CallToActionSettingsComponent',
        props: {
            isSelected: {
                type: String,
                required: true
            },
            theme: {
                type: String,
                required: true
            },
            image: {
                type: Object,
                required: true
            },
            suscription: {
                type: String,
                required: true
            },
            website: {
                type: Number,
                required: true
            }
        },
        computed: {
            setTheme() {
                return this.theme;
            }
        },
        watch: {
            setTheme: {
                handler(newVal) {
                    this.templateData.theme = newVal;
                },
                immediate: true,
                deep: true
            },
            isSelected: {
                handler(newVal){
                    if(newVal === 'callToAction'){
                        this.html();
                        const savedData = Cookies.getJSON('callToAction-template'+this.website);
                        if (savedData) {
                            this.subject = savedData.subject;
                            this.templateData = savedData.templateData;
                        }else {
                            this.loadTemplate();
                        } 
                    }

                },
                immediate: true,
                deep: true
            },
            templateData: {
                handler(){
                    if(this.isSelected === 'callToAction'){
                        this.html();
                    }
                },
                immediate: true,
                deep: true
            },
            image: {
                handler() {
                    switch(this.image.section){
                        case 'headerImage' :
                            this.templateData.logo = process.env.VUE_APP_IMAGE_PATH+"/"+this.image.image_name;
                            break;
                        case 'bannerImage' :
                            this.templateData.banner = process.env.VUE_APP_IMAGE_PATH+"/"+this.image.image_name;
                            break;
                        case 'footerImage' :
                            this.templateData.footer = process.env.VUE_APP_IMAGE_PATH+"/"+this.image.image_name;
                            break;
                    }       
                },
            },
            subject: {
                handler(){
                    this.html();
                }
            },
            website: {
                handler: async function (newVal) {
                    if(this.isSelected == "callToAction"){
                        const savedData = Cookies.getJSON('callToAction-template'+newVal);
                        if (savedData) {
                            this.subject = savedData.subject;
                            this.templateData = savedData.templateData;
                        }else {
                            let byDefault = await this.loadTemplate();
                            if(byDefault == false){
                                this.subject = '';
                                this.templateData.logo= "http://api.nimbus.pluralis.com.mx/assets/logo-template.png";
                                this.templateData.banner= "http://api.nimbus.pluralis.com.mx/assets/banner-template.png";
                                this.templateData.title= 'Daedalus et Icarus';
                                this.templateData.content= 'Daedalus, faber ingeniosus, fuit artifex eximius qui Minos, rex Cretensis, auxiliatus est construere labyrinthum in quo Minotaurus, monstro feroce, inclusus est. Sed Daedalus et filius eius, Icarus, a rege in labyrintho inclusi sunt. Non poterant effugere per vias labyrinthi, itaque Daedalus consilium cepit.<br/><br/>Daedalus de pennarum ordine cogitavit. Ipse sibi alas fecit ex cera et plumis, et ínter eas adhesit plumas leviores. Postquam alas sibi et Icaro imposuit, admonuit filium ne nimium ad caelum attolleret neve nimium appropinquare soli.<br/><br/>Sed Icarus, juvenis temerarius, gaudebat nova potentia alarum. Volabat in caelum, felix et libere, sed, ob audaciam, solis radiis nimium appropinquavit. Cera, quae alas iungebat, solis ardori liquefacta est, et Ícarus in mare cecidit. Pater, aegre dolens, Ícarum nuncupavit, atque sedibus caeli debitum poenam petivit.';
                                // Button text
                                this.templateData.buttonText= 'ver mas...';
                                this.templateData.buttonLink= 'pluralis.com.mx';
                                // social link
                                this.templateData.facebook_link= null;
                                this.templateData.instagram_link= null;
                                this.templateData.youtube_link= null;
                                // footer
                                this.templateData.footer= "http://api.nimbus.pluralis.com.mx/assets/logo-template.png";
                                this.templateData.slogan="Mi empresa - Slogan";
                                this.templateData.address="Mi ciudad, pais";
                                this.templateData.email="ejemplo@correo.com";
                                this.templateData.phone="+1234567890";
                            }
                        }
                    }
                }
            }
        },
        data() {
            return {
                subject: '',
                templateData: {
                    // template content
                    theme: null,
                    logo: "http://api.nimbus.pluralis.com.mx/assets/logo-template.png",
                    banner: "http://api.nimbus.pluralis.com.mx/assets/banner-template.png",
                    title: 'Daedalus et Icarus',
                    content: 'Daedalus, faber ingeniosus, fuit artifex eximius qui Minos, rex Cretensis, auxiliatus est construere labyrinthum in quo Minotaurus, monstro feroce, inclusus est. Sed Daedalus et filius eius, Icarus, a rege in labyrintho inclusi sunt. Non poterant effugere per vias labyrinthi, itaque Daedalus consilium cepit.<br/><br/>Daedalus de pennarum ordine cogitavit. Ipse sibi alas fecit ex cera et plumis, et ínter eas adhesit plumas leviores. Postquam alas sibi et Icaro imposuit, admonuit filium ne nimium ad caelum attolleret neve nimium appropinquare soli.<br/><br/>Sed Icarus, juvenis temerarius, gaudebat nova potentia alarum. Volabat in caelum, felix et libere, sed, ob audaciam, solis radiis nimium appropinquavit. Cera, quae alas iungebat, solis ardori liquefacta est, et Ícarus in mare cecidit. Pater, aegre dolens, Ícarum nuncupavit, atque sedibus caeli debitum poenam petivit.',
                    // Button text
                    buttonText: 'ver mas...',
                    buttonLink: 'pluralis.com.mx',
                    // social link
                    facebook_link: '',
                    instagram_link: '',
                    youtube_link: '',
                    // footer
                    footer: "http://api.nimbus.pluralis.com.mx/assets/logo-template.png",
                    slogan: "Mi empresa - slogan",
                    address: "Mi direccion, 1234",
                    email: "ejemplo@correo.com",
                    phone: "+123456789",
                    suscription_token: this.suscription
                }
            }
        },
        methods: {
            openImageModal(section){
                this.$emit('open-image-modal', section);
            },
            html: function (){
                let b64 = render(this.templateData);
                this.$emit('update-html-template', {
                    "subject": this.subject,
                    "body": b64
                });
            },
            saveFormData: async function() {
                // Guardar los datos del formulario en una cookie
                Cookies.set('callToAction-template'+this.website, { subject: this.subject, templateData: this.templateData }, { expires: 28 });
                const template = {
                    name: 'callToAction',
                    template: {
                        subject: this.subject,
                        templateData: this.templateData
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
                
                alert('Datos guardados!');
            },
            loadTemplate: async function () {
                const response = await axios.get('api/email/myTemplates/'+this.website+'/callToAction', {withCredentials: true});
                if(response.data.status == "success"){
                    let json = JSON.parse(response.data.template);
                    this.subject = json.subject;
                    this.templateData = json.templateData;
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
        box-shadow: 2px 2px 4px rgba(0,0,0,0.6);
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

    /* Image input block */

    .image-input-block {
        margin: 1rem 0;
    }

    .image-input-block div {
        margin-top: .5rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .image-input-block input[type="text"] {
        width: 65%;
    }

    /* Text input block */

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

    .text-input-block textarea {
        box-sizing: border-box;
        width: 100%;
        height: 10rem;
        resize: none;
        border: none;
        font-family: 'Regular';
        padding: 4px;
    }

    .save-button-container {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 16px;
    }
</style>