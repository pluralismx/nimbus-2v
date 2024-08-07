<template>
    <div class="modal-screen">

        <!-- User details -->
        <div v-show="isVisibleUserDetails" class="modal-container">

            <div class="modal-header">
                <span>1. Datos personales</span>
                <span class="close-cross" @click="close()">&times;</span>
            </div>

            <div class="modal-body">
                <span>Nombre</span>
                <div class="input-block">
                    <!-- <label for="holder_name">Nombre del Titular</label> -->
                    <input type="text" id="holder_name" v-model="user.name" required>
                </div>
                <span>Apellidos</span>
                <div class="input-block">
                    <!-- <label for="card_number">Número de Tarjeta</label> -->
                    <input type="text" id="card_number" v-model="user.surname" required>
                </div>
                <!-- Fecha de expiracion -->
                <span>Correo electrónico</span>
                <div class="input-block">
                    <!-- <label for="card_number">Número de Tarjeta</label> -->
                    <input type="text" id="card_number" v-model="user.email" required>
                </div>
                <span>Teléfono</span>
                <div class="input-block">
                    <!-- <label for="card_number">Número de Tarjeta</label> -->
                    <input type="text" id="card_number" v-model="user.phone" required>
                </div>
                <div class="buttons-block">
                    <button class="btn-primary" @click="close()">cancelar</button>
                    <button class="btn-warning" @click="proceedToCardInfo()">siguiente</button>
                </div>

            </div>
        </div>

        <!-- Card info -->
        <div v-show="isVisibleCardInfo" class="modal-container">

            <div class="modal-header">
                <span>2. Forma de pago</span>
                <span class="close-cross" @click="close()">&times;</span>
            </div>

            <div class="modal-body">
                <div class="accepted-cards-container">
                    <div class="credit-cards-block">
                        <span>Tarjetas de crédito</span>
                        <div class="credit-cards-container">
                            <img src="../../../../src/assets/images/tarjetas-mini.png" alt="">
                        </div>
                    </div>
                    <div class="debit-cards-block">
                        <span>Tarjetas de débito</span>
                        <div class="debit-cards-container">
                            <img src="../../../../src/assets/images/bancomer.png">
                            <img src="../../../../src/assets/images/santander.png">
                            <img src="../../../../src/assets/images/scotiabank.png">
                            <img src="../../../../src/assets/images/inbursa.png">
                            <img src="../../../../src/assets/images/ixe.png">
                            <img src="../../../../src/assets/images/hsbc.png">
                        </div>
                    </div>
                </div>
                <form id="payment-form" @submit.prevent>
                    <span>Nombre del titular</span>
                    <div class="input-block">
                        <!-- <label for="holder_name">Nombre del Titular</label> -->
                        <input type="text" id="holder_name" name="holder_name" data-openpay-card="holder_name" v-model="card.holder_name" required>
                    </div>
                    <span>Número de Tarjeta</span>
                    <div class="input-block">
                        <!-- <label for="card_number">Número de Tarjeta</label> -->
                        <input placeholder="xxxx-xxxx-xxxx-xxxx" name="card_number" type="text" id="card_number" data-openpay-card="card_number" v-model="card.card_number" required>
                    </div>
                    <!-- Fecha de expiracion -->
                    <span>Fecha de expiracion y codigo de seguridad</span>
                    <div class="expiration-date-container">
                        <div class="input-block">
                            <!-- <label for="expiration_month">Mes de Expiración</label> -->
                            <input placeholder="mes" name="expiration_month" type="text" id="expiration_month" data-openpay-card="expiration_month" v-model="card.expiration_month" required>
                        </div>
                        <div class="input-block">
                            <!-- <label for="expiration_year">Año de Expiración</label> -->
                            <input placeholder="año" name="expiration_year" type="text" id="expiration_year" data-openpay-card="expiration_year" v-model="card.expiration_year" required>
                        </div>
                        <div class="input-block">
                            <!-- <label for="cvv2">CVV</label> -->
                            <input placeholder="CVV" name="cvv2" type="text" id="cvv2" data-openpay-card="cvv2" v-model="card.cvv2" required>
                        </div>
                        <img src="../../../assets/images/cvv.png" class="cvv-icon">
                    </div>
                    <div class="secure-payment-block">
                        <img src="../../../assets/images/openpay.png">
                        <img src="../../../assets/images/ssl-payment.png">
                    </div>
                    <div class="buttons-block">
                        <button class="btn-primary" @click="proceedToCardInfo()">atrás</button>
                        <button class="btn-warning" @click="proceedToPaymentScreen()">siguiente</button>
                    </div>
                </form>
            </div>

        </div>

        <!-- Pay -->
        <div v-show="isVisibleConfirmPayment" class="modal-container">
    
            <div class="modal-header">
                <span>3. Confirmar pago</span>
                <span class="close-cross" @click="close()">&times;</span>
            </div>

            <div v-show="!processingPayment" class="modal-body">
                <span>Total: ${{ selection.total }} USD</span>
                <br>
                <br>
                <span>Titular: {{ card.holder_name }}</span>
                <br><br>
                <span>Metodo de pago: XXXX-XXXX-XXXX-{{ lastFourDigits }}</span>
                <br><br>
                <span>Fecha de expiracion: {{ card.expiration_month }}/{{ card.expiration_year }}</span>
                <br><br>
                <span>Email: {{ user.email }}</span>
                <div class="buttons-block">
                    <button class="btn-primary" @click="proceedToCardInfo()">atrás</button>
                    <button class="btn-warning" @click="createToken()">pagar</button>
                </div>
            </div>
            <div v-show="processingPayment" class="modal-body loading">
                <img src="../../../../src/assets/images/loading.gif" alt="">
            </div>     
        </div>

        <!-- Status message -->
        <div v-show="isVisiblePaymentStatus" class="modal-container">
    
            <div class="modal-header">
                <span>4. Estado de la compra</span>
                <span class="close-cross" @click="close()">&times;</span>
            </div>

            <div class="modal-body">
                <h2>{{ selectionStatus }}</h2>
                <br>
                <p><span>Respuesta del banco: </span><span class="error-message">{{ selectionMessage }}</span></p>
                <div class="buttons-block">
                    <button class="btn-primary" @click="close()">aceptar</button>
                </div>  
            </div>
        </div>
        
    </div>
