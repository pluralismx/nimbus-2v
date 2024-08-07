<template>
<div class="settings-body">
        <div class="header">
            <h1>Resumen</h1>
            <p v-show="this.period_begins">Periodo del</p>
        </div>
        <div class="details">
            <table>
                <thead>
                    <tr>
                        <th>Concepto</th>
                        <th>Detalle</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Costo mensual</td>
                        <td>${{ this.subtotal }}</td>
                    </tr>
                    <tr>
                        <td>Impuestos</td>
                        <td>${{ this.taxes }}</td>
                    </tr>
                    <tr class="tr-total">
                        <td>Total a pagar</td>
                        <td>${{ this.total }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-show="showNotesMessage" class="footer">
            <button class="btn-primary" @click="openProcessPaymentModal()">Proceder al pago</button>
        </div>
    </div>
</template>
<script>
    export default {
        name: "SubscriptionPreviewComponent",
        props: {
            selection: {
                type: Object,
                required: true
            }
        },
        computed: {
            selectionComputed(){
                return this.selection;
            }
        },
        watch: {
            selectionComputed: {
                handler(newVal){

                    this.emails = newVal.emails;
                    this.contacts = newVal.contacts;
                    this.websites = newVal.websites;
                    this.businesses = newVal.businesses;
                    this.users = newVal.users;

                    this.calculateTotal();
                    this.showNotesMessage = true;
                }
            }
        },
        data() {
            return {

                // Items
                emails: 0,
                contacts: 0,
                websites: 0,
                businesses: 0,
                users: 0,
                
                subtotal: 0.00,
                taxes: 0.00,
                total: 0.00,

                // Layout
                showNotesMessage: false
            }
        },
        methods: {
            truncateDecimals: function (number, digits = 2) {
                const factor = Math.pow(10, digits);
                return Math.round(number * factor) / factor;
            },
            calculatePerdiod: function () {
                // let date = new Date();
                // let periodBegin = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear(); 
                // let periodEnd = (date.getMonth() + 2) + "/" + date.getDate() + "/" + date.getFullYear();
            },
            calculateTotal: function () {
                const taxRate = parseFloat(process.env.VUE_APP_TAX_RATE);
                const baseCharge = parseFloat(process.env.VUE_APP_BASIC_PLAN_CHARGE);
                if (
                    this.emails == 10000 &&
                    this.contacts == 500 &&
                    this.websites == 1 &&
                    this.businesses == 10 &&
                    this.users == 2
                ) {
                    this.subtotal = baseCharge;
                    this.taxes = this.truncateDecimals(this.subtotal * taxRate);
                    this.total = this.truncateDecimals(this.taxes + this.subtotal);
                } else {
                    const emailsCharge = parseFloat(process.env.VUE_APP_EMAILS_CHARGE);
                    const contactsCharge = parseFloat(process.env.VUE_APP_CONTACTS_CHARGE);
                    const websitesCharge = parseFloat(process.env.VUE_APP_WEBSITES_CHARGE);
                    const businessesCharge = parseFloat(process.env.VUE_APP_BUSINESSES_CHARGE);
                    const usersCharge = parseFloat(process.env.VUE_APP_USERS_CHARGE);

                    let additional_emails = 0;
                    if (this.emails > 10000) {
                        additional_emails = this.emails - 10000;
                    }

                    let additional_contacts = 0;
                    if (this.contacts > 500) {
                        additional_contacts = this.contacts - 500;
                    }

                    let additional_websites = 0;
                    if (this.websites > 1) {
                        additional_websites = this.websites - 1;
                    }

                    let additional_businesses = 0;
                    if (this.businesses > 10) {
                        additional_businesses = this.businesses - 10;
                    }

                    let additional_users = 0;
                    if (this.users > 2) {
                        additional_users = this.users - 2;
                    }

                    const additional_emails_charge = this.truncateDecimals(additional_emails/500 * emailsCharge);
                    const additional_contacts_charge = this.truncateDecimals(additional_contacts/500 * contactsCharge);
                    const additional_websites_charge = this.truncateDecimals(additional_websites * websitesCharge);
                    const additional_businesses_charge = this.truncateDecimals(additional_businesses * businessesCharge);
                    const additional_users_charge = this.truncateDecimals(additional_users * usersCharge);
                    
                    this.subtotal = this.truncateDecimals(
                        additional_emails_charge +
                        additional_contacts_charge +
                        additional_websites_charge +
                        additional_businesses_charge +
                        additional_users_charge + 
                        baseCharge
                    );

                    this.taxes = this.truncateDecimals(taxRate * this.subtotal);
                    this.total = this.truncateDecimals(this.taxes + this.subtotal);
                }
            },
            openProcessPaymentModal: function () {
                
                this.$emit("proceed-to-payment", {
                    "type": "new_customer",
                    "emails": this.emails,
                    "contacts": this.contacts,
                    "websites": this.websites,
                    "businesses": this.businesses,
                    "users": this.users,
                    "subtotal": this.subtotal,
                    "taxes": this.taxes,
                    "total": this.total
                });

            },
        }
    }
</script>
<style scoped>
    .settings-body {
        padding: 1rem;
        padding-top: 0;
        background-color: #d2d8db;
        border-radius: .5rem;
        height: 100%;
    }

    .header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    .header h1{
        font-size: 16px;
    }

    .header p{
        font-size: 10px;
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
    }

    thead tr th:nth-child(1){
        text-align: left;

    }

    .tr-total {
        border-top: 1px solid black;
    }

    tbody tr td {
        padding: .5rem .5rem;
    }

    tbody tr td:nth-child(2) {
        text-align: center;
    }

    .span-attention {
        color: var(--warn);
    }

    .footer p{
        font-size: 10px;
    }

    button {
        font-size: 10px;
    }

    @media only screen and (min-width: 1024px) {
        .header {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            margin-top: 1rem;
            margin-bottom: 2rem;
        }

        .header h1{
            font-size: 1.5em;
        }

        .header p{
            font-size: 1em;
        }

        table {
            font-size: 14px;
        }

        .footer p{
            font-size: 14px;
        }

        button {
            font-size: 14px;
        }
    }
</style>