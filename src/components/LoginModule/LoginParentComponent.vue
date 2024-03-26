<template>
    <div class="login-main-container">
        <div class="login-container">
            <!-- Header -->
            <div class="login-container-header">
                <h1>Nimbus CRM 2.0</h1>
            </div>
            <!-- Body -->
            <div class="login-container-body">

                <div class="login-form">

                    <!-- Email -->
                    <div class="input-block">
                        <input type="text" placeholder="email">
                    </div>

                    <!-- Password -->
                    <div class="input-block">
                        <input type="password" placeholder="password">
                    </div>

                    <!-- Login -->
                    <div class="login-block">
                        <button class="btn-primary">continuar</button>
                        <br>
                        <span>¿Olvidó su contraseña?</span>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>

</script>
<style scoped>

    .login-main-container {
        height: 100vh;
        width: 100vw;
        background-color: var(--primary);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .login-container {
        background-color: var(--shadows);
        border-radius: .5rem;
        box-shadow: 3px 3px 14px #000;

    }

    .login-container-header {
        padding: 1rem;
        color: var(--accent);
    }

    .login-container-body {
        padding: 1rem;
    }

    .input-block {
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
    }

    .login-block {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    span {
        color: var(--warn);
    }
</style>