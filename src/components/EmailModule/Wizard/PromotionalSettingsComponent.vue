<template>
    <section>

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
                        <input class="input-primary" type="text">
                        <button class="btn-primary" @click="openImageModal">imagen...</button>
                    </div>
                </div>
                <!-- Banner -->
                <div class="image-input-block">
                    <label>Logotipo</label>
                    <div>
                        <input class="input-primary" type="text">
                        <button class="btn-primary" @click="openImageModal">imagen...</button>
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
                    <label>Logotipo</label>
                    <div>
                        <input class="input-primary" type="text">
                        <button class="btn-primary" @click="openImageModal">imagen...</button>
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
                        <input class="input-primary" type="text">
                        <button class="btn-primary" @click="openImageModal">imagen...</button>
                    </div>
                </div>
                <!-- Beneficio 1 -->
                <div class="text-input-block">
                    <label>Beneficio 1</label>
                    <div>
                        <input v-model="benefit_a" class="input-primary" type="text">
                    </div>
                </div>
                <!-- Beneficio 2 -->
                <div class="text-input-block">
                    <label>Beneficio 2</label>
                    <div>
                        <input v-model="benefit_b" class="input-primary" type="text">
                    </div>
                </div>
                <!-- Beneficio 3 -->
                <div class="text-input-block">
                    <label>Beneficio 3</label>
                    <div>
                        <input v-model="benefit_c" class="input-primary" type="text">
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
                        <input class="input-primary" type="text">
                    </div>
                </div>
                <!-- Instagram -->
                <div class="text-input-block">
                    <label>Instagram URL</label>
                    <div>
                        <input class="input-primary" type="text">
                    </div>
                </div>
                <!-- Youtube -->
                <div class="text-input-block">
                    <label>Youtube URL</label>
                    <div>
                        <input class="input-primary" type="text">
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
                        <input class="input-primary" type="text">
                        <button class="btn-primary" @click="openImageModal">imagen...</button>
                    </div>
                </div>
                <!-- Slogan -->
                <div class="text-input-block">
                    <label>Slogan</label>
                    <div>
                        <input class="input-primary" type="text">
                    </div>
                </div>
                <!-- Address -->
                <div class="text-input-block">
                    <label>Dirección</label>
                    <div>
                        <input class="input-primary" type="text">
                    </div>
                </div>
                <!-- E-mail -->
                <div class="text-input-block">
                    <label>E-mail</label>
                    <div>
                        <input class="input-primary" type="text">
                    </div>
                </div>
                <!-- Phone -->
                <div class="text-input-block">
                    <label>Teléfono</label>
                    <div>
                        <input class="input-primary" type="text">
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
            }
        },
        data() {
            return {
                templateData: {
                    theme: null,
                    logo: "http://localhost/api-nimbus-2/uploads/logo-template.png",
                    banner: "http://localhost/api-nimbus-2/uploads/banner-template.png",
                    features: "http://localhost/api-nimbus-2/uploads/illustration-template.png",
                    feature_a: null,
                    feature_b: null,
                    feature_c: null,
                    benefits: "http://localhost/api-nimbus-2/uploads/illustration-template.png",
                    benefit_a: null,
                    benefit_b: null,
                    benefit_c: null,
                    facebook_link: null,
                    instagram_link: null,
                    youtube_link: null,
                    footer: "http://localhost/api-nimbus-2/uploads/logo-template.png",
                    slogan: null,
                    address: null,
                    email: null,
                    phone: null
                }
            }
        },
        methods: {
            openImageModal(){
                this.$emit('open-image-modal');
            },
            html(){
                let html = render(this.templateData);
                this.$emit('update-html-template', html);
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