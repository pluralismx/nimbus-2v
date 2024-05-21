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
                    <input type="checkbox" @change="updateSelection('nuevo')" :checked="isAllSelected" :disabled="isAllSelected"/>
                    <label>Nuevos</label>
                </div>
                <!-- Identificacion -->
                <div class="checkbox-block">
                    <input type="checkbox" @change="updateSelection('identificacion')" :checked="isAllSelected" :disabled="isAllSelected"/>
                    <label>Identificación</label>
                </div>
                <!-- Presentacion -->
                <div class="checkbox-block">
                    <input type="checkbox" @change="updateSelection('presentacion')" :checked="isAllSelected" :disabled="isAllSelected"/>
                    <label>Presentación</label>
                </div>
                <!-- Cotizacion -->
                <div class="checkbox-block">
                    <input type="checkbox" @change="updateSelection('cotizacion')" :checked="isAllSelected" :disabled="isAllSelected"/>
                    <label>Cotización</label>
                </div>
                <!-- Negociacion -->
                <div class="checkbox-block">
                    <input type="checkbox" @change="updateSelection('negociacion')" :checked="isAllSelected" :disabled="isAllSelected"/>
                    <label>Negociación</label>
                </div>
                <!-- Cierre -->
                <div class="checkbox-block">
                    <input type="checkbox" @change="updateSelection('cierre')" :checked="isAllSelected" :disabled="isAllSelected"/>
                    <label>Cierre</label>
                </div>
                <!-- Todos -->
                <div class="checkbox-block">
                    <input type="checkbox" @change="updateSelection('todos')" />
                    <label>Todos</label>
                </div>
                <!-- Individual -->
                <div class="checkbox-block">
                    <input type="checkbox" @change="updateSelection('individual')"/>
                    <label>Individual</label>
                </div>
                <div class="text-input-block">
                    <div>
                        <input :disabled="!isIndividualSelected" class="input-primary" type="text">
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
            }
        },
        methods: {
            updateSelection: function (option) {
                if(option != 'todos'){
                    if (!this.selectedOptions.includes(option)) {
                        this.selectedOptions.push(option);
                    }else {
                        const index = this.selectedOptions.indexOf(option);
                        if (index > -1) {
                            this.selectedOptions.splice(index, 1);
                        }
                    }
                console.log(this.selectedOptions);
                }else {
                    if(this.isAllSelected == false){
                        this.isAllSelected = true;
                        this.selectedOptions = [];
                        this.selectedOptions.push(option);
                        console.log(this.selectedOptions);
                    }else{
                        this.isAllSelected = false;
                        this.selectedOptions = [];
                        console.log(this.selectedOptions);
                    }

                }
                
            },
            sendEmails: function () {
                this.$emit('send-emails', this.selectedOptions);
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


</style>