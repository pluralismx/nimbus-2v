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
                        <input v-model="templateData.logo" class="input-primary" type="text">
                        <button class="btn-primary" @click="openImageModal('promotionalHeaderLogo')">imagen...</button>
                    </div>
                </div>
                <!-- Banner -->
                <div class="image-input-block">
                    <label>Pancarta</label>
                    <div>
                        <input v-model="templateData.banner" class="input-primary" type="text">
                        <button class="btn-primary" @click="openImageModal('promotionalHeaderBanner')">imagen...</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Features -->
        <div class="settings-container">
            <!-- Title -->
            <div class="settings-header">
                <span>Características</span>
            </div>
            <!-- Content -->
            <div class="settings-body">
                <!-- Image -->
                <div class="image-input-block">
                    <label>Imagen</label>
                    <div>
                        <input v-model="templateData.features" class="input-primary" type="text">
                        <button class="btn-primary" @click="openImageModal('promotionalFeaturesImage')">imagen...</button>
                    </div>
                </div>
                <!-- Feature 1 -->
                <div class="text-input-block">
                    <label>Característica 1</label>
                    <div>
                        <input v-model="templateData.feature_a" class="input-primary" type="text">
                    </div>
                </div>
                <!-- Feature 2 -->
                <div class="text-input-block">
                    <label>Característica 2</label>
                    <div>
                        <input v-model="templateData.feature_b" class="input-primary" type="text">
                    </div>
                </div>
                <!-- Feature 3 -->
                <div class="text-input-block">
                    <label>Característica 3</label>
                    <div>
                        <input v-model="templateData.feature_c" class="input-primary" type="text">
                    </div>
                </div>
            </div>
        </div>

        <!-- Benefits -->
        <div class="settings-container">
            <!-- Title -->
            <div class="settings-header">
                <span>Beneficios</span>
            </div>
            <!-- Content -->
            <div class="settings-body">
                <!-- Image -->
                <div class="image-input-block">
                    <label>Imagen</label>
                    <div>
                        <input v-model="templateData.benefits" class="input-primary" type="text">
                        <button class="btn-primary" @click="openImageModal('promotionalBenefitsImage')">imagen...</button>
                    </div>
                </div>
                <!-- Beneficio 1 -->
                <div class="text-input-block">
                    <label>Beneficio 1</label>
                    <div>
                        <input v-model="templateData.benefit_a" class="input-primary" type="text">
                    </div>
                </div>
                <!-- Beneficio 2 -->
                <div class="text-input-block">
                    <label>Beneficio 2</label>
                    <div>
                        <input v-model="templateData.benefit_b" class="input-primary" type="text">
                    </div>
                </div>
                <!-- Beneficio 3 -->
                <div class="text-input-block">
                    <label>Beneficio 3</label>
                    <div>
                        <input v-model="templateData.benefit_c" class="input-primary" type="text">
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
                        <input v-model="templateData.footer" class="input-primary" type="text">
                        <button class="btn-primary" @click="openImageModal('promotionalFooterImage')">imagen...</button>
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
    import { render } from '../Templates/Promotional.js';
    export default {
        name: 'PromotionalSettingsComponent',
        props: {
            isSelected: {
                type: String,
                required: false
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
                    if(newVal === 'promotional'){
                        this.html();
                    }
                    const savedData = Cookies.getJSON('promotional-template'+this.website);
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
                    if(this.isSelected === 'promotional'){
                        this.html();
                    }
                },
                immediate: true,
                deep: true
            },
            image: {
                handler() {
                    switch(this.image.section){
                        case 'promotionalHeaderLogo' :
                            this.templateData.logo = process.env.VUE_APP_IMAGE_PATH+"/"+this.image.image_name;
                            break;
                        case 'promotionalHeaderBanner' :
                            this.templateData.banner = process.env.VUE_APP_IMAGE_PATH+"/"+this.image.image_name;
                            break;
                        case 'promotionalFeaturesImage' :
                            this.templateData.features = process.env.VUE_APP_IMAGE_PATH+"/"+this.image.image_name;
                            break;
                        case 'promotionalBenefitsImage' :
                            this.templateData.benefits = process.env.VUE_APP_IMAGE_PATH+"/"+this.image.image_name;
                            break;
                        case 'promotionalFooterImage' :
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
                handler(newVal){
                    const savedData = Cookies.getJSON('promotional-template'+newVal);
                    if (savedData) {
                        this.subject = savedData.subject;
                        this.templateData = savedData.templateData;   
                    }else{
                        let byDefault = this.loadTemplate();
                        if(byDefault == false){
                            this.subject = '';
                            this.templateData.logo = "https://api.nimbus.pluralis.com.mx/assets/logo-template.png";
                            this.templateData.banner = "https://api.nimbus.pluralis.com.mx/assets/banner-template.png";
                            this.templateData.features = "https://api.nimbus.pluralis.com.mx/assets/illustration-template.png";
                            this.templateData.feature_a = "";
                            this.templateData.feature_b = "";
                            this.templateData.feature_c = "";
                            this.templateData.benefits = "https://api.nimbus.pluralis.com.mx/assets/illustration-template.png";
                            this.templateData.benefit_a = "";
                            this.templateData.benefit_b = "";
                            this.templateData.benefit_c = "";
                            this.templateData.facebook_link = "";
                            this.templateData.instagram_link = "";
                            this.templateData.youtube_link = "";
                            this.templateData.footer = "https://api.nimbus.pluralis.com.mx/assets/logo-template.png";
                            this.templateData.slogan = "";
                            this.templateData.address = "";
                            this.templateData.email = "";
                            this.templateData.phone = "";
                        }
                    }
                }
            }
        },
        data() {
            return {
                subject: '',
                templateData: {
                    theme: '',
                    logo: "https://api.nimbus.pluralis.com.mx/assets/logo-template.png",
                    banner: "https://api.nimbus.pluralis.com.mx/assets/banner-template.png",
                    features: "https://api.nimbus.pluralis.com.mx/assets/illustration-template.png",
                    feature_a: '',
                    feature_b: '',
                    feature_c: '',
                    benefits: "https://api.nimbus.pluralis.com.mx/assets/illustration-template.png",
                    benefit_a: '',
                    benefit_b: '',
                    benefit_c: '',
                    facebook_link: '',
                    instagram_link: '',
                    youtube_link: '',
                    footer: "https://api.nimbus.pluralis.com.mx/assets/logo-template.png",
                    slogan: '',
                    address: '',
                    email: '',
                    phone: '',
                    suscription_token: this.suscription
                }
            }
        },
        methods: {
            openImageModal: function (section){
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
                Cookies.set('promotional-template'+this.website, { subject: this.subject, templateData: this.templateData }, { expires: 28 });
                const template = {
                    name: 'promotional',
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
            },
            loadTemplate: async function () {
                const response = await axios.get('api/email/myTemplates/'+this.website+'/promotional', {withCredentials: true});
                if(response.data.status == "success"){
                    let json = JSON.parse(response.data.template);
                    this.subject = json.subject;
                    this.templateData = json.templateData;
                }else{
                    return false;
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