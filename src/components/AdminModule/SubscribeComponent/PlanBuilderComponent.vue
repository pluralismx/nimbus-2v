<template>
    <div class="settings-body">
        <div class="heading">
            <h1>Armar paquete</h1>
            <span @click="starterPlan()">comenzar plan basico</span>
        </div>
        <table>
            <thead>
                <th>Sitios</th>
                <th>Contactos</th>
                <th>Negocios</th>
                <th>Usuarios</th>
                <th>Correos</th>
                <th>Costo</th>
            </thead>
            <tbody>
                <td>{{ this.websites }}</td>
                <td>{{ this.contacts }}</td>
                <td>{{ this.businesses }}</td>
                <td>{{ this.users }}</td>
                <td>{{ this.emails }}</td>
                <td>${{ this.cost }}</td>
            </tbody>
        </table>
        <div class="upgrade-card-container">
            <div class="upgrade-card" @click="upgrade('contacts')">
                <div>
                    <span>Agregar 500 contactos</span>
                    <br>
                    <span>$5.99 USD</span>
                </div>
                <img src="../../../../src/assets/images/contact.png" alt="">
            </div>
            <div class="upgrade-card" @click="upgrade('emails')">
                <div>
                    <span>Agregar 500 correos</span>
                    <br>
                    <span>$4.99 USD</span>
                </div>
                <img src="../../../../src/assets/images/email.png" alt="">
            </div>
            <div class="upgrade-card" @click="upgrade('businesses')">
                <div>
                    <span>Agregar negocio</span>
                    <br>
                    <span>$14.99 USD</span>
                </div>
                <img src="../../../../src/assets/images/portfolio.png" alt="">
            </div>
            <div class="upgrade-card" @click="upgrade('users')">
                <div>
                    <span>Agregar usuario</span>
                    <br>
                    <span>$4.99 USD</span>
                </div>
                <img src="../../../../src/assets/images/boy.png" alt="">
            </div>
            <div class="upgrade-card" @click="upgrade('websites')">
                <div>
                    <span>Agregar sitio</span>
                    <br>
                    <span>$24.99 USD</span>
                </div>
                <img src="../../../../src/assets/images/earth.png" alt="">
            </div>
        </div>
        <div class="footer">

            <div @click="upgrade('remove-contacts')">
                <img src="../../../../src/assets/images/contact.png" alt="">
                <p>quitar 500 contactos</p>
            </div>

            <div @click="upgrade('remove-emails')">
                <img src="../../../../src/assets/images/email.png" alt="">
                <p>quitar 500 correos</p>
            </div>

            <div @click="upgrade('remove-businesses')">
                <img src="../../../../src/assets/images/portfolio.png" alt="">
                <p>quitar negocio</p>
            </div>

            <div @click="upgrade('remove-users')">
                <img src="../../../../src/assets/images/boy.png" alt="">
                <p>quitar usuario</p>
            </div>
            
            <div @click="upgrade('remove-websites')">
                <img src="../../../../src/assets/images/earth.png" alt="">
                <p>quitar sitio</p>
            </div>
        
        </div>
    </div>
</template>
<script>
export default {
    name: 'PlanBuilderComponent',
    props: {
        account: {
            type: Object,
            required: true
        }
    },
    watch: {
        account: {
            handler(newVal){
                this.users = newVal.users;
                this.websites = newVal.websites;
                this.emails = newVal.emails;
                this.contacts = newVal.contacts;
                this.businesses = newVal.businesses;
            }
        }
    },
    data() {
        return {
            // Caracteristicas del paquete
            users: 0,
            websites: 0,
            emails: 0,
            contacts: 0,
            businesses: 0,
            
            cost: 0,
            subtotal: 0,
            paymentMonth: 0,
            proratedDays: 0,
            proratedPeriod: 0,
            dailyCost: 0,
            prorated: 0,
            
            months: [
                {"name": "enero", "days": 31},
                {"name": "febrero", "days": 28},
                {"name": "marzo", "days": 31},
                {"name": "abril", "days": 30},
                {"name": "mayo", "days": 31},
                {"name": "junio", "days": 30},
                {"name": "julio", "days": 31},
                {"name": "agosto", "days": 31},
                {"name": "septiembre", "days": 30},
                {"name": "octubre", "days": 31},
                {"name": "noviembre", "days": 30},
                {"name": "diciembre", "days": 31}
            ]
        }
    },
    methods: {
        starterPlan: function () {
            this.users = 2;
            this.websites = 1;
            this.emails = 10000;
            this.contacts = 500;
            this.businesses = 10;
            this.cost = parseFloat(process.env.VUE_APP_BASIC_PLAN_CHARGE);
            this.firstPayment();
        },
        truncateDecimals: function (number, digits = 2) {
            const factor = Math.pow(10, digits);
            return Math.round(number * factor) / factor;
        },
        upgrade: function (feature) {
            const emailsCharge = parseFloat(process.env.VUE_APP_EMAILS_CHARGE);
            const contactsCharge = parseFloat(process.env.VUE_APP_CONTACTS_CHARGE);
            const websitesCharge = parseFloat(process.env.VUE_APP_WEBSITES_CHARGE);
            const businessesCharge = parseFloat(process.env.VUE_APP_BUSINESSES_CHARGE);
            const usersCharge = parseFloat(process.env.VUE_APP_USERS_CHARGE);
            const baseCharge = parseFloat(process.env.VUE_APP_BASIC_PLAN_CHARGE);

            if (this.cost >= baseCharge) {
                switch (feature) {
                    case 'users':
                        this.users++;
                        this.cost = this.truncateDecimals(this.cost + usersCharge);
                        break;
                    case 'websites':
                        this.websites++;
                        this.cost = this.truncateDecimals(this.cost + websitesCharge);
                        break;
                    case 'emails':
                        this.emails += 500;
                        this.cost = this.truncateDecimals(this.cost + emailsCharge);
                        break;
                    case 'contacts':
                        this.contacts += 500;
                        this.cost = this.truncateDecimals(this.cost + contactsCharge);
                        break;
                    case 'businesses':
                        this.businesses++;
                        this.cost = this.truncateDecimals(this.cost + businessesCharge);
                        break;
                    // Remove features
                    case 'remove-users':
                        if (this.users > 2) {
                            this.users--;
                            this.cost = this.truncateDecimals(this.cost - usersCharge);
                        }
                        break;
                    case 'remove-websites':
                        if (this.websites > 1) {
                            this.websites--;
                            this.cost = this.truncateDecimals(this.cost - websitesCharge);
                        }
                        break;
                    case 'remove-emails':
                        if (this.emails > 10000) {
                            this.emails -= 500;
                            this.cost = this.truncateDecimals(this.cost - emailsCharge);
                        }
                        break;
                    case 'remove-contacts':
                        if (this.contacts >= 1000) {
                            this.contacts -= 500;
                            this.cost = this.truncateDecimals(this.cost - contactsCharge);
                        }
                        break;
                    case 'remove-businesses':
                        if (this.businesses > 1) {
                            this.businesses--;
                            this.cost = this.truncateDecimals(this.cost - businessesCharge);
                        }
                        break;
                }
                this.firstPayment();
            } else {
                this.$emit('cant-add-feature', {
                    "text": "Agrega primero el plan basico",
                    "status": "error"
                });
            }
        },
        firstPayment: function () {
            const json = {
                "users": this.users,
                "websites": this.websites,
                "emails": this.emails,
                "contacts": this.contacts,
                "businesses": this.businesses,
            };
            this.$emit('selection-made', json);
        }
    }
}
</script>
<style scoped>

