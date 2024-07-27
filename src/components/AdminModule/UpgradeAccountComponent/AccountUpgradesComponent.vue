<template>
    <div class="settings-body">
        <div class="heading">
            <h1>Añadir mejoras</h1>
        </div>
        <table>
            <thead>
                <th>Sitios</th>
                <th>Contactos</th>
                <th>Negocios</th>
                <th>Usuarios</th>
                <th>Correos</th>
            </thead>
            <tbody>
                <td>{{ this.websites }}</td>
                <td>{{ this.contacts }}</td>
                <td>{{ this.businesses }}</td>
                <td>{{ this.users }}</td>
                <td>{{ this.emails }}</td>
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
            <div class="upgrade-card" @click="upgrade(this.toggleButton)">
                <div>
                    <span>{{ resetButton }}</span>
                    <br>
                    <!-- <span>$29.99</span> -->
                </div>
                <img src="../../../../src/assets/images/model.png" alt="">
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
    name: 'AccountUpgradesComponent',
    props: {
        account: {
            type: Object,
            required: true
        }
    },
    computed: {
        accountComputed() {
            return this.account;
        }
    },
    watch: {
        accountComputed: {
            handler(newVal){
                this.users = parseInt(newVal.users, 10);
                this.websites = parseInt(newVal.websites, 10);
                this.emails = parseInt(newVal.emails, 10);
                this.contacts = parseInt(newVal.contacts, 10);
                this.businesses = parseInt(newVal.businesses, 10);
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
            toggleButton: "basic",
            resetButton: "Regresar al plan basico"
        }
    },
    methods: {
        truncateDecimals: function (number) {
            return Math.floor(number * 100) / 100;
        },
        upgrade: function (feature) {
            switch(feature){
                case 'users' :
                    if(this.users < 10) {
                        this.users++;
                        this.cost += 4.99;
                        this.cost = this.truncateDecimals(this.cost);
                        // this.resetButton = "Regresar a mi plan actual";
                    }
                    break;
                case 'websites' :
                    if(this.websites < 30){
                        this.websites++;
                        this.cost += 24.99;
                        this.cost = this.truncateDecimals(this.cost);
                        // this.resetButton = "Regresar a mi plan actual";
                    }
                    break;
                case 'emails' :
                    if(this.emails < 25000){
                        this.emails += 500;
                        this.cost += 4.99;
                        this.cost = this.truncateDecimals(this.cost);
                        // this.resetButton = "Regresar a mi plan actual";
                    }
                    break;
                case 'contacts' :
                    if(this.contacts < 10000){
                        this.contacts += 500;
                        this.cost += 5.99;
                        this.cost = this.truncateDecimals(this.cost);
                        // this.resetButton = "Regresar a mi plan actual";
                    }
                    break;
                case 'businesses' :
                    if(this.businesses < 30){
                        this.businesses++;
                        this.cost += 14.99;
                        this.cost = this.truncateDecimals(this.cost);
                        // this.resetButton = "Regresar a mi plan actual";
                    }
                    break;
                case 'remove-users' :
                    if(this.users > 2  ){
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
                    if(this.emails > 10000){
                        this.emails -= 500;
                        this.cost -= 4.99;
                        this.cost = this.truncateDecimals(this.cost);
                    }else {
                        // Mandar mensaje de error
                    }
                    break;
                case 'remove-contacts' :
                    if(this.contacts > 500){
                        this.contacts -= 500;
                        this.extra_contacts -= 500;
                        this.cost -= 5.99;
                        this.cost = this.truncateDecimals(this.cost);
                    }else{
                        // Mandar mensaje de error
                    }
                    break;
                case 'remove-businesses' :
                    if(this.businesses > 10) {
                        this.businesses--;
                        this.extra_businesses--
                        this.cost -= 14.99;
                        this.cost = this.truncateDecimals(this.cost);
                    }else {
                        // Mandar mensaje de error
                    }
                    break;
                case 'original' : 
                    this.businesses = parseInt(this.account.businesses, 10);
                    this.contacts = parseInt(this.account.contacts, 10);
                    this.websites = parseInt(this.account.websites, 10);
                    this.users = parseInt(this.account.users, 10);
                    this.emails = parseInt(this.account.emails, 10);
                    this.resetButton = "Regresar al plan basico";
                    this.toggleButton = 'basic';

                break;
                
                case 'basic' :
                    this.businesses = 10;
                    this.extra_businesses = 0;
                    
                    this.contacts = 500;
                    this.extra_contacts = 0;

                    this.websites = 1;
                    this.extra_websites = 0;

                    this.users = 2;
                    this.extra_users = 0;

                    this.emails = 10000;
                    this.extra_emails = 0;

                    this.cost = this.truncateDecimals(29.99);
                    this.resetButton = "Regresar a mi plan actual";
                    this.toggleButton = 'original';
                    break;
            }
            this.firstPayment();
        },
        firstPayment: function () {
            const json = {
                "users": this.users,
                "websites": this.websites,
                "emails": this.emails,
                "contacts": this.contacts,
                "businesses": this.businesses
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

.heading span:hover {
    color: var(--primary);
    cursor: pointer;
}

h4 {
    margin-top: 2rem;
    margin-bottom: 1rem;
}

span {
    font-size: 14px;
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

span {
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

    h4 {
        margin-top: 2rem;
        margin-bottom: 1rem;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        font-size: 14px;
        margin-bottom: 2rem;
        box-sizing: border-box;
    }

    .upgrade-card img {
        width: 45px;
    }

    .upgrade-card-container {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem 1rem;
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

    .footer p {
        font-size: 12px;
    }

    .footer p:hover {
        color: var(--primary);
        cursor: pointer;
    }

    span {
        width: 150px;
        padding: 4px;
        font-size: 14px;
    }
}


</style>