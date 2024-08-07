<template>
<div class="settings-body">
        <div class="header">
            <h1>Comprar</h1>
        </div>
        <div class="details">
            <table>
                <thead>
                    <tr>
                        <th>Concepto</th>
                        <th>Cantidad</th>
                        <th>Cargo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Sitios adicionales</td>
                        <td>{{ this.upgrades.websites }}</td>
                        <td>${{ this.additionalWebsitesCharge }}</td>
                    </tr>
                    <tr>
                        <td>Negocios adicionales</td>
                        <td>{{ this.upgrades.businesses }}</td>
                        <td>${{ this.additionalBusinessesCharge }}</td>
                    </tr>
                    <tr>
                        <td>Correos adicionales</td>
                        <td>{{ this.upgrades.emails }}</td>
                        <td>${{ this.additionalEmailsCharge }}</td>
                    </tr>
                    <tr>
                        <td>Contactos adicionales</td>
                        <td>{{ this.upgrades.contacts }}</td>
                        <td>${{ this.additionalContactsCharge }}</td>
                    </tr>
                    <tr>
                        <td>Usuarios adicionales</td>
                        <td>{{ this.upgrades.users }}</td>
                        <td>${{ this.additionalUsersCharge }}</td>
                    </tr>
                    <tr class="tr-subtotal">
                        <td>Subtotal</td>
                        <td></td>
                        <td>${{ this.subtotal }}</td>
                    </tr>
                    <tr>
                        <td>Impuestos</td>
                        <td></td>
                        <td>${{ this.taxes }}</td>
                    </tr>
                    <tr class="tr-total">
                        <td>Total a pagar</td>
                        <td></td>
                        <td>${{ this.total }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="footer">
            <span class="price-disclaimer" v-show="purchaseButton==true || modifyButton==true">Su pago mensual es de ${{ amount_due }} (sin impuestos)</span>
            <button class="btn-primary" @click="openProcessPaymentModal()" v-show="purchaseButton==true">Comprar</button>
            <button class="btn-primary" @click="openModifyPlanModal()" v-show="modifyButton==true">Modificar</button>
        </div>
        <br/>
        <span v-show="purchaseButton==true || modifyButton==true" class="price-disclaimer">Los cambios se aplicaran inmediatemente y su siguiente pago se modificara a partir del siguiente periodo de facturacion</span>
    </div>
</template>
<script>
    export default {
        name: "UpgradesPreviewComponent",
        props: {
            selection: {
                type: Object,
                required: true
            },
            account: {
                type: Object,
                required: true
            },
            clear: {
                type: Boolean,
                required: true
            }
        },
        computed: {
            selectionComputed() {
                return this.selection;
            },
            clearComputed() {
                return this.clear;
            }
        },
        watch: {
            selectionComputed: {
                handler(newVal) {
                    if (typeof newVal === 'object' && newVal !== null) {
                        this.modifiedPlan.users = newVal.users;
                        this.modifiedPlan.websites = newVal.websites;
                        this.modifiedPlan.emails = newVal.emails;
                        this.modifiedPlan.contacts = newVal.contacts;
                        this.modifiedPlan.businesses = newVal.businesses;
                        this.calculateTotal();
                    }
                },
                deep: true                
            },
            clearComputed: {
                handler(){
                    this.upgrades.users = 0,
                    this.upgrades.websites = 0,
                    this.upgrades.contacts = 0,
                    this.upgrades.emails = 0,
                    this.upgrades.businesses = 0
                    this.additionalUsersCharge = 0,
                    this.additionalWebsitesCharge = 0,
                    this.additionalEmailsCharge = 0,
                    this.additionalContactsCharge = 0,
                    this.additionalBusinessesCharge = 0
                    this.subtotal = 0,
                    this.taxes = 0,
                    this.total = 0
                }
            }
        },
        data() {
            return {

                basicPlan : {
                    emails: 10000,
                    contacts: 500,
                    businesses: 10,
                    users: 2,
                    websites: 1 
                },

                modifiedPlan : {
                    users: 0,
                    websites: 0,
                    emails: 0,
                    contacts: 0,
                    businesses: 0,
                },

                upgrades : {
                    users: 0,
                    websites: 0,
                    emails: 0,
                    contacts: 0,
                    businesses: 0,
                },


                // Charges
                additionalUsersCharge: 0,
                additionalWebsitesCharge: 0,
                additionalEmailsCharge: 0,
                additionalContactsCharge: 0,
                additionalBusinessesCharge: 0,

                // Total
                subtotal: 0,
                taxes: 0,
                total: 0,
                amount_due: 0,
                
                // Template
                basic: false,
                current: false,
                modified: false,
                purchaseButton: false
            }
        },
        methods: {
            openProcessPaymentModal: function () { 
                const json = {
                    "type":"upgrade",
                    "users":this.modifiedPlan.users,
                    "websites":this.modifiedPlan.websites,
                    "emails":this.modifiedPlan.emails,
                    "contacts":this.modifiedPlan.contacts,
                    "businesses":this.modifiedPlan.businesses,
                    "total":this.total
                }
                this.$emit("upgrades-selected", json);
            },
            truncateDecimals: function (number) {
                if (typeof number !== 'number' || isNaN(number)) {
                    console.error('Invalid number:', number);
                    return 0;
                }
                return Math.floor(number * 100) / 100;
            },
            openModifyPlanModal: function () {
                const json = {
                    "users":this.modifiedPlan.users,
                    "websites":this.modifiedPlan.websites,
                    "emails":this.modifiedPlan.emails,
                    "contacts":this.modifiedPlan.contacts,
                    "businesses":this.modifiedPlan.businesses,
                }
                this.$emit("modify-plan", json);
            },
            calculateTotal: function () {

                // Importar variables desde .env
                const emailsCharge = parseFloat(process.env.VUE_APP_EMAILS_CHARGE);
                const contactsCharge = parseFloat(process.env.VUE_APP_CONTACTS_CHARGE);
                const websitesCharge = parseFloat(process.env.VUE_APP_WEBSITES_CHARGE);
                const businessesCharge = parseFloat(process.env.VUE_APP_BUSINESSES_CHARGE);
                const usersCharge = parseFloat(process.env.VUE_APP_USERS_CHARGE);
                const taxRate = parseFloat(process.env.VUE_APP_TAX_RATE);
                const baseCharge = parseFloat(process.env.VUE_APP_BASIC_PLAN_CHARGE);

                // Construir el objeto que muestre las modificaciones
                if(this.modifiedPlan.emails < this.account.emails && this.modifiedPlan.emails > this.basicPlan.emails){
                    this.upgrades.emails = this.modifiedPlan.emails - this.basicPlan.emails;
                    this.additionalEmailsCharge = 0;
                }else if(this.modifiedPlan.emails > this.account.emails){
                    this.upgrades.emails = this.modifiedPlan.emails - this.account.emails;
                    this.additionalEmailsCharge = this.truncateDecimals(this.upgrades.emails/500 * emailsCharge);
                }else if(this.modifiedPlan.emails == this.basicPlan.emails){
                    this.upgrades.emails = 0;
                    this.additionalEmailsCharge = 0;
                }else {
                    this.upgrades.emails = 0;
                    this.additionalEmailsCharge = 0;
                }

                if(this.modifiedPlan.contacts < this.account.contacts && this.modifiedPlan.contacts > this.basicPlan.contacts){
                    this.upgrades.contacts = this.modifiedPlan.contacts - this.basicPlan.contacts;
                    this.additionalContactsCharge = 0;
                }else if(this.modifiedPlan.contacts > this.account.contacts){
                    this.upgrades.contacts = this.modifiedPlan.contacts - this.account.contacts;
                    this.additionalContactsCharge = this.truncateDecimals(this.upgrades.contacts/500 * contactsCharge);
                }else if(this.modifiedPlan.contacts == this.basicPlan.contacts){
                    this.upgrades.contacts = 0;
                    this.additionalContactsCharge = 0;
                }else{
                    this.upgrades.contacts = 0;
                    this.additionalContactsCharge = 0;
                }

                if(this.modifiedPlan.websites < this.account.websites && this.modifiedPlan.websites > this.basicPlan.websites){
                    this.upgrades.websites = this.modifiedPlan.websites - this.basicPlan.websites;
                    this.additionalWebsitesCharge = 0;
                }else if(this.modifiedPlan.websites > this.account.websites){
                    this.upgrades.websites = this.modifiedPlan.websites - this.account.websites;
                    this.additionalWebsitesCharge = this.truncateDecimals(this.upgrades.websites * websitesCharge);
                }else if(this.modifiedPlan.websites == this.basicPlan.websites){
                    this.upgrades.websites = 0;
                    this.additionalWebsitesCharge = 0;
                }else{
                    this.upgrades.websites = 0;
                    this.additionalWebsitesCharge = 0;
                }

                if(this.modifiedPlan.businesses < this.account.businesses && this.modifiedPlan.businesses > this.basicPlan.businesses){
                    this.upgrades.businesses = this.modifiedPlan.businesses - this.basicPlan.businesses;
                    this.additionalBusinessesCharge = 0;
                }else if(this.modifiedPlan.businesses > this.account.businesses){
                    this.upgrades.businesses = this.modifiedPlan.businesses - this.account.businesses;
                    this.additionalBusinessesCharge = this.truncateDecimals(this.upgrades.businesses * businessesCharge);
                }else if(this.modifiedPlan.businesses == this.basicPlan.businesses){
                    this.upgrades.businesses = 0;
                    this.additionalBusinessesCharge = 0;
                }else{
                    this.upgrades.businesses = 0;
                    this.additionalBusinessesCharge = 0;
                }

                if(this.modifiedPlan.users < this.account.users && this.modifiedPlan.users > this.basicPlan.users){
                    this.upgrades.users = this.modifiedPlan.users - this.basicPlan.users;
                    this.additionalUsersCharge = 0;
                }else if(this.modifiedPlan.users > this.account.users){
                    this.upgrades.users = this.modifiedPlan.users - this.account.users;
                    this.additionalUsersCharge = this.truncateDecimals(this.upgrades.users * usersCharge);
                }else if(this.modifiedPlan.users == this.basicPlan.users){
                    this.upgrades.users = 0;
                    this.additionalUsersCharge = 0;
                }else{
                    this.upgrades.users = 0;
                    this.additionalUsersCharge = 0;
                }

                // Calcular el cargo
                this.subtotal = this.truncateDecimals(
                    this.additionalEmailsCharge +
                    this.additionalContactsCharge +
                    this.additionalWebsitesCharge +
                    this.additionalBusinessesCharge +
                    this.additionalUsersCharge
                );

                this.taxes = this.truncateDecimals(this.subtotal * taxRate);
                this.total = this.truncateDecimals(this.subtotal + this.taxes);
                
                if(
                    this.modifiedPlan.emails == this.basicPlan.emails &&
                    this.modifiedPlan.contacts == this.basicPlan.contacts &&
                    this.modifiedPlan.websites == this.basicPlan.websites &&
                    this.modifiedPlan.businesses == this.basicPlan.businesses &&
                    this.modifiedPlan.users == this.basicPlan.users
                ){
                    this.amount_due = baseCharge;
                }else{
                    this.amount_due = (
                        this.truncateDecimals(baseCharge) +
                        this.truncateDecimals((this.modifiedPlan.emails - this.basicPlan.emails) / 500 * emailsCharge) +
                        this.truncateDecimals((this.modifiedPlan.contacts - this.basicPlan.contacts) / 500 * contactsCharge) +
                        this.truncateDecimals((this.modifiedPlan.websites - this.basicPlan.websites) * websitesCharge) +
                        this.truncateDecimals((this.modifiedPlan.businesses - this.basicPlan.businesses) * businessesCharge) +  // Corrección aquí
                        this.truncateDecimals((this.modifiedPlan.users - this.basicPlan.users) * usersCharge)
                    );
                }
                
                this.amount_due = this.truncateDecimals(this.amount_due);
                
                // Si añadio algo
                if(this.total > 0){
                    this.purchaseButton = true;
                    this.modifyButton = false;
                }

                //si dejo su paquete igual
                if(this.total == 0){ 
                    this.purchaseButton = false;
                    this.modifyButton = false;
                }

                // Si quito algo
                if(this.amount_due < this.account.amount_due){
                    this.purchaseButton = false;
                    this.modifyButton = true;
                }

                // Si el usuario regreso al plan basico
                if(this.amount_due == 29.99){
                    this.purchaseButton = false;
                    this.modifyButton = true;
                }

                // Si el usuario se quedo en su plan basico 
                if(this.amount_due == baseCharge){
                    this.purchaseButton = false;
                    this.modifyButton = false;
                }
            }
        }
    }
</script>
<style scoped>

.settings-body {
    padding: 1rem;
    padding-top: 0;
    background-color: #d2d8db;
    border-radius: .5rem;
}

.header {
    margin: 1rem 0;
}

.header h1 {
    font-size: 16px;
}

table {
    width: 100%;
    border-collapse: collapse;
    font-size: 10px;
    margin-bottom: 2rem;
}

thead tr th{
    padding: .5rem .5rem;
    background-color: var(--primary);
    color: var(--basic);
    width: 20%;

}

thead tr th:nth-child(1){
    text-align: left;
    width: 60%;
}

.tr-total {
    border-top: 1px solid black;
}

.tr-subtotal {
    background-color: var(--primary);
    color: var(--basic);
}

tbody tr td {
    padding: .5rem .5rem;
}

tbody tr td:nth-child(1){
    text-align: left;
}

tbody tr td {
    text-align: center;
}

.footer {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
}

button {
    font-size: 10px;
}

.price-disclaimer {
    font-size: 10px;
    font-style: italic;
}

    @media only screen and (min-width: 1024px) {
        
        .header h1 {
            font-size: 1.5em;
            margin-bottom: 2rem;
        }
        .settings-body {
            height: 100%;
        }           
        table {
            font-size: 14px;
        }

        button {
            font-size: 14px;
        }

        .footer {
            align-items: center;
            justify-content: space-between;
        }

        .price-disclaimer {
            font-size: 12px;
            font-style: italic;
        }
    }
</style>