<template>
    <section>
        <section>
        <h5>{{ group.name }}</h5>
        <button>☰</button>
        </section>
        <ticket-preview v-for="ticket in group.tickets" :key="ticket.id" :ticket="ticket" @openTicket="emitOpenTicket" />
        <button>Add another card</button>      
    </section>
</template>

<script>
import TicketPreview from './TicketPreview.vue';
export default {
    methods: {
        emitOpenTicket(ticket){
            this.$emit('openTicket',ticket)
        }
    },
    props:['group'],
    components: {
        TicketPreview
    }
}
</script>

<style>
</style>