</template>
<script>    
    import axios from "@/lib/axios";
    export default {
        name: 'ProcessPaymentModalComponent',
        props: {
            selection: {
                type: Object,
                required: true
            }
        },
        computed: {
            lastFourDigits() {
                return this.card.card_number.toString().slice(-4);
            }
        },
        data() {
            return {
                // Template
                isVisibleUserDetails: true,
                isVisibleCardInfo: false,
                isVisibleConfirmPayment: false,
                isVisiblePaymentStatus: false,
                processingPayment: false,
                selectionStatus: '',
                selectionMessage: '',

                // Data
                user: {
                    name: 'Andrea',
                    surname: 'Perez',
                    phone: '526642522024',
                    email: 'andrea@pluralis.com.mx'
                },
                
                card: {
                    holder_name: 'andrea perez',
                    card_number: '4111111111111111',
                    expiration_month: '12',
                    expiration_year: '24',
                    cvv2: '123'
                },
            }
        },
        methods: {
            // Template
            proceedToCardInfo: function () {
                if(this.isVisibleUserDetails == true) {
                    this.isVisibleUserDetails = false;
                    this.isVisibleCardInfo = true;
                    this.isVisibleConfirmPayment = false;
                }else{
                    this.isVisibleUserDetails = true;
                    this.isVisibleCardInfo = false;
                    this.isVisibleConfirmPayment = false;
                }
            },
            proceedToPaymentScreen: function () {
                if(this.isVisibleConfirmPayment == true) {
                    this.isVisibleConfirmPayment = false;
                    this.isVisibleCardInfo = true
                }else{
                    this.isVisibleConfirmPayment = true;
                    this.isVisibleCardInfo = false
                }
            },
            close: function () {
                this.$emit("close-proccess-payment-modal");
                // this.user.name = '';
                // this.user.surname = '';
                // this.user.phone = '';
                // this.user.email = '';
                // this.card.holder_name = '';
                // this.card.card_number = '';
                // this.card.expiration_month = '';
                // this.card.expiration_year = '';
                // this.card.cvv2 = '';
                this.isVisibleUserDetails = true;
                this.isVisibleCardInfo = false;
                this.isVisibleConfirmPayment = false;
                this.isVisiblePaymentStatus =false;
            },

            // Payment
            createToken: function () {
                this.processingPayment = true;
                OpenPay.setId(process.env.VUE_APP_OPENPAY_MERCHANT_ID);
                OpenPay.setApiKey(process.env.VUE_APP_OPENPAY_PUBLIC_API_KEY);
                OpenPay.setSandboxMode(true);
                OpenPay.token.extractFormAndCreate('payment-form', this.successCallback, this.errorCallback);
            },
            successCallback: async function (response) {
                console.log(this.selection);
                const token = response.data.id;
                let json = {};
                let url;
                
                if(this.selection.type == "new_customer"){
                    json = { 
                        "description": "Nimbus CRM",
                        "token": token,
                        "name": this.user.name,
                        "surname": this.user.surname,
                        "email": this.user.email,
                        "phone": this.user.phone,                      
                        "users": this.selection.users,
                        "websites": this.selection.websites,
                        "emails": this.selection.emails,
                        "contacts": this.selection.contacts,
                        "businesses": this.selection.businesses,
                    };
                    url = 'payCRM';
                }else if(this.selection.type == "upgrade"){
                    json = {
                        "description": "Nimbus CRM Account upgrades",
                        "token": token,
                        "name": this.user.name,
                        "surname": this.user.surname,
                        "email": this.user.email,
                        "phone": this.user.phone,                       
                        "users": this.selection.users,
                        "websites": this.selection.websites,
                        "emails": this.selection.emails,
                        "contacts": this.selection.contacts,
                        "businesses": this.selection.businesses,
                    }
                    url = 'addUpgrades';
                    console.log(json);
                }else{
                    json = {
                        "token": token,
                        "name": this.user.name,
                        "surname": this.user.surname,
                        "email": this.user.email,
                        "phone": this.user.phone,
                        "description": "Nimbus CRM monthly payment",
                    }
                    url = 'monthlyPayment'
                }

                let formData = new FormData();
                formData.append('json', JSON.stringify(json));

                axios.post('/api/payments/'+url, formData, {"withCredentials":true})
                .then(response => {
                    
                    if(response.data.status == "success"){
                        // Reset layout
                        this.processingPayment = false;
                        this.isVisibleUserDetails = false;
                        this.isVisibleCardInfo = false;
                        this.isVisibleConfirmPayment = false;
                        this.isVisiblePaymentStatus = true;

                        // Clean card and user fields
                        this.user.name = '';
                        this.user.surname = '';
                        this.user.phone = '';
                        this.user.email = '';
                        this.card.holder_name = '';
                        this.card.card_number = '';
                        this.card.expiration_month = '';
                        this.card.expiration_year = '';
                        this.card.cvv2 = '';

                        // Show server response
                        this.selectionMessage = "Su compra se realizó exitosamente. Se ha enviado un correo a la direccion proporcionada con la confirmación de su compra";
                        this.selectionStatus = "Se procesó el pago";
                    }
                    this.$emit('reload-account');
                })
                .catch(error => {
                    console.log(error.response.data);
                    this.isVisibleUserDetails = false;
                    this.isVisibleCardInfo = false;
                    this.isVisibleConfirmPayment = false;
                    this.isVisiblePaymentStatus = true;
                    this.selectionMessage = error.response.data.message;
                    this.selectionStatus = "No se pudo procesar el pago";
                });
            },
            errorCallback: function (response) {
                console.log(response.data.description);
                // const desc = response.data.description !== undefined ? response.data.description : response.message;
                // alert("ERROR [" + response.status + "] " + desc);
            }
        }
    }
