<template>
    <section>
        <div class="settings-container">
            <div class="settings-header">
                <span>Configuración de cuenta de correo</span>
            </div>
            <div class="settings-body">
                <div class="text-input-block">
                    <label>Email</label>
                    <div>
                        <input class="input-primary" type="text"/>
                    </div>
                </div>

                <div class="text-input-block">
                    <label>Contraseña</label>
                    <div>
                        <input class="input-primary" type="text"/>
                    </div>
                </div>

                <div class="text-input-block">
                    <label>Confirmar contraseña</label>
                    <div>
                        <input class="input-primary" type="text"/>
                    </div>
                </div>

                <div class="text-input-block">
                    <label>Servidor SMTP</label>
                    <div>
                        <input class="input-primary" type="text"/>
                    </div>
                </div>

                <div class="text-input-block">
                    <label>Puerto</label>
                    <div>
                        <input class="input-primary" type="text"/>
                    </div>
                </div>
            </div>
            <div class="settings-footer">
                <button class="btn-warning">guardar</button>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    name: 'MailerSettingsComponent'
}
</script>
<style scoped>
.settings-container {
    margin-top: 1rem;
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
    flex-direction: column;
    padding: 0 1rem;
}

.text-input-block {
    margin: 1rem 0;
}

.text-input-block div {
    margin-top: .5rem;
}

.text-input-block input[type="text"] {
    width: 100%;
    box-sizing: border-box;
}

.settings-footer {
    padding: 1rem 0;
    display: flex;
    justify-content: center;
}

@media only screen and (min-width: 1024px){
    .settings-container {
        margin-top: 0;
    }
}
</style>