.heading {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    margin-bottom: 1rem;
}

.heading h1 {
    font-size: 16px;
}

.heading span {
    font-size: 12px;
}

.heading span:hover {
    color: var(--primary);
    cursor: pointer;
}

h4 {
    margin-top: 2rem;
    margin-bottom: 1rem;
}

table {
    width: 100%;
    border-collapse: collapse;
    font-size: 10px;
    margin-bottom: 2rem;
    box-sizing: border-box;
}

thead {
    width: 100%;
    color: var(--basic);
    background-color: var(--primary);
}

td, th {
    text-align: center;
    padding: .5rem .5rem;
}

td {
    border-bottom: 1px solid var(--shadows);
}

.upgrade-card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem 1rem;
    
}

.upgrade-card {
    padding: 4px 6px;
    box-sizing: border-box;
    background-color: #d2d8db;
    color: var(--shadows);
    border-radius: .5rem;
    width: calc(50% - .5rem);
    box-shadow: 2px 2px 4px rgba(0,0,0, .8);
    transition: all 300ms;
    border-bottom: 2px solid var(--primary);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.upgrade-card img {
    width: 35px;
}

.upgrade-card span{
    font-size: 10px;
}

.settings-body {
    display: flex;
    flex-direction: column;
    padding: 0 1rem;
    padding-bottom: 1rem;
    flex-grow: 1;
    min-height: 0;
    background-color: #d2d8db;
    border-radius: .5rem;
}


.footer {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 28px;
    margin: 2rem 0;
}

.footer div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.footer p {
    font-size: 10px;
}

.footer div img{
    filter: grayscale(1);
    width: 30px;
    margin-bottom: 10px;
}

button {
    width: 100px;
    padding: 4px 0px;
    font-size: 10px;
}

@media only screen and (min-width: 1024px) {
    
    .heading {
        margin-bottom: 2rem;
    }

    .heading h1 {
        font-size: 1.5em;
    }

    .heading span {
        font-size: 1em;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        font-size: 14px;
        margin-bottom: 2rem;
        box-sizing: border-box;
    }

    .settings-body {
        display: flex;
        flex-direction: column;
        padding: 0 1rem;
        padding-bottom: 1rem;
    }

    .upgrade-card {
        padding: 1rem;
        
    }

    .upgrade-card img {
        width: 45px;
    }

    .upgrade-card span{
        font-size: 14px;
    }

    .upgrade-card:hover {
        transform: translateY(4px);
        cursor: pointer;
        background: rgb(168,168,168);
        background: linear-gradient(0deg, rgba(168,168,168,1) 0%, rgba(198,198,198,1) 50%, rgba(210,216,219,1) 100%);
    }

    .footer {
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-wrap: wrap;
        min-height: 0;
        flex: 1;
        gap: 16px;
    }

    .footer div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .footer p {
        font-size: 10px;
    }

    .footer div img{
        filter: grayscale(1);
        width: 25px;
        margin-bottom: 10px;
    }

    .footer div img:hover{
        filter: grayscale(0);
        cursor: pointer;
    }

    .footer p {
        font-size: 12px;
    }

    .footer p:hover {
        color: var(--primary);
        cursor: pointer;
    }

    button {
        width: 150px;
        padding: 4px;
        font-size: 14px;
    }
}

</style>