</script>
<style scoped>

.error-message {
    color: var(--primary);
}

.modal-container {
    width: 80%;
    border-radius: .5rem;
    /* background-color: var(--basic); */
    box-shadow: 2px 2px 16px rgba(0,0,0,.6);
}

.modal-header {
    padding: .5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--primary);
    border-top-left-radius: .5rem;
    border-top-right-radius: .5rem;
    color: var(--basic);
}

.modal-body {
    padding: 1rem;
    background-color: var(--basic);
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-left-radius: .5rem;
    border-bottom-right-radius: .5rem;
}

.input-block {
    display: flex;
    flex-direction: column;
    margin: .5rem 0;
    
}

.input-block input {
    width: 100%;
    box-sizing: border-box;
}

.buttons-block {
    display: flex;
    width: 100%;
    justify-content: center;
}

.buttons-block button{
    width: 100px;
    margin-top: 1.5rem;
}

.buttons-block button:nth-child(1){
    margin-right: 2rem;
}

.expiration-date-container {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-around;
}

.expiration-date-container .input-block input{
    width: 50px;
    margin-right: 1rem;
}

.cvv-icon {
    width: 50px;
}


@media only screen and (min-width: 1024px) {
    .input-block {
        margin: 1rem 0;
    }
    .buttons-block button{
        width: 100px;
        margin-top: 2rem;
    }

    .modal-container {
        width: 500px;
    }

    .expiration-date-container {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: flex-start;
    }

    .expiration-date-container .input-block input{
        margin-right: 2rem;
    }
    
}

.credit-cards-container {
    padding: 0;
}

.credit-cards-container img{
    width: 180px;
    filter: grayscale(100%);
}

.debit-cards-container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;
    padding: 8px 0;
    gap: 8px;
}

@media only screen and (min-width: 1024px) {
    .debit-cards-container {
        gap: 0;
        padding: 16px 0;
    }

    .credit-cards-container {
        padding: 10px 0;
    }
}

.debit-cards-container img{
    width: 65px;
    filter: grayscale(100%);
}

.secure-payment-block {
    margin-top: 8px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
}

.secure-payment-block img {
    width: 120px;
}

.modal-body.loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 15vh;
}

.modal-body.loading img{
    width: 80%;
    filter: grayscale(100%);
}

@media only screen and (min-width: 1024px) {

    .secure-payment-block {
        margin-top: 16px;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
    }

    .secure-payment-block img {
        width: 140px;
    }

    .modal-body.loading {
        display: flex;
        align-items: center;
        justify-content: center;
    }
}



</style>