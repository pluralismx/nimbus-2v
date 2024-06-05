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
    </section>

</template>
<script>
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
                            this.templateData.logo = "http://localhost/api-nimbus/storage/app/websites/"+this.image.image_name;
                            break;
                        case 'bannerImage' :
                            this.templateData.banner = "http://localhost/api-nimbus/storage/app/websites/"+this.image.image_name;
                            break;
                        case 'picture_a' :
                            this.templateData.picture_a = "http://localhost/api-nimbus/storage/app/websites/"+this.image.image_name;
                            break;
                        case 'picture_b' :
                            this.templateData.picture_b = "http://localhost/api-nimbus/storage/app/websites/"+this.image.image_name;
                            break;
                        case 'footerImage' :
                            this.templateData.footer = "http://localhost/api-nimbus/storage/app/websites/"+this.image.image_name;
                            break;
                    }       
                },
            },
            subject: {
                handler(){
                    this.html();
                }
            }
        },
        data() {
            return {
                subject: '',
                templateData: {
                    theme: null,
                    logo: "http://localhost/api-nimbus/storage/assets/logo-template.png",
                    banner: "http://localhost/api-nimbus/storage/assets/banner-template.png",
                    title: 'Daedalus et Icarus',
                    content: 'Daedalus faber ingeniosus, exsilium petens ab insula Creta, alas ex pennis et cera confecit. Ea alis Icarum, filium suum, primum instruxit, monens eum ne ad solis radios appropinquaret. Sed cupiditate ductus, Icarus monita patris neglexit, altius volans et ad caelum appropinquans. Cera, solis ardore liquefacta, alas eius dissolvit. Icarus igitur in mare decidit et perit.',
                    picture_a: "http://localhost/api-nimbus/storage/assets/illustration-template.png",
                    side_text_a: "Daedalus, dolens filii mortem, alia nave navigat ad terram Siciliam, ubi regem Cocalum invenit. Cocalus, benignus rex, Daedalum benigne excipit et in suam amicitiam recipit. Tum Daedalus in Sicilia moratur, artem suam fabrum ostendens et Cocalo multa praeclara opera fabricante.",
                    picture_b: "http://localhost/api-nimbus/storage/assets/illustration-template.png",
                    side_text_b: "Interim, Creta rex Minos, filium suum deplorans, Daedalum quaerit. Sed Daedalus se Latium ad regem Ancum movet, ubi pacem et asylum invenit. Sic Daedalus et Icarus fabulae in historia perpetua memoriae manent, exemplo peritiae et prudentiae, sed etiam temeritatis et tristitiae.",
                    facebook_link: null,
                    instagram_link: null,
                    youtube_link: null,
                    footer: "http://localhost/api-nimbus/storage/assets/logo-template.png",
                    slogan: "Pluralis - Desarrollo Web",
                    address: "Ave. Alejandro Von Humboldt #19264, Tijuana, Mexico CP 22434",
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