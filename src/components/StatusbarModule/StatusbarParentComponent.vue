<template>
    <footer>
        <div v-show="this.account.type=='standard'" class="account-info">
            <span id="span-websites">Sitios: {{ account.actual_websites }}/{{ account.websites }}</span>
            <span id="span-businesses">Negocios: {{ account.actual_businesses }}/{{ account.businesses }}</span>
            <span>Correos: {{ account.sent_emails }}/{{ account.emails }}</span>
            <span>Contactos: {{ account.actual_contacts }}/{{ account.contacts }}</span>
        </div>
        <div class="message-bar">
            <span v-show="isVisible" :class="message.status == 'error' ? 'red' : 'green' ">{{ message.text }}</span>
        </div>
    </footer>
</template>
<script>
    export default {
        name: 'StatusbarParentComponent',
        props: {
            message: {
                type: Object,
                required: true
            },
            account: {
                type: Object,
                required: true
            }
        },
        watch: {
            message: {
                handler(){
                    this.showStatusMessage();
                }
            }
        },
        methods: {
            showStatusMessage: function () {
                this.isVisible=true;
                setTimeout(()=>{
                    this.isVisible=false;
                }, 2000);
            }
        },
        data() {
            return {
                isVisible: false,
            }
        }
    }
</script>
<style scoped>

.green {
    color: yellowgreen;
}

.red {
    color: var(--warn);
}

/* Mobile first */

footer {
    grid-column: 1/2;
    grid-row: 3/4;
    background-color: var(--shadows);
    display: grid;
    grid-template-columns: 65% 35%;
    grid-template-rows: 100%;
    padding: 0 16px;
}

.message-bar {
    grid-column: 2/3;
    grid-row: 1/2;
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
    align-items: center;
}

.account-info {
    grid-column: 1/2;
    grid-row: 1/2;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    color: var(--primary);
}

span {
    font-size: 10px;
    margin-right: 1rem;
}

#span-websites {
    display: none;
}

#span-businesses {
    display: none;
}
/* Desktop */

@media only screen and (min-width: 1024px) {
    footer {
        grid-column: 1/3;
        grid-row: 3/4;
        background-color: var(--shadows);
        display: grid;
        grid-template-columns: 75% 25%;
        grid-template-rows: 100%;
        padding: 0 2rem;
    }

    .message-bar {
        grid-column: 2/3;
        grid-row: 1/2;
        width: 100%;
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
        align-items: center;
    }

    .account-info {
        grid-column: 1/2;
        grid-row: 1/2;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        color: var(--primary);
    }

    #span-websites {
        display: block;
    }

    #span-businesses {
        display: block;
    }

    span {
        font-size: 14px;
        margin-right: 0;
    }
}


</style>