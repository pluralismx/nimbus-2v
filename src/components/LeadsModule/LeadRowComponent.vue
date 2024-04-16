<template>
    <tr>
        <!-- Name -->
        <td v-if="!edit" width="18%">Gerardo Topete Perez</td>
        <!-- <td v-if="edit" width="18%"><input type="text" placeholder="Gerardo Topete Perez"></td> -->

        <!-- Phone -->
        <td v-if="!edit" width="18%">526642522024</td>
        <td v-if="edit" width="18%"><input type="text" placeholder="526642522024"></td>

        <!-- Email -->
        <td v-if="!edit" width="18%">gerardotopete7@gmail.com</td>
        <!-- <td v-if="edit" width="18%"><input type="text" placeholder="gerardotopete7@gmail.com"></td> -->

        <!-- Status -->
        <td width="18%">
            <select class="select-status">
                <option>Nuevo</option>
            </select>
        </td>

        <!-- Date -->
        <td>26/03/24</td>

        <!-- Actions -->
        <td v-if="!edit" width="18%">
            <button class="btn-primary">editar</button>&nbsp;&nbsp;<button class="btn-warning">borrar</button>
        </td>
        <!-- <td v-if="edit" width="18%">
            <button class="btn-warning">actualizar</button>&nbsp;&nbsp;<button class="btn-primary">cancelar</button>
        </td> -->
    </tr>
</template>
<script>
    export default {
        name: 'LeadRowComponent'
    }
</script>
<style scoped>
    td {
        padding: 6px;
        text-align: center;
        height: 2rem;
    }

    .select-status {
        color: var(--shadows);
        width: 75%;
    }

    button {
        width: 40%;

    }

    input {
        width: 85%;
    }
</style>