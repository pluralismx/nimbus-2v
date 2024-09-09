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
            </div>
        </div>

        <!-- Invoice details -->
        <div class="settings-container">
            <!-- Title -->
            <div class="settings-header">
                <span>Detalles</span>
            </div>
            <div class="settings-body">
                <!-- Customer name -->
                <div class="text-input-block">
                    <label>Título</label>
                    <div>
                        <input v-model="templateData.title" class="input-primary" type="text">
                    </div>
                </div>

                <div class="text-input-block">
                    <label>Nombre del cliente</label>
                    <div>
                        <input v-model="templateData.customer" class="input-primary" type="text">
                    </div>
                </div>

                <div class="text-input-block">
                    <label>Fecha</label>
                    <div>
                        <input v-model="templateData.date" class="input-primary" type="text">
                    </div>
                </div>

                <!-- Content -->
                <div class="text-input-block">
                    <label>I.V.A</label>
                    <div>
                        <input v-model="templateData.taxRate" class="input-primary" type="text">
                    </div>
                </div>
            </div>

        </div>

        <!-- Estimate -->
        
        <div v-for="(item, index) in items" :key="item.id" class="settings-container">
            <!-- Title -->
            <div class="settings-header">
                <span>Artículo {{ index + 1 }}</span>
            </div>

            <div class="settings-body">
                <div class="item-input-block">
                    <div class="item-concept-container">
                        <label for="concept">Concepto</label>
                        <div>
                            <input type="text" class="input-primary" v-model="item.concept">
                        </div>
                    </div>
                    <div class="item-details-container">
                        <div>
                            <label for="item-qty">Cantidad</label>
                            <div>
                                <input type="number" class="input-primary" v-model.number="item.qty">
                            </div>
                        </div>
                        <div>
                            <label for="item-price">Precio</label>
                            <div>
                                <input type="number" class="input-primary" v-model.number="item.price">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="add-remove-articles-container">
            <span class="span-add-item" @click="this.addRow()">Agregar artículo</span>
            <span class="span-add-item" @click="this.removeRow()">Quitar artículo</span>
        </div>

        <!-- Additional notes -->
        <div class="settings-container">
            <!-- Title -->
            <div class="settings-header">
                <span>Notas</span>
            </div>
            <!-- Content -->
            <div class="settings-body">
                <!-- Notes -->
                <div class="text-input-block">
                    <div>
                        <textarea v-model="templateData.notes"></textarea>
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
    import { render } from '../Templates/Invoice.js'
    export default {
        name: 'InvoiceSettingsComponent',
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
                    if(newVal === 'invoice'){
                        this.html();
                        const savedData = Cookies.getJSON('invoice-template'+this.website);
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
                    if(this.isSelected === 'invoice'){
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
                handler: async function (newVal) {
                    if(this.isSelected == "invoice"){
                        const savedData = Cookies.getJSON('invoice-template'+newVal);
                        if (savedData) {
                            this.subject = savedData.subject;
                            this.templateData = savedData.templateData;
                        }else {
                            let byDefault = await this.loadTemplate();
                            if(byDefault == false){
                                this.subject = '';
                                this.templateData.logo = "https://api.nimbus.pluralis.com.mx/assets/logo-template.png";
                                this.templateData.banner = "https://api.nimbus.pluralis.com.mx/assets/banner-template.png";
                                this.templateData.title = 'Daedalus et Icarus';
                                this.templateData.customer = 'Customer name';
                                this.templateData.date = '12/31/2024';
                                this.templateData.rows = '',
                                this.templateData.subtotal = 0,
                                this.templateData.taxRate = 0.08,
                                this.templateData.taxes = 0,
                                this.templateData.total = 0,
                                this.templateData.notes = 'Notes: opcional...',
                                this.templateData.facebook_link = null;
                                this.templateData.instagram_link = null;
                                this.templateData.youtube_link = null;
                                this.templateData.footer = "https://api.nimbus.pluralis.com.mx/assets/logo-template.png";
                                this.templateData.slogan="Mi empresa - Slogan";
                                this.templateData.address="Mi ciudad, pais";
                                this.templateData.email="ejemplo@correo.com";
                                this.templateData.phone="+1234567890";
                            }
                        }
                    }
                }
            },
            items: {
                handler(newVal) {
                    let tr = '';
                    let subtotal = 0;
                    // let taxes = 0;
                    newVal.forEach((item) => {
                    
                    tr += '<tr><td>' + item.concept + '</td>' +
                            '<td style="text-align: center;">' + item.qty + '</td>' +
                            '<td style="text-align: center;">$' + item.price + '</td>' +
                            '<td style="text-align: center;">$' + (item.price * item.qty) + '</td></tr>';
                    subtotal += (item.price * item.qty);
                    
                    });

                    this.templateData.rows = tr;
                    this.templateData.subtotal = subtotal;
                    this.templateData.taxes = Math.floor((subtotal * (this.templateData.taxRate / 100)) * 100) / 100;
                    this.templateData.total = Math.floor((subtotal + this.templateData.taxes) * 100) / 100;
                    this.html();
                },
                deep: true,
            },
        },
        data() {
            return {
                
                taxRateTemplate: '',
                subject: '',
                items: [],
                templateData: {
                    theme: null,
                    logo: "https://api.nimbus.pluralis.com.mx/assets/logo-template.png",
                    banner: "https://api.nimbus.pluralis.com.mx/assets/banner-template.png",
                    title: 'Recibo/Presupuesto',
                    customer: 'Nombre del cliente',
                    date: '31/12/2024',
                    rows: '',
                    subtotal: 0,
                    taxRate: 0.08,
                    taxes: 0,
                    total: 0,
                    notes: 'Notes: opcional...',
                    facebook_link: null,
                    instagram_link: null,
                    youtube_link: null,
                    footer: "https://api.nimbus.pluralis.com.mx/assets/logo-template.png",
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
            saveFormData: async function () {
                const template = {
                    name: 'invoice',
                    template: {
                        subject: this.subject,
                        templateData: { ...this.templateData }
                    }
                }

                template.template.templateData.rows = '';
                template.template.templateData.customer = '';
                template.template.templateData.date = '';
                template.template.templateData.subtotal = 0;
                template.template.templateData.taxes = 0;
                template.template.templateData.total = 0;

                Cookies.set('newsletter-template'+this.website, { subject: this.subject, templateData: this.templateData }, { expires: 28 });

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
                const response = await axios.get('api/email/myTemplates/'+this.website+'/invoice', {withCredentials: true});
                if(response.data.status == "success"){
                    let json = JSON.parse(response.data.template);
                    this.subject = json.subject;
                    this.templateData = json.templateData;
                }else{
                    return Promise.resolve(false);
                }
            },
            addRow: function (){
                // Crear el objecto
                const item = {
                    id: this.items.length + 1,
                    concept: '',
                    qty: '',
                    price: '',
                    total: '',
                }
        
                // Meterlo al arreglo
                this.items.push(item);
                
            },
            removeRow: function (){
                this.items.pop();
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

    .item-input-block {
        margin: 1rem 0;
        
    }

    .item-concept-container {
        margin-bottom: .5rem;
    }

    .item-concept-container div {
        margin-top: .5rem;
        
    }

    .item-concept-container div input {
        margin-top: .5rem;
        width: 100%;
        box-sizing: border-box;
    }


    .item-details-container {
        display: flex;
        justify-content: space-between;
    }

    .item-details-container div {
        margin-top: .5rem;
    }

    .item-details-container div input{
        width: 50%;
        margin-top: .5rem;
    }

    .span-add-item {
        display: block;
        margin: .5rem .5rem;
        background-color: var(--primary);
        padding: 5px 10px;
        width: 40%;
        text-align: center;
        color: white;
        border-radius: 4px;
        box-shadow: 1px 1px 2px rgba(0,0,0,0.6);
    }

    .add-remove-articles-container {
        display: flex;
        justify-content: space-between;
        margin: 2rem 0;
    }

    .span-add-item:hover {
        color: var(--basic);
        cursor: pointer;
    }

</style>