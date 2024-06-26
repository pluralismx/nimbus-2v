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
                        <td>{{ this.websites }}</td>
                        <td>${{ this.additionalWebsitesCharge }}</td>
                    </tr>
                    <tr>
                        <td>Negocios adicionales</td>
                        <td>{{ this.businesses }}</td>
                        <td>${{ this.additionalBusinessesCharge }}</td>
                    </tr>
                    <tr>
                        <td>Correos adicionales</td>
                        <td>{{ this.emails }}</td>
                        <td>${{ this.additionalEmailsCharge }}</td>
                    </tr>
                    <tr>
                        <td>Contactos adicionales</td>
                        <td>{{ this.contacts }}</td>
                        <td>${{ this.additionalContactsCharge }}</td>
                    </tr>
                    <tr>
                        <td>Usuarios adicionales</td>
                        <td>{{ this.users }}</td>
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
            }
        },
        computed: {
            selectionComputed() {
                return this.selection;
            }
        },
        watch: {
            selectionComputed: {
                handler(newVal) {
                    this.users = newVal.users;
                    this.websites = newVal.websites;
                    this.emails = newVal.emails;
                    this.contacts = newVal.contacts;
                    this.businesses = newVal.businesses;
                    this.calculateTotal();
                }
            }
        },
        data() {
            return {

                // Features qty
                users: 0,
                websites: 0,
                emails: 0,
                contacts: 0,
                businesses: 0,

                // Charges
                additionalUsersCharge: 0,
                additionalWebsitesCharge: 0,
                additionalEmailsCharge: 0,
                additionalContactsCharge: 0,
                additionalBusinessesCharge: 0,

                // Total
                subtotal: 0,
                taxes: 0,
                total: 0
            }
        },
        methods: {
            openProcessPaymentModal: function () { 
                const json = {
                    "type":"upgrade",
                    "users":this.users,
                    "websites":this.websites,
                    "emails":this.emails,
                    "contacts":this.contacts,
                    "businesses":this.businesses,
                    "total":this.total
                }
                this.$emit("upgrades-selected", json);
            },
            truncateDecimals: function (number) {
                return Math.floor(number * 100) / 100;
            },
            calculateTotal: function () {
                this.additionalUsersCharge = this.truncateDecimals(this.users * 4.99);
                this.additionalWebsitesCharge = this.truncateDecimals(this.websites * 24.99);
                this.additionalEmailsCharge = this.truncateDecimals((this.emails / 500) * 9.99); 
                this.additionalContactsCharge = this.truncateDecimals((this.contacts / 500) * 11.99);
                this.additionalBusinessesCharge = this.truncateDecimals(this.businesses * 14.99);
                this.subtotal = this.truncateDecimals(this.additionalUsersCharge+this.additionalWebsitesCharge+this.additionalEmailsCharge+this.additionalContactsCharge+this.additionalBusinessesCharge);
                this.taxes = this.truncateDecimals(this.subtotal * 0.08);
                this.total = this.truncateDecimals(this.subtotal + this.taxes);
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
}

thead tr th:nth-child(1){
    text-align: left;
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

    @media only screen and (min-width: 1024px) {
        
        .header h1 {
            margin-bottom: 1rem;
        }

        table {
            font-size: 14px;
        }

        button {
            font-size: 14px;
        }
    }
</style>