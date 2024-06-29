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
                <span>Agregar 500 contactos</span>
                <br>
                <span>$11.99 USD</span>
            </div>
            <div class="upgrade-card" @click="upgrade('businesses')">
                <span>Agregar negocio</span>
                <br>
                <span>$14.99 USD</span>
            </div>
            <div class="upgrade-card" @click="upgrade('users')">
                <span>Agregar usuario</span>
                <br>
                <span>$4.99 USD</span>
            </div>
            <div class="upgrade-card" @click="upgrade('websites')">
                <span>Agregar sitio</span>
                <br>
                <span>$24.99 USD</span>
            </div>
            <div class="upgrade-card" @click="upgrade('emails')">
                <span>Agregar 500 correos</span>
                <br>
                <span>$9.99 USD</span>
            </div>
        </div>
        <h4>Quitar caracteristicas</h4>
        <div class="footer">
            <button @click="upgrade('remove-contacts')">quitar 500 contactos</button>
            <button @click="upgrade('remove-businesses')">quitar negocio</button>
            <button @click="upgrade('remove-users')">quitar usuario</button>
            <button @click="upgrade('remove-websites')">quitar sitio</button>
            <button @click="upgrade('remove-emails')">quitar 500 correos</button>
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
        truncateDecimals: function (number) {
            return Math.floor(number * 100) / 100;
        },
        starterPlan: function () {
            this.users = 1;
            this.websites = 1;
            this.emails = 2000;
            this.contacts = 1000;
            this.businesses = 1;
            this.cost = 29.99;
            this.firstPayment();
        },
        upgrade: function (feature) {
            if(this.cost >= 29.99){
                switch(feature){
                    case 'users' :
                        this.users++;
                        this.cost += 4.99;
                        this.cost = this.truncateDecimals(this.cost);
                        break;
                    case 'websites' :
                        this.websites++;
                        this.cost += 24.99;
                        this.cost = this.truncateDecimals(this.cost);
                        break;
                    case 'emails' :
                        this.emails += 500;
                        this.cost += 9.99;
                        this.cost = this.truncateDecimals(this.cost);
                        break;
                    case 'contacts' :
                        this.contacts += 500;
                        this.cost += 11.99;
                        this.cost = this.truncateDecimals(this.cost);
                        break;
                    case 'businesses' :
                        this.businesses++;
                        this.cost += 14.99;
                        this.cost = this.truncateDecimals(this.cost);
                        break;
                    case 'remove-users' :
                        if(this.users > 1){
                            this.users--;
                            this.cost -= 4.99;
                            this.cost = this.truncateDecimals(this.cost);
                        }else {
                            // Mostrar mensaje de error
                        }
                        break;
                    case 'remove-websites' :
                        if(this.websites > 1){
                            this.websites--;
                            this.cost -= 24.99;
                            this.cost = this.truncateDecimals(this.cost);
                        }else{
                            // Mandar mensaje de error
                        }
                        break;
                    case 'remove-emails' :
                        if(this.emails >= 2500){
                            this.emails -= 500;
                            this.cost -= 9.99;
                            this.cost = this.truncateDecimals(this.cost);
                        }else {
                            // Mandar mensaje de error
                        }
                        break;
                    case 'remove-contacts' :
                        if(this.contacts > 1000){
                            this.contacts -= 500;
                            this.cost -= 11.99;
                            this.cost = this.truncateDecimals(this.cost);
                        }else{
                            // Mandar mensaje de error
                        }
                        break;
                    case 'remove-businesses' :
                        if(this.businesses > 1) {
                            this.businesses--;
                            this.cost -= 14.99;
                            this.cost = this.truncateDecimals(this.cost);
                        }else {
                            // Mandar mensaje de error
                        }
                        break;
                }
                this.firstPayment();
            }else {
                this.$emit('cant-add-feature', {
                    "text":"Agrega primero el plan basico",
                    "status":"error"
                });
            }
        },
        firstPayment: function () {
            
            let date = new Date();
            let today = date.getDate();
            // let today = 15;
            let month = date.getMonth();
            let periodBegin = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear(); 
            let periodEnd = (date.getMonth() + 2) + "/15/" + date.getFullYear();

            if(today != 15){
                let prorated_period = (this.months[month].days - today) + 15;
                let pricePerDay = this.cost / this.months[month].days;
                
                let prorated_charge = this.truncateDecimals(pricePerDay) * prorated_period;
                let taxes = prorated_charge * 0.08;
                let total = prorated_charge + taxes;
                const json = {
                    "type": "new_customer",
                    "users": this.users,
                    "websites": this.websites,
                    "emails": this.emails,
                    "contacts": this.contacts,
                    "businesses": this.businesses,
                    "period_begins": periodBegin,
                    "period_end": periodEnd,
                    "monthly_payment": this.cost,
                    "prorated_period": prorated_period,
                    "price_per_day": this.truncateDecimals(pricePerDay),
                    "prorated_charge": this.truncateDecimals(prorated_charge),
                    "taxes": this.truncateDecimals(taxes),
                    "total": this.truncateDecimals(total)
                };
                this.$emit('selection-made', json);
            }else {
                let taxes = this.cost * 0.08;
                let total = this.cost + taxes;
                const json = {
                    "type": "new_customer",
                    "users": this.users,
                    "websites": this.websites,
                    "emails": this.emails,
                    "contacts": this.contacts,
                    "businesses": this.businesses,
                    "period_begins": periodBegin,
                    "period_end": periodEnd,
                    "monthly_payment": this.cost,
                    "prorated_period": "n/a",
                    "price_per_day": "n/a",
                    "prorated_charge": "n/a",
                    "taxes": this.truncateDecimals(taxes),
                    "total": this.truncateDecimals(total)
                };
                this.$emit('selection-made', json);
            }
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
    box-shadow: 2px 2px 6px rgba(0,0,0, .8);
    transition: all 300ms;
    border-bottom: 2px solid var(--primary);
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
    flex-wrap: wrap;
    gap: 2px;
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
        flex-wrap: wrap;
        gap: 8px;
    }

    button {
        width: 150px;
        padding: 4px;
        font-size: 14px;
    }
}

</style>