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

    </section>
</template>
<script>
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
                            this.templateData.logo = "http://localhost/api-nimbus/storage/app/websites/"+this.image.image_name;
                            break;
                        case 'promotionalHeaderBanner' :
                            this.templateData.banner = "http://localhost/api-nimbus/storage/app/websites/"+this.image.image_name;
                            break;
                        case 'promotionalFeaturesImage' :
                            this.templateData.features = "http://localhost/api-nimbus/storage/app/websites/"+this.image.image_name;
                            break;
                        case 'promotionalBenefitsImage' :
                            this.templateData.benefits = "http://localhost/api-nimbus/storage/app/websites/"+this.image.image_name;
                            break;
                        case 'promotionalFooterImage' :
                            this.templateData.footer = "http://localhost/api-nimbus/storage/app/websites/"+this.image.image_name;
                            break;
                    }       
                },
            },
            subject: {
                handler(){
                    this.html();
                }
            },
        },
        data() {
            return {
                subject: '',
                templateData: {
                    theme: '',
                    logo: "http://localhost/api-nimbus/storage/assets/logo-template.png",
                    banner: "http://localhost/api-nimbus/storage/assets/banner-template.png",
                    features: "http://localhost/api-nimbus/storage/assets/illustration-template.png",
                    feature_a: '',
                    feature_b: '',
                    feature_c: '',
                    benefits: "http://localhost/api-nimbus/storage/assets/illustration-template.png",
                    benefit_a: '',
                    benefit_b: '',
                    benefit_c: '',
                    facebook_link: '',
                    instagram_link: '',
                    youtube_link: '',
                    footer: "http://localhost/api-nimbus/storage/assets/logo-template.png",
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
    
</style>