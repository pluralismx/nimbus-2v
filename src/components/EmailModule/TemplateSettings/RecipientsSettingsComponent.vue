<template>
    <section>
        <div class="settings-container">
            <!-- Title -->
            <div class="settings-header">
                <span>Destinatarios</span>
            </div>
            <!-- Content -->
            <div class="settings-body">
                <!-- Nuevos -->
                <div class="checkbox-block">
                    <input type="checkbox" 
                        @change="updateSelection('nuevo')" 
                        :disabled="isAllSelected || isIndividualSelected"
                        v-model="checkboxOptions.nuevo"
                    />
                    <label>Nuevos</label>
                </div>
                <!-- Identificacion -->
                <div class="checkbox-block">
                    <input type="checkbox" 
                        @change="updateSelection('identificacion')" 
                        :disabled="isAllSelected || isIndividualSelected"
                        v-model="checkboxOptions.identificacion"
                    />
                    <label>Identificación</label>
                </div>
                <!-- Presentacion -->
                <div class="checkbox-block">
                    <input type="checkbox" 
                        @change="updateSelection('presentacion')" 
                        :disabled="isAllSelected || isIndividualSelected"
                        v-model="checkboxOptions.presentacion"
                    />
                    <label>Presentación</label>
                </div>
                <!-- Cotizacion -->
                <div class="checkbox-block">
                    <input type="checkbox" 
                        @change="updateSelection('cotizacion')" 
                        :disabled="isAllSelected || isIndividualSelected"
                        v-model="checkboxOptions.cotizacion"
                    />
                    <label>Cotización</label>
                </div>
                <!-- Negociacion -->
                <div class="checkbox-block">
                    <input type="checkbox" 
                        @change="updateSelection('negociacion')" 
                        :disabled="isAllSelected || isIndividualSelected"
                        v-model="checkboxOptions.negociacion"
                    />
                    <label>Negociación</label>
                </div>
                <!-- Cierre -->
                <div class="checkbox-block">
                    <input type="checkbox" 
                        @change="updateSelection('cierre')" 
                        :disabled="isAllSelected || isIndividualSelected"
                        v-model="checkboxOptions.cierre"
                    />
                    <label>Cierre</label>
                </div>
                <!-- Todos -->
                <div class="checkbox-block">
                    <input type="checkbox" 
                        @change="updateSelection('todos')" 
                        :disabled="isIndividualSelected"
                    />
                    <label>Todos</label>
                </div>
                <!-- Individual -->
                <div class="checkbox-block">
                    <input type="checkbox" 
                        @change="updateSelection('individual')" 
                        :disabled="isAllSelected"
                    />
                    <label>Individual</label>
                </div>
                <div class="text-input-block">
                    <div>
                        <input 
                            :disabled="!isIndividualSelected" 
                            class="input-primary" type="text"
                            v-model="singleEmail"
                        />
                    </div>
                </div>
            </div>
            <div class="settings-footer">
                <button class="btn-warning" @click="sendEmails">Enviar</button>
            </div>
        </div>
    </section>
</template>
<script>
    export default {
        name: 'RecipientsSettingsComponent',
        data() {
            return {
                selectedOptions: [],
                isAllSelected: false,
                isIndividualSelected: false,
                checkboxOptions: {
                    nuevo: false,
                    identificacion: false,
                    presentacion: false,
                    cotizacion: false,
                    negociacion: false,
                    cierre: false,
                },
                singleEmail: ''
            }
        },
        methods: {
            updateSelection: function (option) {

                switch (option) {
                    case 'individual': 
                        this.isIndividualSelected = true;
                        
                        for (let key in this.checkboxOptions) {
                            this.checkboxOptions[key] = false;
                        }
                        
                        if(!this.selectedOptions.includes(option)){
                            this.selectedOptions = [];
                            this.selectedOptions.push(option);
                        }else {
                            const index = this.selectedOptions.indexOf(option);
                            if(index > -1) {
                                this.selectedOptions.splice(index, 1);
                            }
                            this.singleEmail = '';
                            this.isIndividualSelected = false;
                        }
                        break;
                    case 'todos':
                        this.isAllSelected = true;
                        for (let key in this.checkboxOptions) {
                        this.checkboxOptions[key] = false;
                    }
                        if(!this.selectedOptions.includes(option)){
                            this.selectedOptions = [];
                            this.selectedOptions.push(option);
                        }else {
                            const index = this.selectedOptions.indexOf(option);
                            if (index > -1) {
                                this.selectedOptions.splice(index, 1);
                            }
                            this.isAllSelected = false;
                        }
                        break;
                    default:
                        if (!this.selectedOptions.includes(option)) {
                            this.selectedOptions.push(option);
                        }else {
                            const index = this.selectedOptions.indexOf(option);
                            if (index > -1) {
                                this.selectedOptions.splice(index, 1);
                            }
                            this.isAllSelected = false;
                        }
                        break;
                }
                
            },
            sendEmails: function () {
                if(this.singleEmail !== ''){
                    this.$emit('send-emails', this.singleEmail);
                }else {
                    this.$emit('send-emails', this.selectedOptions);
                }
            },
            
        }
    }
</script>
<style scoped>
.settings-container {
    margin-top: 2rem;
    box-shadow: 2px 2px 6px var(--shadows);
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
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0 1rem;
}

/* Checkbox block */

.checkbox-block {
    margin: 1rem 0;
    flex: 0 1 50%;
}

.checkbox-block input[type="checkbox"] {
    margin-right: 1rem;
}

.text-input-block {
    margin: 1rem 0;
    flex: 0 1 100%;
}

.text-input-block input[type="text"] {
    width: 100%;
    box-sizing: border-box;
}

.settings-footer {
    padding-top: 0;
    padding-left: 1rem;
    padding-bottom: 1rem;
    padding-right: 1rem;
    display: flex;
    justify-content: center;
}

@media only screen and (max-width: 1440px){
    .settings-body {
        display: flex;
        flex-direction: column;
        padding: 0 1rem;
    }
}

@media only screen and (max-width: 425px){
    .settings-body {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        padding: 0 1rem;
    }
}


</style>