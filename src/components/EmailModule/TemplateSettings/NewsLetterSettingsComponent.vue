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

        <!-- Header and banner -->
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
                        <input class="input-primary" type="text" v-model="templateData.logo">
                        <button class="btn-primary" @click="openImageModal('headerImage')">imagen...</button>
                    </div>
                </div>
                <!-- Banner -->
                <div class="image-input-block">
                    <label>Pancarta</label>
                    <div>
                        <input class="input-primary" type="text" v-model="templateData.banner">
                        <button class="btn-primary" @click="openImageModal('bannerImage')">imagen...</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Introduction -->
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

        <!-- Content -->
        <div class="settings-container">

            <!-- Title -->
            <div class="settings-header">
                <span>Contenido</span>
            </div>

            <div class="settings-body">
                <!-- Image 1 -->
                <div class="image-input-block">
                    <label>Imagen 1</label>
                    <div>
                        <input class="input-primary" type="text" v-model="templateData.picture_a">
                        <button class="btn-primary" @click="openImageModal('picture_a')">imagen...</button>
                    </div>
                </div>

                <!-- Text 1 -->
                <div class="text-input-block">
                    <label>Texto</label>
                    <div>
                        <textarea v-model="templateData.side_text_a"></textarea>
                    </div>
                </div>

                <!-- Image 2 -->
                <div class="image-input-block">
                    <label>Imagen 2</label>
                    <div>
                        <input class="input-primary" type="text" v-model="templateData.picture_b">
                        <button class="btn-primary" @click="openImageModal('picture_b')">imagen...</button>
                    </div>
                </div>

                <!-- Text 2 -->
                <div class="text-input-block">
                    <label>Texto</label>
                    <div>
                        <textarea v-model="templateData.side_text_b"></textarea>
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
    import { render } from '../Templates/Newsletter.js'
    export default {
        name: 'NewsLetterSettingsComponent',
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
                    if(newVal === 'newsletter'){
                        this.html();
                    }
                    const savedData = Cookies.getJSON('newsletter-template'+this.website);
                    if (savedData) {
                        this.subject = savedData.subject;
                        this.templateData = savedData.templateData;
                    }
                },
                immediate: true,
                deep: true
            },
            templateData: {
                handler(){
                    if(this.isSelected === 'newsletter'){
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
                        case 'picture_a' :
                            this.templateData.picture_a = process.env.VUE_APP_IMAGE_PATH+"/"+this.image.image_name;
                            break;
                        case 'picture_b' :
                            this.templateData.picture_b = process.env.VUE_APP_IMAGE_PATH+"/"+this.image.image_name;
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
                handler(newVal) {
                    const savedData = Cookies.getJSON('newsletter-template'+newVal);
                    if (savedData) {
                        this.subject = savedData.subject;
                        this.templateData = savedData.templateData;
                    }else {
                        this.subject = '';
                        this.templateData.logo = "https://api.nimbus.pluralis.com.mx/assets/logo-template.png";
                        this.templateData.banner = "https://api.nimbus.pluralis.com.mx/assets/banner-template.png";
                        this.templateData.title = 'Daedalus et Icarus';
                        this.templateData.content = 'Daedalus faber ingeniosus, exsilium petens ab insula Creta, alas ex pennis et cera confecit. Ea alis Icarum, filium suum, primum instruxit, monens eum ne ad solis radios appropinquaret. Sed cupiditate ductus, Icarus monita patris neglexit, altius volans et ad caelum appropinquans. Cera, solis ardore liquefacta, alas eius dissolvit. Icarus igitur in mare decidit et perit.';
                        this.templateData.picture_a = "https://api.nimbus.pluralis.com.mx/assets/illustration-template.png",
                        this.templateData.side_text_a = "Daedalus, dolens filii mortem, alia nave navigat ad terram Siciliam, ubi regem Cocalum invenit. Cocalus, benignus rex, Daedalum benigne excipit et in suam amicitiam recipit. Tum Daedalus in Sicilia moratur, artem suam fabrum ostendens et Cocalo multa praeclara opera fabricante.";
                        this.templateData.picture_b = "https://api.nimbus.pluralis.com.mx/assets/illustration-template.png";
                        this.templateData.side_text_b = "Interim, Creta rex Minos, filium suum deplorans, Daedalum quaerit. Sed Daedalus se Latium ad regem Ancum movet, ubi pacem et asylum invenit. Sic Daedalus et Icarus fabulae in historia perpetua memoriae manent, exemplo peritiae et prudentiae, sed etiam temeritatis et tristitiae.";
                        this.templateData.facebook_link = null;
                        this.templateData.instagram_link = null;
                        this.templateData.youtube_link = null;
                        this.templateData.footer = "https://api.nimbus.pluralis.com.mx/assets/logo-template.png";
                        this.templateData.slogan = "Pluralis - Desarrollo Web";
                        this.templateData.address = "Tijuana, Mexico";
                        this.templateData.email = "contacto@pluralis.com.mx";
                        this.templateData.phone = "+52 (664) 252 2024"; 
                    }
                }
            }
        },
        data() {
            return {
                subject: '',
                templateData: {
                    theme: null,
                    logo: "https://api.nimbus.pluralis.com.mx/assets/logo-template.png",
                    banner: "https://api.nimbus.pluralis.com.mx/assets/banner-template.png",
                    title: 'Daedalus et Icarus',
                    content: 'Daedalus faber ingeniosus, exsilium petens ab insula Creta, alas ex pennis et cera confecit. Ea alis Icarum, filium suum, primum instruxit, monens eum ne ad solis radios appropinquaret. Sed cupiditate ductus, Icarus monita patris neglexit, altius volans et ad caelum appropinquans. Cera, solis ardore liquefacta, alas eius dissolvit. Icarus igitur in mare decidit et perit.',
                    picture_a: "https://api.nimbus.pluralis.com.mx/assets/illustration-template.png",
                    side_text_a: "Daedalus, dolens filii mortem, alia nave navigat ad terram Siciliam, ubi regem Cocalum invenit. Cocalus, benignus rex, Daedalum benigne excipit et in suam amicitiam recipit. Tum Daedalus in Sicilia moratur, artem suam fabrum ostendens et Cocalo multa praeclara opera fabricante.",
                    picture_b: "https://api.nimbus.pluralis.com.mx/assets/illustration-template.png",
                    side_text_b: "Interim, Creta rex Minos, filium suum deplorans, Daedalum quaerit. Sed Daedalus se Latium ad regem Ancum movet, ubi pacem et asylum invenit. Sic Daedalus et Icarus fabulae in historia perpetua memoriae manent, exemplo peritiae et prudentiae, sed etiam temeritatis et tristitiae.",
                    facebook_link: null,
                    instagram_link: null,
                    youtube_link: null,
                    footer: "https://api.nimbus.pluralis.com.mx/assets/logo-template.png",
                    slogan: "Pluralis - Desarrollo Web",
                    address: "Tijuana, Mexico",
                    email: "contacto@pluralis.com.mx",
                    phone: "+52 (664) 252 2024",
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
            saveFormData: async function () {
                // Guardar los datos del formulario en una cookie
                Cookies.set('newsletter-template'+this.website, { subject: this.subject, templateData: this.templateData }, { expires: 28 });
                const template = {
                    name: 'newsletter',
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
                alert('Datos guardados en una cookie!');
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