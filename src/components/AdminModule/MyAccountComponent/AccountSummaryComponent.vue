<template>
    <div class="settings-body">
        <div class="heading">
            <h1>Resumen de mi cuenta</h1>
        </div>
        <table>
            <thead>
                <th>Sitios</th>
                <th>Contactos</th>
                <th>Negocios</th>
                <th>Usuarios</th>
                <th>Correos</th>
                <th>Mensualidad</th>
            </thead>
            <tbody>
                <td>{{ account.websites }}</td>
                <td>{{ account.contacts }}</td>
                <td>{{ account.businesses }}</td>
                <td>{{ account.users }}</td>
                <td>{{ account.emails }}</td>
                <td>${{ account.amount_due }}</td>
            </tbody>
        </table>
        <h4>Pagar mensualidad (vence el {{ this.due_date }})</h4>
        <table id="table-account-summary">
            <thead>
                <tr>
                    <th>Concepto</th>
                    <th>cargo</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Mensualidad</td>
                    <td>${{ this.amount_due }}</td>
                </tr>
                <tr>
                    <td>Pago tardio</td>
                    <td>${{ this.late_fee }}</td>
                </tr>
                <tr>
                    <td>Subtotal</td>
                    <td>${{ this.subtotal }}</td>
                </tr>
                <tr>
                    <td>Impuestos</td>
                    <td>${{ this.taxes }}</td>
                </tr>
                <tr>
                    <td>Total</td>
                    <td>${{ this.total }}</td>
                </tr>
            </tbody>
        </table>
        <div class="footer">
            <button class="btn-warning" @click="makePayment()">Pagar mensualidad</button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'AccountSummaryComponent',
    props: {
        account: {
            type: Object,
            required: true
        }
    },
    watch: {
        account: {
            immediate: true,
            handler(newVal) {
                if (newVal) {
                    this.paymentDetails();
                }
            }
        }
    },
    data() {
        return {
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
            ],
            
            due_date: '',
            amount_due: '',
            late_fee: '',
            subtotal: '',
            taxes: '',
            total: ''
        }
    },
    methods: {
        truncateDecimals: function (number) {
            return Math.floor(number * 100) / 100;
        },
        paymentDetails: function () {
            let date = new Date();
            let today = date.getDate();
            let month = date.getMonth();
            let due_date = new Date(this.account.due_date);
            let due_date_month = due_date.getMonth();
            
            this.due_date = (due_date.getDate()+1)+"/"+(due_date_month+1)+"/"+due_date.getFullYear(); 
    
            if(month == due_date_month && today > 15) {
                
                let days_late = today - 15;
                let pricePerDay = parseFloat(this.account.amount_due) / this.months[month].days;
                
                this.amount_due = parseFloat(this.account.amount_due);
                this.late_fee = this.truncateDecimals(pricePerDay) * days_late;
                this.subtotal = this.truncateDecimals(parseFloat(this.account.amount_due) + this.late_fee);
                this.taxes = this.truncateDecimals(this.subtotal * 0.08);
                this.total = this.truncateDecimals(this.subtotal + this.taxes);
            }else {
                this.amount_due = parseFloat(this.account.amount_due);
                this.late_fee = 0;
                this.subtotal = parseFloat(this.account.amount_due);
                this.taxes = this.truncateDecimals(this.amount_due * 0.08);
                this.total = this.truncateDecimals(this.subtotal + this.taxes);
            }
        },
        makePayment: function () {
            this.$emit("selection-made", {
                "type":"monthly_payment",
                "total": this.total
            });
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
    margin: 1rem 0;
}

.heading h1 {
    font-size: 16px;
}

.heading span:hover {
    color: var(--primary);
    cursor: pointer;
}

h4 {
    margin: 1em 0;
}
span {
    font-size: 14px;
}
table {
    width: 100%;
    border-collapse: collapse;
    font-size: 10px;
}
thead {
    width: 100%;
    color: var(--basic);
    background-color: var(--primary);
}

td, th {
    text-align: center;
    padding: 4px;
}

td {
    border-bottom: 1px solid var(--shadows);
}

.upgrade-card-container {
    display: flex;
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

#table-account-summary {
    margin-bottom: 2rem;
}

#table-account-summary thead tr th{
    text-align: left;
    padding: 4px .5rem;
}

#table-account-summary thead tr th:nth-last-child(1){
    text-align: center;
}

#table-account-summary tbody tr td{
    border: none;
    text-align: left;
    padding: 8px .5rem;
}

#table-account-summary tbody tr:nth-last-child(1){
    border-top: 1px solid black;
}

#table-account-summary tbody tr td:nth-last-child(1){
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

    .settings-body {
        display: flex;
        flex-direction: column;
        padding: 0 1rem;
        padding-bottom: 1rem;
    }
    .upgrade-card-container {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem 1rem;
    }
    .upgrade-card {
        padding: 1rem;
        box-sizing: border-box;
        background-color: #d2d8db;
        color: var(--shadows);
        border-radius: .5rem;
        width: calc(50% - .5rem);
        box-shadow: 2px 2px 6px rgba(0,0,0, .8);
        transition: all 300ms;
        border-bottom: 2px solid var(--primary);
    }
    .upgrade-card:hover {
        transform: translateY(4px);
        cursor: pointer;
        background: rgb(168,168,168);
        background: linear-gradient(0deg, rgba(168,168,168,1) 0%, rgba(198,198,198,1) 50%, rgba(210,216,219,1) 100%);
    }

    table {
        font-size: 14px;
    }
}

</style>