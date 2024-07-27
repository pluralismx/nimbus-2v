<template>
<div class="settings-body">
        <div class="header">
            <h1>Resumen</h1>
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
            <span class="price-disclaimer" v-show="current == true">Su pago mensual es de ${{ amount_due }} (sin impuestos)</span>
            <span class="price-disclaimer" v-show="modified == true">Su nuevo pago mensual seria de : ${{ amount_due }} (sin impuestos)</span>
            <span class="price-disclaimer" v-show="basic == true">Mensualidad plan básico : ${{ amount_due }} (sin impuestos)</span>

            <button class="btn-primary" @click="openProcessPaymentModal()">Comprar</button>
        </div>
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
                    this.total = 0,
                    this.amount_due = 0
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
                basic: false,
                current: false,
                modified: false
            }
        },
        methods: {
            openProcessPaymentModal: function () { 
                const json = {
                    "type":"upgrade",
                    "users":this.upgrades.users,
                    "websites":this.upgrades.websites,
                    "emails":this.upgrades.emails,
                    "contacts":this.upgrades.contacts,
                    "businesses":this.upgrades.businesses,
                    "total":this.total
                }
                this.$emit("upgrades-selected", json);
            },
            truncateDecimals: function (number) {
                return Math.floor(number * 100) / 100;
            },
            calculateTotal: function () {

                // Emails
                if(this.modifiedPlan.emails != this.account.emails) {
                    this.upgrades.emails = this.modifiedPlan.emails - this.basicPlan.emails;
                    if (this.upgrades.emails < 0) {
                        this.upgrades.emails = 0;
                    }
                } else {
                    this.upgrades.emails = 0;
                }


                // Contacts
                if(this.modifiedPlan.contacts != this.account.contacts) {
                    this.upgrades.contacts = this.modifiedPlan.contacts - this.basicPlan.contacts;
                    if (this.upgrades.contacts < 0) {
                        this.upgrades.contacts = 0;
                    }
                } else {
                    this.upgrades.contacts = 0;
                }

                // Users
                if(this.modifiedPlan.users != this.account.users){ 
                    if(this.modifiedPlan.users < this.account.users){
                        this.upgrades.users = this.modifiedPlan.users - this.basicPlan.users;
                    }else{
                        this.upgrades.users = this.modifiedPlan.users - this.account.users;
                    }
                }else {
                    this.upgrades.users = 0;
                }

                // Websites
                if(this.modifiedPlan.websites != this.account.websites){ 
                    if(this.modifiedPlan.websites < this.account.websites){
                        this.upgrades.websites = this.modifiedPlan.websites - this.basicPlan.websites;
                    }else{
                        this.upgrades.websites = this.modifiedPlan.websites - this.account.websites;
                    }
                }else {
                    this.upgrades.websites = 0;
                }
                
                // Businesses
                if(this.modifiedPlan.businesses != this.account.businesses){ 
                    if(this.modifiedPlan.businesses < this.account.businesses){
                        this.upgrades.businesses = this.modifiedPlan.businesses - this.basicPlan.businesses;
                    }else{
                        this.upgrades.businesses = this.modifiedPlan.businesses - this.account.businesses;
                    }
                }else {
                    this.upgrades.businesses = 0;
                }

                if(
                    this.modifiedPlan.emails == 10000 &&
                    this.modifiedPlan.contacts == 500 &&
                    this.modifiedPlan.websites == 1 &&
                    this.modifiedPlan.businesses == 10 &&
                    this.modifiedPlan.users == 2
                ){
                    this.additionalEmailsCharge = 0;
                    this.additionalUsersCharge = 0;
                    this.additionalContactsCharge = 0;
                    this.additionalBusinessesCharge = 0;
                    this.additionalWebsitesCharge = 0;
                    this.modified = false;  
                    this.current = false;
                    this.basic = true;
                    this.subtotal = 29.99;
                    this.taxes = this.truncateDecimals(this.subtotal * 0.08);
                    this.total = this.truncateDecimals(this.taxes + this.subtotal);
                }else{  // Si se modifica el paquete

                    let emails;
                    let contacts;
                    let websites;
                    let businesses;
                    let users;

                    // Emails
                    if(this.upgrades.emails > 0){
                        emails = this.truncateDecimals(this.upgrades.emails/500 * 4.99);
                        this.additionalEmailsCharge = this.truncateDecimals(this.upgrades.emails/500 * 4.99);
                        this.modified = true;  
                        this.current = false;
                        this.basic = false;
                        // console.log(emails);
                    }else {
                        emails = 0;
                        this.additionalEmailsCharge = 0;
                    }
                    
                    
                    // Contacts 
                    if(this.upgrades.contacts > 0){
                        contacts = this.truncateDecimals(this.upgrades.contacts/500 * 5.99 );
                        this.additionalContactsCharge = this.truncateDecimals(this.upgrades.contacts/500 * 5.99);
                        this.modified = true;  
                        this.current = false;
                        this.basic = false;
                        // console.log(contacts);
                    }else{
                        contacts = 0;
                        this.additionalContactsCharge = 0;
                    }
                    

                    // Websites
                    if(this.upgrades.websites > 0){
                        websites = this.truncateDecimals(this.upgrades.websites * 24.99);
                        this.additionalWebsitesCharge = this.truncateDecimals(this.upgrades.websites * 24.99);
                        this.modified = true;  
                        this.current = false;
                        this.basic = false;
                        // console.log(websites);
                    }else {
                        websites = 0;
                        this.additionalWebsitesCharge = 0;
                    }
                    

                    // businesses
                    if(this.upgrades.businesses > 0) {
                        businesses = this.truncateDecimals(this.upgrades.businesses * 14.99);
                        this.additionalBusinessesCharge = this.truncateDecimals(this.upgrades.businesses * 14.99);
                        this.modified = true;  
                        this.current = false;
                        this.basic = false;
                        // console.log(businesses);
                    }else{
                        businesses = 0;
                        this.additionalBusinessesCharge = 0;
                    }
                    

                    // Users
                    if(this.upgrades.users > 0){
                        users = this.truncateDecimals(this.upgrades.users * 4.99);
                        this.additionalUsersCharge = this.truncateDecimals(this.upgrades.users * 4.99);
                        this.modified = true;  
                        this.current = false;
                        this.basic = false;
                        // console.log(users);
                    }else {
                        users = 0;
                        this.additionalUsersCharge = 0;
                    }

                    this.subtotal = this.truncateDecimals(emails+contacts+websites+businesses+users);
                    this.taxes = this.truncateDecimals(this.subtotal * .08);
                    this.total = this.truncateDecimals(this.subtotal + this.taxes);

                }

                if(this.basic == true) {
                    this.amount_due = 29.99;
                }

                if(this.modified == true) {
                    this.amount_due = this.truncateDecimals(parseFloat(this.account.amount_due) + this.subtotal);
                }

                if(this.subtotal == 0) {
                    this.basic = false;
                    this.modified = false;
                    this.current = true;
                    this.amount_due = this.account.amount_due;
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